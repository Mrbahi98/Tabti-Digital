import { Link } from 'react-router-dom';
import { Gamepad2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-white/5 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/client-logo.png" alt="Tabti Digital Logo" className="w-16 h-16 object-contain rounded-xl group-hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
            <span className="font-black text-2xl tracking-tight text-white flex items-center">
              TABTI<span className="text-cyan-400 ml-1">DIGITAL</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#games" className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors">Games</a>
            <a href="/#how-it-works" className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors">How it Works</a>
            <a href="/#why-us" className="text-sm font-medium text-zinc-400 hover:text-cyan-400 transition-colors">Why Us</a>
            <button className="px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold transition-all hover:border-cyan-500/50 hover:text-cyan-400">
              Track Order
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-zinc-900 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="/#games" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-zinc-300 hover:text-cyan-400 hover:bg-white/5 rounded-md">Games</a>
            <a href="/#how-it-works" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-zinc-300 hover:text-cyan-400 hover:bg-white/5 rounded-md">How it Works</a>
            <a href="/#why-us" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-zinc-300 hover:text-cyan-400 hover:bg-white/5 rounded-md">Why Us</a>
          </div>
        </div>
      )}
    </nav>
  );
}
