const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/assets/gallery';
const outputDir = 'public/assets/gallery/converted';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get all PNG files
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.PNG'));

async function convertImage(file) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.PNG', '.webp'));
    
    try {
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
        
        console.log(`Converted ${file} to WebP`);
    } catch (error) {
        console.error(`Error converting ${file} to WebP:`, error);
    }
}

async function processImages() {
    for (const file of files) {
        await convertImage(file);
    }
}

processImages().then(() => {
    console.log('All images processed successfully!');
}).catch(error => {
    console.error('Error processing images:', error);
}); 