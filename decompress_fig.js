const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const canvasPath = path.join(__dirname, 'fig_extracted', 'canvas.fig');
const buf = fs.readFileSync(canvasPath);

console.log('Header magic:', buf.subarray(0, 8).toString('utf-8'));
console.log('Header bytes:', buf.subarray(0, 16));

// Try zlib inflate raw / zlib
let decompressed;
try {
  // Figma fig files start with "fig-kiwi" or "fig-jam" or zlib compressed data starting after header
  // Let's check where the zlib header starts
  for (let i = 0; i < 32; i++) {
    try {
      decompressed = zlib.inflateRawSync(buf.subarray(i));
      console.log(`Decompressed raw zlib at offset ${i}! Length: ${decompressed.length}`);
      break;
    } catch (e) {
      try {
        decompressed = zlib.inflateSync(buf.subarray(i));
        console.log(`Decompressed zlib at offset ${i}! Length: ${decompressed.length}`);
        break;
      } catch (e2) {}
    }
  }
} catch (err) {
  console.error('Decompress failed:', err);
}

if (decompressed) {
  const decStr = decompressed.toString('utf-8');
  const printable = decStr.match(/[\x20-\x7E]{3,}/g) || [];
  console.log('Total printable strings in decompressed canvas:', printable.length);
  
  // Write all readable text strings to a log file for review
  fs.writeFileSync('fig_strings.txt', printable.join('\n'));
  console.log('Saved strings to fig_strings.txt');
  
  // Print unique text titles and UI labels
  const uniqueLabels = [...new Set(printable)].filter(s => s.length >= 3 && !s.startsWith('node') && !s.startsWith('style'));
  console.log('Sample design labels:', uniqueLabels.slice(0, 50));
}
