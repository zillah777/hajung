const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const figPath = path.join(__dirname, 'Qitchen.fig');

if (fs.existsSync(figPath)) {
  const stats = fs.statSync(figPath);
  console.log(`Qitchen.fig size: ${stats.size} bytes`);
  
  // Read first few bytes to check if it's a zip (PK\x03\x04)
  const fd = fs.openSync(figPath, 'r');
  const buffer = Buffer.alloc(100);
  fs.readSync(fd, buffer, 0, 100, 0);
  fs.closeSync(fd);
  
  console.log('Magic header:', buffer.subarray(0, 4).toString('utf-8'));
  console.log('Magic bytes:', buffer.subarray(0, 4));
}
