# 🚀 Quick Setup Guide

## Installation & Launch

### Option 1: Direct Browser Opening (Easiest)
1. Navigate to the `image-to-pdf-converter` folder
2. Double-click `index.html`
3. Your browser will open the app immediately

### Option 2: Local Server (Recommended)
For best performance and offline functionality:

#### Using Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js
```bash
# Install globally (if not already installed)
npm install -g http-server

# Run server
http-server
```

#### Using PHP
```bash
php -S localhost:8000
```

Then visit: `http://localhost:8000`

### Option 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

---

## First Time Setup Checklist

- [x] All files extracted correctly
- [x] `index.html` present in root folder
- [x] `css/style.css` file exists
- [x] All `js/` files present
- [x] Browser is up-to-date (Chrome, Firefox, Safari, or Edge)
- [x] JavaScript is enabled in browser
- [x] Pop-ups are allowed for downloads

---

## Troubleshooting

### App won't load
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Check console for errors (F12)

### Features not working
- Ensure JavaScript is enabled
- Check browser compatibility (use Chrome/Firefox if unsure)
- Try running from a local server instead of file://

### Download not working
- Check browser download settings
- Ensure no adblocker is blocking downloads
- Try a different browser

---

## System Requirements

- **RAM**: 512MB minimum (1GB+ recommended)
- **Storage**: ~5MB for app files
- **Browser**: Modern browser (2020 or newer)
- **Internet**: Required only for first load (all processing is local)

---

## File Size Limits

| Operation | Limit |
|-----------|-------|
| Single Image | 50MB |
| PDF File | 100MB |
| Batch Operation | 500MB total |
| Memory Usage | Up to 2GB |

---

## Performance Tips

1. **Close unnecessary tabs** before processing large batches
2. **Use Medium quality** for balanced speed/quality
3. **Compress in smaller batches** (5-20 images at a time)
4. **Use WebP format** for faster processing and smaller files

---

## Features Quick Reference

| Tab | Purpose | Input | Output |
|-----|---------|-------|--------|
| Image to PDF | Convert images → PDF | JPG, PNG, etc. | Single PDF |
| PDF to Image | Extract PDF pages → Images | PDF | PNG/JPG/WebP |
| Compress | Reduce image file sizes | JPG, PNG, etc. | Compressed images |
| Batch | Process multiple files | Multiple images | ZIP or individual |

---

## Default Settings

| Setting | Default Value |
|---------|---------------|
| PDF Orientation | Portrait |
| Image Scale | Fit to Page |
| PDF Quality | Medium (150 DPI) |
| Compression Quality | 80% |
| Max Image Width | 2000px |
| Max Image Height | 2000px |
| Compression Format | JPG |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Tab 1-4 | Switch between tabs |
| Ctrl+V | Paste images (on upload area) |
| Delete | Remove selected image |
| Ctrl+A | Select all images |

---

## Mobile Support

✅ **Fully Responsive**
- Works on tablets and large phones
- Touch-friendly interface
- Portrait and landscape orientation

⚠️ **Limitations**
- Large batches may slow down
- File size limits may be lower
- Some mobile browsers have restrictions

---

## Getting Help

1. **Check the README.md** for detailed documentation
2. **Review this guide** for setup issues
3. **Check browser console** (F12) for error messages
4. **Try a different browser** to isolate browser-specific issues

---

## Next Steps

After setup:
1. Try uploading a few test images
2. Experiment with different settings
3. Test each feature (PDF, compress, convert, batch)
4. Explore advanced options

---

**You're all set! Start converting 🎉**

For detailed feature documentation, see **README.md**
