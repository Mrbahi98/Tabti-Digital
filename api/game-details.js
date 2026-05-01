import supabase from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { slug } = req.query;
      if (!slug) return res.status(400).json({ error: 'Slug is required' });

      // Get game
      const { data: game, error: gameErr } = await supabase
        .from('games')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (gameErr) throw gameErr;
      if (!game) return res.status(404).json({ error: 'Game not found' });

      // Get products for game
      const { data: products, error: prodErr } = await supabase
        .from('products')
        .select('*')
        .eq('game_id', game.id)
        .order('price_dzd', { ascending: true });
        
      if (prodErr) throw prodErr;

      return res.status(200).json({ ...game, products });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
