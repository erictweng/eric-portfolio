import { Github, Linkedin, Mail } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/erictweng' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ericweng' },
  { icon: Mail, href: 'mailto:erictweng@gmail.com' },
];

const marqueeText = 'ERIC WENG ★ FORWARD DEPLOYED ENGINEER ★ DANVILLE, CA ★ ';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Marquee strip */}
      <div
        className="overflow-hidden py-4"
        style={{ borderTop: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)' }}
      >
        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
          <span
            className="text-sm uppercase tracking-wider"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: 'color-mix(in srgb, var(--color-text) 40%, transparent)',
            }}
          >
            {marqueeText.repeat(10)}
          </span>
          <span
            className="text-sm uppercase tracking-wider"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: 'color-mix(in srgb, var(--color-text) 40%, transparent)',
            }}
          >
            {marqueeText.repeat(10)}
          </span>
        </div>
      </div>

      {/* Copyright + socials */}
      <div
        className="py-8 text-center"
        style={{ borderTop: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)' }}
      >
        <p className="text-sm mb-4" style={{ color: 'color-mix(in srgb, var(--color-text) 50%, transparent)' }}>
          © 2026 Eric Weng
        </p>
        <div className="flex justify-center gap-5">
          {socials.map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="transition-colors duration-200"
              style={{ color: 'var(--color-text)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
