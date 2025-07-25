const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const path = require('path');

async function compressImages() {
  try {
    console.log('🖼️  Starting image compression...');
    
    // Compress PNG files (like proof.png)
    const pngFiles = await imagemin(['public/assets/images/*.png'], {
      destination: 'public/assets/images/compressed',
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8], // 60-80% quality
          strip: true // Remove metadata
        })
      ]
    });
    
    console.log('✅ PNG compression completed:', pngFiles.length, 'files');
    
    // Compress JPG files (like the poster files)
    const jpgFiles = await imagemin(['public/assets/images/*.jpg'], {
      destination: 'public/assets/images/compressed',
      plugins: [
        imageminMozjpeg({
          quality: 75, // 75% quality
          progressive: true
        })
      ]
    });
    
    console.log('✅ JPG compression completed:', jpgFiles.length, 'files');
    
    // Show file sizes
    const fs = require('fs');
    const originalDir = 'public/assets/images/';
    const compressedDir = 'public/assets/images/compressed/';
    
    console.log('\n📊 Compression Results:');
    console.log('='.repeat(50));
    
    const files = ['proof.png', 'Slackathon 3 - POST POSTER.jpg', 'Islatín & Las Hienas - POSTER-SocialMedia.jpg'];
    
    files.forEach(file => {
      try {
        const originalPath = path.join(originalDir, file);
        const compressedPath = path.join(compressedDir, file);
        
        if (fs.existsSync(originalPath) && fs.existsSync(compressedPath)) {
          const originalSize = fs.statSync(originalPath).size;
          const compressedSize = fs.statSync(compressedPath).size;
          const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
          
          console.log(`📁 ${file}:`);
          console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
          console.log(`   Compressed: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
          console.log(`   Savings: ${savings}%`);
          console.log('');
        }
      } catch (error) {
        console.log(`❌ Could not process ${file}: ${error.message}`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error during compression:', error);
  }
}

compressImages();
