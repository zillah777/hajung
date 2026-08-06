const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const buf = fs.readFileSync(path.join(__dirname, 'fig_extracted', 'canvas.fig'));

console.log('Total file bytes:', buf.length);
console.log('First 16 bytes:', buf.subarray(0, 16));

// Try decompressing starting at offset 8 (after "fig-kiwi")
for (let offset = 4; offset < 32; offset++) {
  try {
    const decompressed = zlib.inflateRawSync(buf.subarray(offset));
    console.log(`Successfully decompressed with inflateRaw at offset ${offset}! Decompressed size: ${decompressed.length}`);
    
    // Write decompressed data
    fs.writeFileSync('decompressed_canvas.bin', decompressed);
    
    // Extract printable strings
    const str = decompressed.toString('latin1');
    const strings = str.match(/[\x20-\x7E]{3,}/g) || [];
    console.log('Total printable ASCII strings:', strings.length);
    
    // Filter relevant design text
    const designText = strings.filter(s => {
      const l = s.toLowerCase();
      return (
        l.includes('menu') || l.includes('qitchen') || l.includes('sushi') ||
        l.includes('ramen') || l.includes('about') || l.includes('story') ||
        l.includes('book') || l.includes('table') || l.includes('reservation') ||
        l.includes('location') || l.includes('hours') || l.includes('contact') ||
        l.includes('playfair') || l.includes('inter') || l.includes('cinzel') ||
        l.includes('hero') || l.includes('footer') || l.includes('card') ||
        l.includes('chef') || l.includes('gallery') || l.includes('experience') ||
        l.includes('price') || l.includes('star') || l.includes('michelin') ||
        l.includes('craft') || l.includes('fresh') || l.includes('drink') ||
        l.includes('dessert') || l.includes('appetizer') || l.includes('dinner')
      );
    });
    
    console.log('Extracted design labels from decompressed Figma canvas:');
    console.log([...new Set(designText)].slice(0, 100));
    break;
  } catch (e) {
    try {
      const decompressed = zlib.inflateSync(buf.subarray(offset));
      console.log(`Successfully decompressed with inflate at offset ${offset}! Decompressed size: ${decompressed.length}`);
      fs.writeFileSync('decompressed_canvas.bin', decompressed);
      break;
    } catch (e2) {}
  }
}
