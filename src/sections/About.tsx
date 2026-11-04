import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center py-24 md:py-32 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Left column — 2+ years */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="md:w-[40%] flex flex-col items-center justify-center relative"
        >
          <div className="relative flex flex-col items-center justify-center">
            <span
              style={{
                fontSize: 'clamp(8rem, 20vw, 16rem)',
                fontWeight: 900,
                fontFamily: "'Orbitron', sans-serif",
                color: 'var(--color-text)',
                opacity: 0.15,
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              2+
            </span>
            <span
              style={{
                color: 'var(--color-text)',
                opacity: 0.6,
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(0.75rem, 1.5vw, 1.1rem)',
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginTop: '-1.5rem',
              }}
            >
              Years of Experience
            </span>
          </div>
        </motion.div>

        {/* Right column — About text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          viewport={{ once: true }}
          className="md:w-[60%]"
        >
          <p
            style={{
              color: 'var(--color-accent)',
              fontFamily: "'Orbitron', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            About
          </p>

          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 800, lineHeight: 1.15, marginBottom: '2rem' }}>
            <span style={{ display: 'block', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-text)' }}>THE</span>
            <span style={{ display: 'block', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--color-accent)' }}>BIBLIOGRAPHY</span>
          </h2>

          <div style={{ maxWidth: '600px' }} className="space-y-6">
            <p style={{ color: 'var(--color-text)', opacity: 0.7, lineHeight: 1.8, fontSize: '1.05rem' }}>
              My favorite quote: Frank Ocean is my favorite artist, because to be frank with the
              ocean you need to be honest with the sea. Anyways, I&apos;m Eric and I&apos;m a
              computer engineer that builds. From building a vibe coded website to a live golf
              leaderboard so my friends can&apos;t lie about their scores, to a real-time dashboard
              that stopped 80 robot operators from asking &ldquo;wait, who has this robot?&rdquo;
              every shift change.
            </p>
            <p style={{ color: 'var(--color-text)', opacity: 0.7, lineHeight: 1.8, fontSize: '1.05rem' }}>
              I taught a tiny Arm chip to read ASL fingerspelling (2nd place at a hackathon, right
              after my first model aced its test set and then failed on every real hand). I built a
              coding RPG because LeetCode wasn&apos;t punishing me enough, and a crew of AI agents
              that write code while I review it like a very demanding manager. It all started in
              2018 with turning spreadsheets for 180 cell towers into a dashboard, which is the
              least glamorous and most honest origin story I&apos;ve got.
            </p>
            <p style={{ color: 'var(--color-text)', opacity: 0.7, lineHeight: 1.8, fontSize: '1.05rem' }}>
              If it&apos;s messy, manual, or held together by Slack messages, I want to build the
              thing that fixes it.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
