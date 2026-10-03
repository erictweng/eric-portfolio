import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, GitCommit } from 'lucide-react';
import { fetchRecentCommits, readCachedCommits, writeCachedCommits, type FeedCommit } from '../lib/github';

const GITHUB_USER = 'erictweng';

const techColors: Record<string, string> = {
  'JavaScript': '#F7DF1E',
  'TypeScript': '#3178C6',
  'Python': '#3776AB',
  'Java': '#ED8B00',
  'C/C++': '#00599C',
  'Rust': '#CE422B',
  'React': '#61DAFB',
  'Git': '#F05032',
  'NoSQL': '#4DB33D',
  'Claude/Cursor': '#D4A574',
  'ESP32': '#E7352C',
  'Unix/Linux': '#FCC624',
  'macOS': '#999999',
  'Windows': '#0078D6',
};

const categories = [
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C/C++', 'Rust'] },
  { label: 'Frameworks', items: ['React'] },
  { label: 'Tools & Data', items: ['Git', 'NoSQL', 'Claude/Cursor', 'ESP32'] },
  { label: 'Platforms', items: ['Unix/Linux', 'macOS', 'Windows'] },
];

export default function TechStack() {
  const [cached] = useState(() => readCachedCommits(GITHUB_USER));
  const [commits, setCommits] = useState<FeedCommit[]>(cached ?? []);
  const [loading, setLoading] = useState(cached === null);

  useEffect(() => {
    if (cached !== null) return;

    const controller = new AbortController();
    fetchRecentCommits(GITHUB_USER, { signal: controller.signal })
      .then((recent) => {
        writeCachedCommits(GITHUB_USER, recent);
        setCommits(recent);
        setLoading(false);
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setCommits([]);
        setLoading(false);
      });

    return () => controller.abort();
  }, [cached]);

  return (
    <section
      id="tech-stack"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Left Column: Tech Categories */}
        <motion.div
          className="lg:w-[55%]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <p
            className="text-xs font-bold uppercase tracking-[0.3em] mb-2"
            style={{ color: 'var(--color-accent)', fontFamily: "'Orbitron', sans-serif" }}
          >
            Technologies
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold uppercase mb-12"
            style={{ color: 'var(--color-text)', fontFamily: "'Orbitron', sans-serif" }}
          >
            Stack &amp; Code
          </h2>

          {/* Categories */}
          <div className="space-y-8">
            {categories.map((cat, catIdx) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-lg font-bold uppercase tracking-[0.2em] mb-3"
                  style={{ color: 'var(--color-accent)', fontFamily: "'Orbitron', sans-serif" }}
                >
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-6">
                  {cat.items.map((item) => (
                    <div key={item} className="inline-flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: techColors[item] || '#888' }}
                      />
                      <span
                        className="text-xs uppercase tracking-wider font-mono"
                        style={{ color: 'var(--color-text)', opacity: 0.7 }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Live GitHub Feed */}
        <motion.div
          className="lg:w-[45%]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* LIVE Header */}
          <div className="flex items-center gap-3 mb-6">
            <h2
              className="text-3xl md:text-4xl font-bold uppercase"
              style={{ color: 'var(--color-text)', fontFamily: "'Orbitron', sans-serif" }}
            >
              Live
            </h2>
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />
          </div>

          {/* GitHub Card */}
          <div
            className="rounded-lg p-6 relative overflow-hidden"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-text) 5%, transparent)' }}
          >
            {/* Accent square */}
            <div
              className="absolute top-0 left-0 w-8 h-8"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />

            {/* Card Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3 ml-10">
                <Github size={20} style={{ color: 'var(--color-text)' }} />
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.2em] font-bold"
                    style={{ color: 'var(--color-text)', opacity: 0.5 }}
                  >
                    Live Feed
                  </p>
                  <p
                    className="text-lg font-bold uppercase"
                    style={{ color: 'var(--color-text)', fontFamily: "'Orbitron', sans-serif" }}
                  >
                    GitHub
                  </p>
                </div>
              </div>
              <span
                className="text-[10px] font-bold uppercase px-2 py-1 rounded-full flex items-center gap-1"
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)' }}
              >
                ● Live
              </span>
            </div>

            {/* Commits */}
            <div className="space-y-4">
              {loading ? (
                <p className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.5 }}>
                  Loading...
                </p>
              ) : commits.length === 0 ? (
                <p className="text-sm" style={{ color: 'var(--color-text)', opacity: 0.5 }}>
                  No recent activity
                </p>
              ) : (
                commits.map((c) => (
                  <div
                    key={`${c.repo}-${c.sha}`}
                    className="flex items-start gap-3 pb-3"
                    style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)' }}
                  >
                    <GitCommit size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-xs font-bold uppercase tracking-wider mb-1"
                        style={{ color: 'var(--color-accent)' }}
                      >
                        {c.repo}
                      </p>
                      <p
                        className="text-sm truncate"
                        style={{ color: 'var(--color-text)', opacity: 0.8 }}
                      >
                        {c.message}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span
                          className="text-[10px] font-mono"
                          style={{ color: 'var(--color-text)', opacity: 0.4 }}
                        >
                          {c.sha}
                        </span>
                        <span
                          className="text-[10px]"
                          style={{ color: 'var(--color-text)', opacity: 0.4 }}
                        >
                          {c.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* View Profile Link */}
            <a
              href="https://github.com/erictweng"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
              style={{ color: 'var(--color-accent)' }}
            >
              View Profile ↗
            </a>
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-3">
            <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text)', opacity: 0.4 }}>
              Source: GitHub API
            </span>
            <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--color-text)', opacity: 0.4 }}>
              Refresh: 5 min cache
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
