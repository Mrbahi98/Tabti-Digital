import supabase from './api/_supabase.js';
import fs from 'fs';

const icons = JSON.parse(fs.readFileSync('icons.json', 'utf8'));

async function update() {
  for (const icon of icons) {
    const { error } = await supabase
      .from('games')
      .update({ image_url: icon.url.replace('512x512bb', '1024x1024bb') })
      .eq('id', icon.id);
    if (error) console.error('Error updating', icon.id, error);
    else console.log('Updated', icon.id);
  }
}

update();
