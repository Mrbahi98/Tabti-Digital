import { Gamepad2, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/client-logo.png" alt="Tabti Digital Logo" className="w-12 h-12 object-contain rounded-lg" />
              <span className="font-black text-xl tracking-tight text-white">
                TABTI<span className="text-cyan-400 ml-1">DIGITAL</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Algeria's most trusted premium game top-up store. Instant delivery, secure payments via CCP, BARIDIMOB, and FLEXY.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-cyan-500/20 hover:text-cyan-400 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/#games" className="text-zinc-400 hover:text-cyan-400 text-sm transition-colors">All Games</a></li>
              <li><a href="/#how-it-works" className="text-zinc-400 hover:text-cyan-400 text-sm transition-colors">How to Buy</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-cyan-400 text-sm transition-colors">Track Order</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-cyan-400 text-sm transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-zinc-400 hover:text-cyan-400 text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-cyan-400 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-cyan-400 text-sm transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Tabti Digital. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-zinc-500 font-medium">
            <span>CCP</span>
            <span>•</span>
            <span>BARIDIMOB</span>
            <span>•</span>
            <span>FLEXY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
