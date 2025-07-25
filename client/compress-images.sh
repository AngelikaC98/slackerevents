#!/bin/bash

# Image Compression Script for slackerevents
# This script compresses large images to improve website performance

echo "🖼️  Image Compression Tool"
echo "=========================="

# Create compressed directory if it doesn't exist
mkdir -p public/assets/images/compressed

echo "📁 Compressing PNG files..."
for file in public/assets/images/*.png; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .png)
        echo "   Compressing: $filename.png → $filename.jpg"
        sips -s format jpeg -s formatOptions 75 "$file" --out "public/assets/images/compressed/$filename.jpg"
    fi
done

echo "📁 Compressing JPG files..."
for file in public/assets/images/*.jpg; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "   Compressing: $filename"
        sips -s formatOptions 65 "$file" --out "public/assets/images/compressed/$filename"
    fi
done

echo "✅ Compression complete!"
echo "📊 Results:"
ls -lah public/assets/images/compressed/

echo ""
echo "💡 Next steps:"
echo "1. Review compressed images in public/assets/images/compressed/"
echo "2. Replace original files if quality is acceptable"
echo "3. Update image references in your code"
echo "4. Test the website performance"
