const fs = require('fs');

const games = [
  { id: '11111111-1111-1111-1111-111111111111', term: 'mobile legends bang bang' },
  { id: '22222222-2222-2222-2222-222222222222', term: 'pubg mobile' },
  { id: '33333333-3333-3333-3333-333333333333', term: 'free fire' },
  { id: '44444444-4444-4444-4444-444444444444', term: 'blood strike' },
  { id: '55555555-5555-5555-5555-555555555555', term: 'genshin impact' },
  { id: '66666666-6666-6666-6666-666666666666', term: 'honkai star rail' },
  { id: '77777777-7777-7777-7777-777777777777', term: 'wuthering waves' },
  { id: '88888888-8888-8888-8888-888888888888', term: 'brawl stars' },
  { id: '99999999-9999-9999-9999-999999999999', term: 'love and deepspace' }
];

async function run() {
  const results = [];
  for (const game of games) {
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(game.term)}&entity=software&limit=1`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        // Get the high-res icon (replacing 512x512bb with 1024x1024bb if possible, or just use 512)
        let iconUrl = data.results[0].artworkUrl512;
        results.push({ id: game.id, url: iconUrl });
        console.log(`Found icon for ${game.term}: ${iconUrl}`);
      } else {
        console.log(`No results for ${game.term}`);
      }
    } catch (e) {
      console.error(`Error fetching ${game.term}:`, e.message);
    }
  }
  fs.writeFileSync('icons.json', JSON.stringify(results, null, 2));
}

run();
