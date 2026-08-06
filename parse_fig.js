const fs = require('fs');
const path = require('path');

const metaPath = path.join(__dirname, 'fig_extracted', 'meta.json');
if (fs.existsSync(metaPath)) {
  console.log('--- meta.json ---');
  console.log(fs.readFileSync(metaPath, 'utf-8'));
}

// Let's inspect text nodes in canvas.fig
const canvasPath = path.join(__dirname, 'fig_extracted', 'canvas.fig');
if (fs.existsSync(canvasPath)) {
  const buf = fs.readFileSync(canvasPath);
  console.log('canvas.fig size:', buf.length);

  // canvas.fig in Figma files is often compressed with zlib/deflate or raw binary protobuf
  // Let's see if we can decompress or search for ASCII strings inside buffer
  const str = buf.toString('utf-8');
  // Find all printable ASCII text strings >= 4 chars
  const asciiMatches = str.match(/[\x20-\x7E]{4,}/g) || [];
  console.log('Total ASCII string fragments found:', asciiMatches.length);
  
  // Filter relevant text strings like section titles, font names, colors
  const textStrings = asciiMatches.filter(s => 
    s.includes('Qitchen') || s.includes('Menu') || s.includes('Sushi') || 
    s.includes('Playfair') || s.includes('Inter') || s.includes('Book') || 
    s.includes('About') || s.includes('Reservation') || s.includes('Hours') ||
    s.includes('#') || s.includes('RGB') || s.includes('px') || s.includes('http')
  );
  
  console.log('Sample extracted strings from Figma canvas:', textStrings.slice(0, 30));
}
