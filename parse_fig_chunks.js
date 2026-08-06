const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const buf = fs.readFileSync(path.join(__dirname, 'fig_extracted', 'canvas.fig'));

// The first 8 bytes are 'fig-kiwi'
// After offset 8, there are zlib chunks. Let's find all zlib streams in the file!
let offset = 8;
let chunkIndex = 0;
let allStrings = [];

while (offset < buf.length) {
  // Read 4-byte length
  if (offset + 4 > buf.length) break;
  const chunkLen = buf.readUInt32LE(offset);
  offset += 4;
  
  if (offset + chunkLen > buf.length) break;
  const chunkData = buf.subarray(offset, offset + chunkLen);
  offset += chunkLen;
  
  try {
    const decompressed = zlib.inflateRawSync(chunkData);
    chunkIndex++;
    console.log(`Decompressed chunk #${chunkIndex}: compressed ${chunkLen} bytes -> decompressed ${decompressed.length} bytes`);
    
    // Extract printable strings
    const str = decompressed.toString('utf-8');
    const strings = str.match(/[\x20-\x7E]{3,}/g) || [];
    allStrings.push(...strings);
  } catch (err) {
    // Try standard inflate
    try {
      const decompressed = zlib.inflateSync(chunkData);
      chunkIndex++;
      console.log(`Decompressed chunk #${chunkIndex}: compressed ${chunkLen} bytes -> decompressed ${decompressed.length} bytes`);
      const str = decompressed.toString('utf-8');
      const strings = str.match(/[\x20-\x7E]{3,}/g) || [];
      allStrings.push(...strings);
    } catch (e) {}
  }
}

console.log(`Extracted total ${allStrings.length} strings from Figma Kiwi chunks!`);

// Filter meaningful UI design text strings
const cleanStrings = allStrings.filter(s => 
  s.length >= 2 && 
  !/^[A-Za-z0-9+/=]{40,}$/.test(s) && // Ignore base64 hashes
  !/^[0-9a-f]{32,}$/i.test(s) // Ignore md5 hashes
);

const unique = [...new Set(cleanStrings)];
console.log('Sample extracted Figma text strings:');
console.log(unique.slice(0, 80));

fs.writeFileSync('qitchen_figma_strings.txt', unique.join('\n'));
