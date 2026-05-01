import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Gamepad2, User, CreditCard, Zap, ShieldCheck, Banknote, Clock } from 'lucide-react';

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('/api/games');
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error('Failed to fetch games:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-8">
            <Zap className="w-4 h-4" />
            <span>#1 Game Top-up in Algeria</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            TOP UP <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-glow">INSTANTLY.</span><br />
            PAY IN DZD.
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Premium gaming currency delivered directly to your account. 
            Secure, fast, and local payment methods via CCP, BaridiMob, and Flexy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#games" className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:scale-105 transition-transform box-glow flex items-center gap-2 w-full sm:w-auto justify-center">
              Browse Games <ChevronRight className="w-5 h-5" />
            </a>
            <a href="#how-it-works" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto justify-center flex">
              How it works
            </a>
          </div>
        </div>
      </section>

      {/* GAMES GRID */}
      <section id="games" className="py-24 bg-zinc-900/50 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">TRENDING <span className="text-cyan-400">GAMES</span></h2>
              <p className="text-zinc-400">Select a game to top up your account instantly.</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="h-64 bg-zinc-800/50 animate-pulse rounded-2xl border border-white/5"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {games.map((game: any) => (
                <Link to={`/game/${game.slug}`} key={game.id} className="group relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-square bg-zinc-900 border border-white/10 transition-all hover:border-cyan-500/50 box-glow-hover flex flex-col">
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <img src={game.image_url} alt={game.name} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-5 z-10">
                    <h3 className="text-xl font-black text-white mb-1 leading-tight group-hover:text-cyan-400 transition-colors">{game.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-semibold text-zinc-300 bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-md">
                        {game.currency_name}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                        <ChevronRight className="w-5 h-5 text-zinc-950" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">HOW IT <span className="text-cyan-400">WORKS</span></h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">Get your game currency in three simple steps. No registration required.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-zinc-800 to-transparent -translate-y-1/2 z-0"></div>

            <div className="relative z-10 bg-zinc-900/80 backdrop-blur-sm border border-white/5 p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-white/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Choose Game</h3>
              <p className="text-zinc-400 text-sm">Select your favorite game and the amount of currency you want to buy.</p>
            </div>

            <div className="relative z-10 bg-zinc-900/80 backdrop-blur-sm border border-white/5 p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-white/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Enter ID</h3>
              <p className="text-zinc-400 text-sm">Provide your Player ID/UID. We never ask for your password.</p>
            </div>

            <div className="relative z-10 bg-zinc-900/80 backdrop-blur-sm border border-white/5 p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 mx-auto bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 border border-white/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Pay & Receive</h3>
              <p className="text-zinc-400 text-sm">Pay via CCP, BaridiMob, or Flexy and receive your top-up instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-24 bg-zinc-900/30 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5">
              <Zap className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Instant Delivery</h3>
              <p className="text-zinc-400 text-sm">Most orders are completed within 1-5 minutes after payment verification.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5">
              <ShieldCheck className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">100% Secure</h3>
              <p className="text-zinc-400 text-sm">Official top-ups only. No risks of bans or account suspensions.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5">
              <Banknote className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Algerian Prices</h3>
              <p className="text-zinc-400 text-sm">Pay easily in DZD with local payment methods you already use.</p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5">
              <Clock className="w-8 h-8 text-cyan-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
              <p className="text-zinc-400 text-sm">Our dedicated support team is always ready to assist you via WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
