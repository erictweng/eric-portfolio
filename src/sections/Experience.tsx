import { motion } from 'framer-motion';

const entries = [
  {
    date: 'Oct 2025 – Present',
    company: 'Stealth Startup',
    role: 'QCS & Product Engineer',
    description: 'Building real-time operational tools and coordinating autonomous robotic systems in live production environments.',
  },
  {
    date: 'Fall 2022 – Fall 2025',
    company: 'UC Santa Cruz',
    role: 'B.S. Computer Engineering',
    description: 'Studied distributed systems, machine learning, and software engineering fundamentals.',
  },
  {
    date: 'Aug 2018 – Feb 2019',
    company: 'TTS Wireless',
    role: 'Software Engineering Intern',
    description: 'Managed and optimized database systems for wireless telecommunications infrastructure.',
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 uppercase tracking-wider"
          style={{ fontFamily: "'Orbitron', sans-serif", color: 'var(--color-text)' }}
        >
          Experience
        </motion.h2>

        <div className="relative ml-4 sm:ml-8">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px]"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-accent) 30%, transparent)' }}
          />

          <div className="space-y-12">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative pl-8 sm:pl-10"
              >
                {/* Dot */}
                <div
                  className="absolute left-0 top-1 w-3 h-3 rounded-full -translate-x-[5px]"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />

                <span
                  className="text-xs uppercase tracking-widest font-medium"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {entry.date}
                </span>

                <h3
                  className="text-lg font-bold mt-1"
                  style={{ color: 'var(--color-text)' }}
                >
                  {entry.company}
                </h3>

                <p
                  className="text-sm font-medium opacity-60 mb-2"
                  style={{ color: 'var(--color-text)' }}
                >
                  {entry.role}
                </p>

                <p
                  className="text-sm leading-relaxed opacity-50"
                  style={{ color: 'var(--color-text)' }}
                >
                  {entry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
