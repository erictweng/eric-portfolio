import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string | null;
  linkLabel?: string;
}

const projects: Project[] = [
  {
    title: 'Quest Coder',
    description: 'A coding RPG that teaches algorithms through quests. Write Python in a compiler-first workspace, test it against a sandboxed code runner, and earn XP clearing stages and boss fights. First campaign: Climbing Stairs (1-D dynamic programming).',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Python', 'Docker', 'Playwright'],
    link: 'https://quest-coder.vercel.app',
    linkLabel: 'Play Quest Coder',
  },
  {
    title: 'Equipment Management System',
    description: 'Real-time equipment tracking and shift management tool for 24/7 operations. Centralized dashboard integrating multiple APIs into a single source of truth for operators and engineering teams.',
    tech: ['React', 'TypeScript', 'REST APIs', 'Slack/Jira Integration'],
    link: null,
  },
  {
    title: 'Golf Leaderboard',
    description: 'Match and tournament tracking app for golfers — create rounds, track scores per hole, and compete on persistent leaderboards.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    link: null,
  },
  {
    title: 'VROlympics Landing Page',
    description: 'Landing page for VROlympics — a virtual reality competitive events platform featuring real-time scoring and live leaderboards.',
    tech: ['React', 'TypeScript', 'Vercel'],
    link: 'https://vrolympics1.vercel.app',
    linkLabel: 'Visit site',
  },
];

function CardBody({ project }: { project: Project }) {
  return (
    <>
      <h3
        className="text-xl font-bold mb-3"
        style={{ color: 'var(--color-text)' }}
      >
        {project.title}
      </h3>

      <p
        className="text-sm leading-relaxed mb-5 opacity-70"
        style={{ color: 'var(--color-text)' }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 text-xs rounded-full"
            style={{
              border: '1px solid var(--color-accent)',
              color: 'var(--color-accent)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {project.link && (
        <span
          className="project-cta mt-auto pt-6 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--color-accent)' }}
        >
          {project.linkLabel ?? 'Visit'}
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      )}
    </>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 uppercase tracking-wider"
          style={{ fontFamily: "'Orbitron', sans-serif", color: 'var(--color-text)' }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const motionProps = {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              transition: { duration: 0.8, delay: index * 0.2, ease: 'easeOut' as const },
              viewport: { once: true, margin: '-50px' },
              style: { backgroundColor: 'var(--color-bg)' },
            };

            return project.link ? (
              <motion.a
                key={project.title}
                {...motionProps}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.linkLabel ?? 'Visit'}: ${project.title} (opens in a new tab)`}
                className="project-card rounded-xl p-6 flex flex-col cursor-pointer"
              >
                <CardBody project={project} />
              </motion.a>
            ) : (
              <motion.div
                key={project.title}
                {...motionProps}
                className="project-card rounded-xl p-6 flex flex-col cursor-default"
              >
                <CardBody project={project} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .project-card {
          border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-accent);
        }
        a.project-card:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 4px;
          border-color: var(--color-accent);
        }
        a.project-card:hover .project-cta,
        a.project-card:focus-visible .project-cta {
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      `}</style>
    </section>
  );
}
