import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, ShieldAlert, CreditCard, Send } from 'lucide-react';

export default function GamePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const [game, setGame] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [playerId, setPlayerId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Explicitly for PUBG
  const [pubgVersion, setPubgVersion] = useState<'global' | 'taiwan'>('global');

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        // If it's PUBG, we fetch the specific version
        let fetchSlug = slug;
        if (slug === 'pubg-mobile' || slug === 'pubg-mobile-taiwan') {
          fetchSlug = pubgVersion === 'global' ? 'pubg-mobile' : 'pubg-mobile-taiwan';
        }

        const res = await fetch(`/api/game-details?slug=${fetchSlug}`);
        if (!res.ok) throw new Error('Game not found');
        const data = await res.json();
        setGame(data);
        setProducts(data.products || []);
        setSelectedProduct(null); // Reset selection when version changes
      } catch (err) {
        console.error(err);
        if (slug !== 'pubg-mobile' && slug !== 'pubg-mobile-taiwan') {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchGameDetails();
  }, [slug, pubgVersion, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedProduct) {
      setError('Please select a top-up amount');
      return;
    }
    if (!playerId.trim()) {
      setError('Please enter your Player ID');
      return;
    }
    if (slug === 'mobile-legends' && !zoneId.trim()) {
      setError('Please enter your Zone ID');
      return;
    }
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id: game.id,
          product_id: selectedProduct.id,
          player_uid: slug === 'mobile-legends' ? `${playerId} (${zoneId})` : playerId,
          payment_method: paymentMethod
        })
      });

      if (!res.ok) throw new Error('Failed to place order');
      
      const order = await res.json();
      navigate('/success', { state: { order, game, product: selectedProduct } });
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!game) return null;

  return (
    <div className="w-full pb-24">
      {/* Game Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img src={game.image_url} alt={game.name} className="w-full h-full object-cover opacity-40 blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
            <button onClick={() => navigate('/')} className="flex items-center text-zinc-400 hover:text-white mb-6 transition-colors w-fit">
              <ChevronLeft className="w-5 h-5 mr-1" /> Back to Games
            </button>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shrink-0 bg-zinc-900">
                <img src={game.image_url} alt={game.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">{game.name}</h1>
                <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Official Partner</span>
                  <span>•</span>
                  <span>Instant Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form & Selection */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: User Info */}
            <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">1</div>
                <h2 className="text-xl font-bold">Account Details</h2>
              </div>

              {(slug === 'pubg-mobile' || slug === 'pubg-mobile-taiwan') && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-400 mb-3">Select Version</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPubgVersion('global')}
                      className={`p-3 rounded-xl border text-center font-bold transition-all ${
                        pubgVersion === 'global'
                          ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 box-glow'
                          : 'bg-zinc-950 border-white/10 text-zinc-300 hover:border-white/30 hover:bg-zinc-900'
                      }`}
                    >
                      Global Version
                    </button>
                    <button
                      type="button"
                      onClick={() => setPubgVersion('taiwan')}
                      className={`p-3 rounded-xl border text-center font-bold transition-all ${
                        pubgVersion === 'taiwan'
                          ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 box-glow'
                          : 'bg-zinc-950 border-white/10 text-zinc-300 hover:border-white/30 hover:bg-zinc-900'
                      }`}
                    >
                      Taiwan Version
                    </button>
                  </div>
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className={slug === 'mobile-legends' ? 'md:col-span-1' : 'md:col-span-2'}>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Player ID / UID <span className="text-red-400">*</span></label>
                  <input 
                    type="text" 
                    value={playerId}
                    onChange={(e) => setPlayerId(e.target.value)}
                    placeholder="e.g. 12345678" 
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-zinc-600"
                  />
                  {slug !== 'mobile-legends' && (
                    <p className="text-xs text-zinc-500 mt-2 flex items-start gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      Double check your ID to ensure correct delivery.
                    </p>
                  )}
                </div>

                {slug === 'mobile-legends' && (
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Zone ID <span className="text-red-400">*</span></label>
                    <input 
                      type="text" 
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      placeholder="e.g. 1234" 
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-zinc-600"
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Step 2: Select Amount */}
            <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">2</div>
                <h2 className="text-xl font-bold">Select Amount</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {products.map(product => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`relative p-4 rounded-xl border text-left transition-all ${
                      selectedProduct?.id === product.id 
                        ? 'bg-cyan-500/10 border-cyan-500 box-glow' 
                        : 'bg-zinc-950 border-white/10 hover:border-white/30 hover:bg-zinc-900'
                    }`}
                  >
                    {selectedProduct?.id === product.id && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      </div>
                    )}
                    <div className="text-2xl font-black text-white mb-1">{product.amount}</div>
                    <div className="text-sm font-medium text-zinc-400 mb-3">{game.currency_name}</div>
                    <div className="text-lg font-bold text-cyan-400">{product.price_dzd} DZD</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3: Payment Method */}
            <section className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">3</div>
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {['BARIDIMOB', 'CCP', 'FLEXY'].map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-4 rounded-xl border text-center font-bold transition-all ${
                      paymentMethod === method 
                        ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 box-glow' 
                        : 'bg-zinc-950 border-white/10 text-zinc-300 hover:border-white/30 hover:bg-zinc-900'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2 opacity-70" />
                    {method}
                  </button>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sticky top-24 shadow-2xl">
              <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Game</span>
                  <span className="font-semibold text-white">{game.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Player ID</span>
                  <span className="font-semibold text-white">
                    {playerId ? (slug === 'mobile-legends' && zoneId ? `${playerId} (${zoneId})` : playerId) : '-'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Item</span>
                  <span className="font-semibold text-white">
                    {selectedProduct ? `${selectedProduct.amount} ${game.currency_name}` : '-'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Payment</span>
                  <span className="font-semibold text-white">{paymentMethod || '-'}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300 font-medium">Total Amount</span>
                  <span className="text-2xl font-black text-cyan-400">
                    {selectedProduct ? `${selectedProduct.price_dzd} DZD` : '0 DZD'}
                  </span>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:scale-[1.02] transition-all box-glow disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Place Order <Send className="w-5 h-5" /></>
                )}
              </button>
              
              <p className="text-xs text-center text-zinc-500 mt-4">
                By placing this order, you agree to our Terms of Service and Refund Policy.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
