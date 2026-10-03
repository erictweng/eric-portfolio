// GitHub activity feed for the TechStack section.
//
// GitHub's public Events API no longer includes a `commits` array in
// PushEvent payloads — only `ref`, `head`, `before`, `push_id`, and
// `repository_id`. To show a commit message, we take the pushed `head` SHA
// and look it up via the Commits API.

export interface FeedCommit {
  repo: string;
  message: string;
  sha: string;
  date: string;
}

interface PushEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: {
    ref?: string;
    head?: string;
    commits?: { message?: string; sha?: string }[];
  };
}

interface CommitResponse {
  sha?: string;
  commit?: { message?: string };
}

type Fetcher = (url: string, init?: RequestInit) => Promise<Response>;

const API = 'https://api.github.com';
const EVENTS_PER_PAGE = 30;
const CACHE_TTL_MS = 5 * 60 * 1000;

export const FEED_LIMIT = 4;

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function firstLine(message: string): string {
  return message.split('\n')[0].trim();
}

function branchName(ref?: string): string {
  return ref?.replace(/^refs\/heads\//, '') ?? '';
}

function isPushEvent(value: unknown): value is PushEvent {
  if (!value || typeof value !== 'object') return false;
  const e = value as Partial<PushEvent>;
  return e.type === 'PushEvent' && typeof e.repo?.name === 'string' && typeof e.created_at === 'string';
}

// Pick the newest pushes, skipping repeated pushes of the same commit.
// The Events API is roughly but not strictly newest-first, so sort explicitly.
export function selectPushes(events: unknown, limit = FEED_LIMIT): PushEvent[] {
  if (!Array.isArray(events)) return [];

  const sorted = events
    .filter(isPushEvent)
    .map((event, index) => ({ event, index, time: Date.parse(event.created_at) || 0 }))
    .sort((a, b) => b.time - a.time || a.index - b.index)
    .map(({ event }) => event);

  const seen = new Set<string>();
  const pushes: PushEvent[] = [];

  for (const event of sorted) {
    const sha = event.payload?.head ?? event.payload?.commits?.at(-1)?.sha;
    if (!sha) continue;
    const key = `${event.repo.name}@${sha}`;
    if (seen.has(key)) continue;
    seen.add(key);
    pushes.push(event);
    if (pushes.length >= limit) break;
  }

  return pushes;
}

async function resolveCommit(event: PushEvent, fetcher: Fetcher, signal?: AbortSignal): Promise<FeedCommit> {
  const repoFull = event.repo.name;
  const repo = repoFull.split('/')[1] || repoFull;
  const sha = event.payload?.head ?? event.payload?.commits?.at(-1)?.sha ?? '';
  const date = formatDate(event.created_at);

  // Older payload shape still carries the message; use it if present.
  const inlineMessage = event.payload?.commits?.at(-1)?.message;
  if (inlineMessage) {
    return { repo, message: firstLine(inlineMessage), sha: sha.slice(0, 7), date };
  }

  const branch = branchName(event.payload?.ref);
  const fallback = branch ? `Pushed to ${branch}` : 'Pushed commits';

  try {
    const res = await fetcher(`${API}/repos/${repoFull}/commits/${sha}`, { signal });
    if (!res.ok) throw new Error(`commit lookup failed: ${res.status}`);
    const data = (await res.json()) as CommitResponse;
    const message = data.commit?.message ? firstLine(data.commit.message) : '';
    return { repo, message: message || fallback, sha: sha.slice(0, 7), date };
  } catch (err) {
    if (signal?.aborted) throw err;
    return { repo, message: fallback, sha: sha.slice(0, 7), date };
  }
}

export async function fetchRecentCommits(
  username: string,
  { fetcher = fetch, signal, limit = FEED_LIMIT }: { fetcher?: Fetcher; signal?: AbortSignal; limit?: number } = {},
): Promise<FeedCommit[]> {
  const res = await fetcher(`${API}/users/${username}/events/public?per_page=${EVENTS_PER_PAGE}`, { signal });
  if (!res.ok) throw new Error(`events request failed: ${res.status}`);
  const events: unknown = await res.json();
  const pushes = selectPushes(events, limit);
  return Promise.all(pushes.map((event) => resolveCommit(event, fetcher, signal)));
}

// Session cache keeps reloads and re-renders from spending the 60 req/hr
// unauthenticated limit, and backs the "5 min cache" label in the UI.
function cacheKey(username: string): string {
  return `gh-feed:${username}`;
}

export function readCachedCommits(username: string, now = Date.now()): FeedCommit[] | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { at?: number; commits?: FeedCommit[] };
    if (typeof parsed.at !== 'number' || !Array.isArray(parsed.commits)) return null;
    if (now - parsed.at > CACHE_TTL_MS) return null;
    return parsed.commits;
  } catch {
    return null;
  }
}

export function writeCachedCommits(username: string, commits: FeedCommit[], now = Date.now()): void {
  try {
    sessionStorage.setItem(cacheKey(username), JSON.stringify({ at: now, commits }));
  } catch {
    // Storage unavailable (private mode / quota) — feed still works uncached.
  }
}
