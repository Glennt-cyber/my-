# 📄 Image to PDF Converter

A modern, feature-rich web application for converting images to PDF, PDF to images, compressing images, and batch processing - all with a clean, minimal UI.

## ✨ Features

### 1. **Image to PDF Conversion**
- Convert multiple images to a single PDF document
- Drag & drop interface for easy file upload
- **Reorder images** before conversion (drag to rearrange)
- Customizable PDF settings:
  - **Orientation**: Portrait, Landscape, or Auto-detect
  - **Image Scaling**: Fit to Page, Fill Page, or Original Size
  - **Quality**: High (300 DPI), Medium (150 DPI), Low (72 DPI)
  - **Custom Margins**: Adjustable margins in millimeters
- Preview of all images before conversion
- Individual image removal without clearing all
- Custom PDF filename

### 2. **PDF to Image Conversion**
- Extract images from PDF documents
- Multiple conversion options:
  - **Convert All Pages**: Convert entire PDF to images
  - **Range Conversion**: Convert specific page range
  - **Specific Pages**: Convert individual pages (e.g., 1,3,5)
- Output format selection: PNG, JPG, WebP
- Adjustable scale/resolution (50% - 300%)
- Preview of PDF pages
- Batch download as ZIP or individual downloads

### 3. **Image Compression**
- Compress multiple images simultaneously
- Customizable compression settings:
  - **Quality Slider**: Fine-grained control (10% - 100%)
  - **Maximum Dimensions**: Reduce image width/height
  - **Target File Size**: Set desired output size in KB
  - **Output Format**: JPG, PNG, or WebP
- Real-time compression preview with before/after sizes
- Savings statistics (percentage and file size reduction)
- Individual image removal

### 4. **Batch Processing**
- Process multiple images with the same settings:
  - **Batch Convert to PDF**: All images → Single PDF
  - **Batch Compress**: Compress all images at once
  - **Batch Format Conversion**: Convert all to same format (JPG, PNG, WebP, BMP)
- File list preview
- Progress tracking
- Automatic ZIP creation for multiple files

## 🚀 Getting Started

### Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation needed - runs entirely in the browser

### Installation

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. Start converting!

### Quick Start

#### Converting Images to PDF
1. Click the "Image to PDF" tab
2. Click the upload area or drag & drop images
3. Arrange images in desired order by dragging
4. Adjust PDF options (orientation, scale, quality)
5. Enter filename and click "Convert to PDF"

#### Converting PDF to Images
1. Click the "PDF to Image" tab
2. Upload your PDF file
3. Select conversion type (all pages, range, or specific)
4. Choose output format and scale
5. Click "Convert to Images"

#### Compressing Images
1. Click the "Compress Image" tab
2. Upload images to compress
3. Adjust quality, dimensions, and format
4. Click "Compress Images"
5. Download individually or as ZIP

#### Batch Processing
1. Click the "Batch Convert" tab
2. Upload multiple images
3. Select processing type
4. Configure options
5. Start processing

## 🎨 UI/UX Features

### Clean & Minimal Design
- Modern gradient header
- Intuitive tab-based navigation
- Responsive grid layout
- Smooth animations and transitions
- Dark-aware color scheme

### User-Friendly Interface
- **Drag & Drop**: Upload files by dragging over designated areas
- **Real-time Preview**: See thumbnail previews of all images
- **Progress Tracking**: Visual progress bar during processing
- **Toast Notifications**: Clear feedback for all actions
- **Disabled States**: Buttons intelligently enable/disable based on input
- **Mobile Responsive**: Works on all screen sizes

### File Handling
- Drag to reorder images in PDF
- Remove individual files without clearing all
- File size validation with error messages
- Support for multiple image formats: JPEG, PNG, WebP, GIF, BMP, SVG

## 📊 Advanced Features

### PDF Customization
- **DPI Selection**: Choose quality based on use case
- **Page Orientation**: Auto-detect, portrait, or landscape
- **Image Scaling**: 
  - Fit to page (maintains aspect ratio)
  - Fill page (stretches to fill)
  - Original size (no scaling)
- **Margins**: Adjust spacing around images

### Image Compression
- **Smart Compression**: Iterative quality reduction to hit target file size
- **Format Conversion**: Save in most efficient format for size/quality
- **Dimension Limiting**: Automatically resize large images
- **Quality Preview**: Real-time estimation of file size savings

### Batch Processing
- Process multiple files with consistent settings
- Automatic ZIP creation for large batches
- Progress tracking for each file
- Flexible output options

## 🔧 Technical Stack

### Frontend Technologies
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS variables and Grid/Flexbox
- **Vanilla JavaScript**: No dependencies for core functionality

### Libraries Used
- **pdf-lib**: PDF creation and manipulation
- **pdf.js**: PDF reading and page rendering
- **jszip**: ZIP file creation for batch downloads
- **html2pdf.js**: HTML to PDF conversion utility

### Browser APIs
- File Reader API: Local file handling
- Canvas API: Image manipulation and compression
- Blob API: File creation and download
- Drag & Drop API: File upload functionality

## 📁 File Structure

```
image-to-pdf-converter/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Complete styling
├── js/
│   ├── utils.js           # Utility functions
│   ├── image-to-pdf.js    # Image to PDF conversion
│   ├── pdf-to-image.js    # PDF to Image conversion
│   ├── compress-image.js  # Image compression
│   ├── batch-process.js   # Batch processing
│   └── main.js            # App initialization
└── README.md              # This file
```

## 🎯 Key Functions

### Image to PDF Conversion
- `ImageToPdfConverter.handleFileSelect()`: Process uploaded images
- `ImageToPdfConverter.renderImagePreview()`: Display image previews
- `ImageToPdfConverter.convertToPdf()`: Main conversion function
- `makeDraggable()`: Enable drag-to-reorder functionality

### PDF to Image Conversion
- `PdfToImageConverter.handleFileSelect()`: Load PDF file
- `PdfToImageConverter.renderPdfPreview()`: Show PDF pages
- `getPdfPageCount()`: Get total pages in PDF
- `renderPdfPageAsImage()`: Convert page to image

### Image Compression
- `ImageCompressor.compressImage()`: Main compression logic
- `resizeImageCanvas()`: Resize images while maintaining aspect ratio
- `canvasToBlob()`: Convert canvas to compressed blob

### Batch Processing
- `BatchProcessor.processBatch()`: Route to appropriate batch function
- `batchConvertToPdf()`: Convert multiple images to PDF
- `batchCompress()`: Compress multiple images
- `batchConvertFormat()`: Convert format for batch

## 💡 Usage Tips

### Best Practices
1. **For PDFs**: Use Medium quality for most use cases, High for documents that need clarity
2. **For Compression**: Start with 80% quality, adjust down if size matters more than quality
3. **For Batch Operations**: Use JPG for photos, PNG for graphics with transparency
4. **Large Files**: Use WebP format for smaller file sizes with good quality

### File Size Guidelines
- Small documents: Low quality (72 DPI) - ~100-500KB per page
- Standard documents: Medium quality (150 DPI) - ~500KB-1MB per page
- Print-ready: High quality (300 DPI) - ~1-2MB per page

### Format Selection
- **JPG**: Best for photographs (smallest file, good quality)
- **PNG**: Best for graphics and images with transparency (lossless)
- **WebP**: Modern format (smallest, excellent quality)
- **BMP**: Uncompressed (largest, rarely needed)

## 🔒 Privacy & Security

- **100% Client-Side**: All processing happens in your browser
- **No Data Upload**: Files never leave your device
- **No Tracking**: No analytics or data collection
- **No Server Required**: Works completely offline (after initial load)

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Excellent |
| Firefox | ✅ Excellent |
| Safari | ✅ Excellent |
| Edge | ✅ Excellent |
| Opera | ✅ Excellent |
| IE 11 | ❌ Not supported |

## 📝 Limitations

1. **File Size**: Maximum practical file size depends on browser memory (typically 100-500MB)
2. **PDF Extraction**: Complex PDFs may not extract images perfectly
3. **Batch Operations**: Very large batches may consume more memory
4. **Format Conversion**: Some formats may not be supported on older browsers

## 🚀 Performance Tips

- **Optimal Batch Size**: 5-20 images per batch
- **Quality vs Speed**: Lower quality settings process faster
- **Format Selection**: WebP format processes faster and produces smaller files
- **Memory**: Close other tabs for faster processing

## 🎓 Examples

### Convert Multiple Photos to PDF
1. Upload 10 vacation photos
2. Keep them in chronological order
3. Set to Landscape orientation (Fit to Page)
4. Use Medium quality
5. Download as "Vacation-2024.pdf"

### Compress Images for Email
1. Upload high-res images
2. Set target size to 500KB
3. Select JPG format
4. Click Compress
5. Download and email

### Batch Convert RAW images
1. Upload multiple images
2. Select Batch Convert → Format Conversion
3. Select WebP format
4. Download ZIP with all converted images

## 🆘 Troubleshooting

### Issue: "PDF conversion fails"
**Solution**: Ensure all images are valid formats. Try with smaller file sizes first.

### Issue: "Compression not working"
**Solution**: Check browser console for errors. Try reducing quality or dimensions.

### Issue: "Large file slow to process"
**Solution**: Split into smaller batches, close other tabs, restart browser.

### Issue: "Download doesn't start"
**Solution**: Check browser download settings, ensure pop-ups are allowed.

## 📧 Support

For issues or suggestions:
1. Check the Troubleshooting section
2. Try a different browser
3. Clear browser cache and try again
4. Ensure you have the latest browser version

## 📄 License

This project is free to use for personal and commercial purposes.

## 🙏 Acknowledgments

Built with modern web technologies:
- pdf-lib for PDF manipulation
- pdf.js for PDF viewing
- jszip for file compression
- HTML5 Canvas for image processing

## 🎉 Version History

**Version 1.0** (February 2026)
- ✅ Image to PDF conversion
- ✅ PDF to Image conversion
- ✅ Image compression
- ✅ Batch processing
- ✅ Responsive design
- ✅ Progress tracking
- ✅ Toast notifications

---

**Enjoy converting! 🚀**

*Made with ❤️ for easy file conversion*
