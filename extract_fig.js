const { execSync } = require('child_process');
const fs = require('fs');

try {
  execSync('powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory(\'Qitchen.fig\', \'fig_extracted\')"', { stdio: 'inherit' });
  console.log('Successfully extracted Qitchen.fig to fig_extracted/');
} catch (err) {
  console.error('Extraction error:', err.message);
}
