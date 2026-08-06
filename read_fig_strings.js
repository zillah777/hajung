const fs = require('fs');
const path = require('path');

const buf = fs.readFileSync(path.join(__dirname, 'fig_extracted', 'canvas.fig'));

// Scan raw buffer for ASCII and UTF-8 strings of length >= 3
const asciiMatches = [];
let currentStr = '';

for (let i = 0; i < buf.length; i++) {
  const byte = buf[i];
  if (byte >= 32 && byte <= 126) {
    currentStr += String.fromCharCode(byte);
  } else {
    if (currentStr.length >= 3) {
      asciiMatches.push(currentStr);
    }
    currentStr = '';
  }
}

console.log('Total raw ASCII string tokens:', asciiMatches.length);

// Filter out noise / hashes
const designWords = asciiMatches.filter(s => {
  const lower = s.toLowerCase();
  return (
    lower.includes('menu') || lower.includes('qitchen') || lower.includes('sushi') ||
    lower.includes('ramen') || lower.includes('about') || lower.includes('story') ||
    lower.includes('book') || lower.includes('table') || lower.includes('reservation') ||
    lower.includes('location') || lower.includes('hours') || lower.includes('contact') ||
    lower.includes('playfair') || lower.includes('inter') || lower.includes('cinzel') ||
    lower.includes('hero') || lower.includes('footer') || lower.includes('card') ||
    lower.includes('chef') || lower.includes('gallery') || lower.includes('experience') ||
    lower.includes('price') || lower.includes('star') || lower.includes('michelin')
  );
});

console.log('Relevant design text found in Figma file:');
console.log([...new Set(designWords)]);
