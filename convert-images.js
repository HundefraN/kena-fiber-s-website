const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, 'src', 'assets');

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      const webpPath = path.join(directory, `${basename}.webp`);

      try {
        console.log(`Converting ${file} to webp...`);
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        
        console.log(`Deleting original ${file}...`);
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

processDirectory(targetDir).then(() => {
  console.log('Finished converting all images to webp!');
}).catch(err => {
  console.error('Fatal error:', err);
});
