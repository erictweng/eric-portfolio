import { Github, Linkedin, Mail } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-text/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-[Orbitron] font-bold text-xl text-text">Eric Weng</span>
        <div className="flex items-center gap-5">
          <a href="https://github.com/erictweng" target="_blank" rel="noopener noreferrer" className="text-text/80 hover:text-accent transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/erictweng" target="_blank" rel="noopener noreferrer" className="text-text/80 hover:text-accent transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="mailto:erictweng@gmail.com" className="text-text/80 hover:text-accent transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
}
