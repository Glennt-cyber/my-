# 📋 Complete Feature Documentation

## Table of Contents
1. [Image to PDF Conversion](#image-to-pdf-conversion)
2. [PDF to Image Conversion](#pdf-to-image-conversion)
3. [Image Compression](#image-compression)
4. [Batch Processing](#batch-processing)
5. [Advanced Features](#advanced-features)
6. [Tips & Tricks](#tips--tricks)

---

## Image to PDF Conversion

### Overview
Convert one or multiple images into a single PDF document with complete control over layout and quality.

### Step-by-Step Usage

#### Step 1: Upload Images
1. Click the **"Image to PDF"** tab
2. **Drag & drop** images onto the upload area, OR
3. Click the upload area and select files from your computer
4. Support for JPG, PNG, WebP, GIF, BMP, SVG formats

#### Step 2: Organize Images
- **Reorder**: Click and drag images to rearrange order
- **Remove**: Hover over image and click ✕ button
- **Preview**: See thumbnail of each image with filename
- **Index**: Images are numbered in the preview (1, 2, 3...)

#### Step 3: Configure PDF Options

##### Orientation
- **Portrait** (default): Vertical page layout (210×297 mm)
- **Landscape**: Horizontal page layout (297×210 mm)
- **Auto**: Automatically adjusts based on image proportions

##### Image Scale
- **Fit to Page** (default): Scales image to fit page while maintaining aspect ratio
  - Best for: Most use cases, ensures entire image is visible
  - Pro: Images look good, consistent margins
  
- **Fill Page**: Stretches image to fill entire page
  - Best for: Background images, full-bleed documents
  - Pro: No white space
  - Con: May distort image aspect ratio
  
- **Original Size**: Uses image's actual pixel dimensions
  - Best for: Very detailed images that need exact size
  - Pro: Maximum detail preserved
  - Con: May be too large or too small

##### Quality (DPI)
- **High (300 DPI)**: Professional print quality
  - File size: Large (~1-2MB per image)
  - Best for: Documents needing to be printed
  
- **Medium (150 DPI)** (default): Balanced quality and size
  - File size: Medium (~500KB-1MB per image)
  - Best for: General use, screen viewing, email
  
- **Low (72 DPI)**: Minimal file size
  - File size: Small (~100-500KB per image)
  - Best for: Web viewing, email, when size matters most

##### Margins
- Adjustable from 0 to 50 millimeters
- Default: 10mm (provides professional spacing)
- Applied to all sides equally

#### Step 4: Download PDF
1. Enter desired filename (optional, default: "converted")
2. Click **"Convert to PDF"** button
3. File downloads automatically
4. Progress bar shows conversion status

### PDF Settings Quick Reference

| Scenario | Orientation | Scale | Quality | Margin |
|----------|-------------|-------|---------|--------|
| Professional Document | Portrait | Fit | High | 15mm |
| Email Document | Portrait | Fit | Medium | 10mm |
| Web Viewing | Portrait | Fit | Low | 10mm |
| Photo Album | Landscape | Fit | Medium | 5mm |
| Poster/Large Print | Landscape | Fill | High | 0mm |
| eBook | Portrait | Original | Medium | 5mm |

### Tips for Best Results
- **Consistent Image Sizes**: Try to use similarly-sized images for uniform PDF
- **Image Orientation**: Mix portrait and landscape images? Use "Auto" orientation
- **Quality vs Size**: Use High DPI only if printing is needed
- **Test First**: Try with a few images before doing large batches
- **Filename**: Use descriptive names (e.g., "Invoice-2024" instead of "Doc1")

---

## PDF to Image Conversion

### Overview
Extract pages or images from PDF documents and convert them to standard image formats.

### Step-by-Step Usage

#### Step 1: Upload PDF
1. Click the **"PDF to Image"** tab
2. Drag & drop PDF or click to browse
3. App automatically detects number of pages
4. Preview of first 5 pages shown

#### Step 2: Choose Conversion Type

##### All Pages
- Converts every page in the PDF to separate images
- Best for: Entire document extraction
- Output: Individual image files (page-1.png, page-2.png, etc.)

##### Page Range
- Convert specific range of pages (e.g., pages 5-15)
- Best for: Extracting chapters or sections
- Specify Start and End page numbers
- Output: Multiple image files for selected range

##### Specific Pages
- Convert individual pages (e.g., pages 1, 3, 5, 10)
- Best for: Extracting non-consecutive pages
- Comma-separated list: "1,3,5,10"
- Output: Only requested pages

#### Step 3: Configure Output Settings

##### Image Format
- **PNG**: Lossless, larger file, best for graphics
- **JPG**: Compressed, smaller file, best for photos
- **WebP**: Modern format, smallest size, excellent quality

##### Scale/Resolution
- Range: 50% - 300%
- 100% (default): Original resolution
- 50%: Smaller, faster to process
- 150-200%: Higher detail, larger files
- 300%: Maximum detail, very large files

#### Step 4: Download Images
- **Single Page**: Downloads as individual file
- **Multiple Pages**: 
  - Option to download as ZIP or individual files
  - ZIP recommended for batches (better organization)

### PDF Conversion Quality Guide

| Format | Quality | File Size | Best For |
|--------|---------|-----------|----------|
| PNG | Lossless | Large | Documents, graphics, archiving |
| JPG | Lossy | Medium | Photos, documents (no text) |
| WebP | Balanced | Small | Web, modern use |

### Best Practices
- **Text PDFs**: Use PNG for better text clarity
- **Photo PDFs**: Use JPG or WebP for smaller files
- **100% Scale**: Good starting point, adjust if needed
- **Batch Download**: Use ZIP for organization and easier transfer

---

## Image Compression

### Overview
Reduce image file sizes while maintaining acceptable quality for your use case.

### Step-by-Step Usage

#### Step 1: Upload Images
1. Click the **"Compress Image"** tab
2. Upload one or more images to compress
3. Supported formats: JPG, PNG, WebP, GIF, BMP, SVG
4. Preview shows original image with file size

#### Step 2: Configure Compression Settings

##### Quality Slider (10% - 100%)
- **10-30%**: Aggressive compression, noticeable quality loss
  - Use for: Thumbnails, very small previews
  
- **40-60%**: Moderate compression, minor quality loss
  - Use for: Web images, general sharing
  
- **70-85%**: Balanced (default: 80%), minimal quality loss
  - Use for: Email, cloud storage, most uses
  
- **90-100%**: Minimal compression, highest quality
  - Use for: Professional work, printing

##### Maximum Dimensions
- **Max Width**: Limit image width in pixels (default: 2000)
- **Max Height**: Limit image height in pixels (default: 2000)
- Maintains aspect ratio automatically
- Helps reduce file size significantly
- Example: Change from 4000×3000 to 2000×1500

##### Target File Size (Optional)
- Set desired output file size in KB
- Default: 0 (no target, use only quality setting)
- Example: Set to 500KB for email attachments
- Smart compression adjusts quality to hit target
- May compromise quality if target is very small

##### Output Format
- **JPG** (default): Best compression for photos
  - Smallest file size
  - Lossy compression (some quality loss)
  - Best for: Photographs, complex images
  
- **PNG**: Lossless compression
  - Larger files than JPG
  - No quality loss
  - Best for: Graphics, images with transparency
  
- **WebP**: Modern format
  - Better compression than JPG
  - Good quality
  - Best for: Web use, modern browsers

#### Step 3: Preview & Download
- Real-time preview shows:
  - Original file size
  - Estimated compressed size
  - Percentage saved
- Download individually or as ZIP

### Compression Strategy Guide

| Use Case | Quality | Max Size | Format | Target |
|----------|---------|----------|--------|--------|
| Email | 70% | 2000px | JPG | 500KB |
| Web Thumbnail | 50% | 500px | WebP | 50KB |
| Cloud Backup | 80% | 2000px | WebP | 1MB |
| Social Media | 75% | 1920px | JPG | 800KB |
| Print | 95% | 3000px | PNG | 5MB |
| Archive | 60% | 1920px | WebP | 500KB |

### Compression Tips
- **Photos**: JPG usually best, reduce dimensions too
- **Graphics**: PNG preserves quality, WebP smaller
- **Social Media**: 75-80% quality at 1920px width typical
- **Email**: Reduce to 500KB or less for quick send
- **Batch Compression**: Use 80% quality as default, adjust per image if needed

---

## Batch Processing

### Overview
Process multiple images with the same settings in one operation.

### Step-by-Step Usage

#### Step 1: Upload Images
1. Click the **"Batch Convert"** tab
2. Upload multiple images (5+ recommended)
3. All images display in file list

#### Step 2: Select Processing Type

##### Batch Convert to PDF
- Combines all images into single PDF
- Useful for: Photo albums, document scanning, portfolios
- Settings: Same as "Image to PDF" tab
- Output: One PDF file with all images

##### Batch Compress
- Compresses all images with same settings
- Useful for: Photo backup, email distribution
- Settings: Quality, dimensions, format
- Output: Compressed copies (keeps original format)

##### Batch Convert Format
- Converts all to same format (JPG, PNG, WebP, BMP)
- Useful for: Format standardization, compatibility
- Example: All PNGs → JPGs
- Output: All files in new format

#### Step 3: Configure Options
- Settings vary by processing type
- Same options as individual conversion tools
- Apply to all images uniformly

#### Step 4: Process & Download
- Click "Start Batch Processing"
- Progress bar shows overall status
- Large batches automatically download as ZIP
- Individual downloads available for small batches

### Batch Processing Examples

**Example 1: Wedding Photo Album**
1. Upload 50 wedding photos
2. Select "Batch Convert to PDF"
3. Set Landscape orientation, Fit to Page
4. Use Medium quality
5. Set margin to 5mm
6. Download as single album PDF

**Example 2: Archive Old Photos**
1. Upload 100 JPEG photos
2. Select "Batch Compress"
3. Set Quality to 70%
4. Reduce to 1920px max width
5. Keep as JPG format
6. Download ZIP to archive

**Example 3: Format Standardization**
1. Upload mixed PNG/GIF/BMP files
2. Select "Batch Convert Format"
3. Choose WebP target format
4. Download ZIP with all WebP files

### Batch Processing Tips
- **Optimal Size**: 5-50 images per batch
- **Memory**: Close other apps for 100+ images
- **Progress**: Check toast notifications for status
- **Organization**: Keep similar images in same batch
- **Naming**: Original filenames preserved in output

---

## Advanced Features

### Drag-to-Reorder Images
**For Image to PDF Tab:**
1. Upload multiple images
2. Click and hold on any image
3. Drag to new position
4. Release to drop
5. Order number updates automatically
6. Essential for creating logical document flow

### Real-Time Preview
- **Before**: See thumbnail before any processing
- **After**: Quality preview in compress tab
- **Size Estimation**: Actual/estimated file sizes shown
- **Comparison**: Before/after size comparison in compression

### Progress Tracking
- Progress bar shows current operation status
- Percentage completion displayed
- Current step description shown
- Smooth animations for better UX

### Toast Notifications
- Success: Green border (✓ operation complete)
- Error: Red border (✗ problem occurred)
- Warning: Yellow border (⚠ check settings)
- Info: Blue border (ℹ general information)
- Auto-dismiss after 3 seconds

### Keyboard Shortcuts
- **Tab Keys**: Switch between tabs
- **Ctrl+V**: Paste images on upload area
- **Delete**: Remove image (if focused)
- **Escape**: Close any open dialogs

### Browser Storage
- Files not stored locally (100% client-side)
- No persistence between sessions
- Complete privacy guaranteed

---

## Tips & Tricks

### Performance Optimization
1. **Batch Size**: Process 5-20 images at a time
2. **Quality Settings**: Start with Medium/75%, adjust down if needed
3. **Format Choice**: WebP for best speed/size ratio
4. **Browser Memory**: Close other tabs before large batches
5. **File Preprocessing**: Pre-resize very large images

### Quality vs. File Size
```
High Quality = Larger File
Low Quality = Smaller File

Balance Point: Usually 75-80% quality and 1920px max width
```

### Best Combinations
- **Professional PDFs**: High DPI, Fit to Page, Portrait, 15mm margin
- **Email**: Medium quality, 1920px width, JPG format, 500KB target
- **Web**: Low quality, 1200px width, WebP format, 100KB target
- **Archive**: Medium quality, 2000px width, WebP format, 1MB target
- **Print**: High quality, Original size, PNG format, no target

### Troubleshooting Common Issues

**Issue: Large File Size**
- Solution: Reduce quality 10-20%, decrease dimensions

**Issue: Quality Loss**
- Solution: Increase quality slider, use PNG format

**Issue: Slow Processing**
- Solution: Reduce batch size, use WebP, close other tabs

**Issue: Download Failing**
- Solution: Check browser download settings, disable popup blocker

**Issue: Memory Error**
- Solution: Restart browser, reduce batch size, clear cache

### Privacy & Security Features
- ✅ All processing on your device (no cloud upload)
- ✅ No cookies or tracking
- ✅ No data retention
- ✅ Works offline after first load
- ✅ No account required

### Accessibility Features
- ✅ Keyboard navigation (Tab key)
- ✅ Large clickable areas
- ✅ Clear visual feedback
- ✅ High contrast interface
- ✅ Mobile responsive

---

## Support Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Image to PDF | ✅ | ✅ | ✅ | ✅ |
| PDF to Image | ✅ | ✅ | ✅ | ✅ |
| Compression | ✅ | ✅ | ✅ | ✅ |
| Batch Process | ✅ | ✅ | ✅ | ✅ |
| Drag & Drop | ✅ | ✅ | ✅ | ✅ |
| ZIP Download | ✅ | ✅ | ✅ | ✅ |

---

## File Size Reference

### Typical PDF Sizes (per image)
- Low Quality (72 DPI): 100-500 KB
- Medium Quality (150 DPI): 500 KB - 1 MB
- High Quality (300 DPI): 1-2 MB

### Typical Compression Results
- Quality 50%: 30-40% of original
- Quality 70%: 50-60% of original
- Quality 90%: 80-90% of original

### Typical PDF to Image Results
- 100% Scale: Original PDF resolution
- 150% Scale: 1.5× larger, more detail
- 50% Scale: Half size, faster processing

---

**For more help, check QUICKSTART.md or README.md**
