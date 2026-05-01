import supabase from './api/_supabase.js';

async function run() {
  // Add a version column to products
  // Since we can't easily alter table via API, we'll just add the versions as part of the amount string for simplicity, or we can use the game page to filter if we had a version column.
  // Wait, let's just add a new game entry for PUBG Mobile Taiwan to keep it simple and clean.
  
  const pubgTaiwanId = '22222222-2222-2222-2222-222222222223';
  
  // 1. Get the existing PUBG Mobile game
  const { data: pubgGlobal } = await supabase.from('games').select('*').eq('id', '22222222-2222-2222-2222-222222222222').single();
  
  // 2. Update existing to explicitly say "Global"
  await supabase.from('games').update({ name: 'PUBG Mobile (Global)' }).eq('id', '22222222-2222-2222-2222-222222222222');
  
  // 3. Insert PUBG Mobile Taiwan
  await supabase.from('games').insert({
    id: pubgTaiwanId,
    name: 'PUBG Mobile (Taiwan)',
    slug: 'pubg-mobile-taiwan',
    image_url: pubgGlobal.image_url,
    currency_name: 'UC'
  });
  
  // 4. Insert products for Taiwan
  await supabase.from('products').insert([
    { id: 'a2222222-2222-2222-2222-222222222223', game_id: pubgTaiwanId, amount: '60', price_dzd: 260 },
    { id: 'b2222222-2222-2222-2222-222222222223', game_id: pubgTaiwanId, amount: '325', price_dzd: 1250 },
    { id: 'c2222222-2222-2222-2222-222222222223', game_id: pubgTaiwanId, amount: '660', price_dzd: 2400 }
  ]);
  
  console.log('Done updating PUBG');
}
run();
