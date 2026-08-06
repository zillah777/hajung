const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'temp_images');
const destDir = path.join(__dirname, 'public', 'images', 'restaurant');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));

files.forEach((file, index) => {
  const num = index + 1;
  const targetName = `item-${num}.jpg`;
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, targetName));
  console.log(`Copied ${file} -> ${targetName}`);
});

console.log(`Successfully copied ${files.length} images.`);
