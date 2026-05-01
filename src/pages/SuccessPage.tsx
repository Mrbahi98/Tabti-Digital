import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Copy, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function SuccessPage() {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  
  if (!location.state || !location.state.order) {
    return <Navigate to="/" />;
  }

  const { order, game, product } = location.state;

  const handleCopy = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-24 px-4">
      <div className="max-w-lg w-full bg-zinc-900 border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-cyan-500/20 blur-[50px] pointer-events-none"></div>
        
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        
        <h1 className="text-3xl font-black mb-2">Order Placed!</h1>
        <p className="text-zinc-400 mb-8">
          Your order has been saved successfully. Please complete the payment to receive your top-up.
        </p>

        <div className="bg-zinc-950 rounded-2xl p-6 border border-white/5 mb-8 text-left">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
            <span className="text-zinc-400 text-sm">Order ID</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-white">{order.id.split('-')[0].toUpperCase()}</span>
              <button onClick={handleCopy} className="text-zinc-500 hover:text-cyan-400 transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-400 text-sm">Game</span>
              <span className="font-medium text-sm">{game.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 text-sm">Item</span>
              <span className="font-medium text-sm">{product.amount} {game.currency_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400 text-sm">Payment Method</span>
              <span className="font-medium text-sm">{order.payment_method}</span>
            </div>
            <div className="flex justify-between pt-3 mt-3 border-t border-white/5">
              <span className="text-zinc-300 font-medium">Total to pay</span>
              <span className="font-black text-cyan-400">{product.price_dzd} DZD</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <a 
            href={`https://wa.me/213555555555?text=Hello, I made an order. ID: ${order.id.split('-')[0].toUpperCase()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold text-lg hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-5 h-5" /> Contact Support via WhatsApp
          </a>
          
          <Link 
            to="/"
            className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors block"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
