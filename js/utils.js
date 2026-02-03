// Utility Functions

/**
 * Show toast notification
 */
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

/**
 * Show progress bar
 */
function showProgress(progress, text = 'Processing...') {
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressBar.style.display = 'block';
    progressFill.style.width = progress + '%';
    progressText.textContent = text;
}

/**
 * Hide progress bar
 */
function hideProgress() {
    const progressBar = document.getElementById('progressBar');
    setTimeout(() => {
        progressBar.style.display = 'none';
    }, 500);
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get image dimensions
 */
function getImageDimensions(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Resize image canvas
 */
function resizeImageCanvas(canvas, targetWidth, targetHeight, maintain = false) {
    const ctx = canvas.getContext('2d');
    let newWidth = targetWidth;
    let newHeight = targetHeight;
    
    if (maintain) {
        const ratio = canvas.width / canvas.height;
        if (ratio > 1) {
            newHeight = Math.round(newWidth / ratio);
        } else {
            newWidth = Math.round(newHeight * ratio);
        }
    }
    
    const scaledCanvas = document.createElement('canvas');
    scaledCanvas.width = newWidth;
    scaledCanvas.height = newHeight;
    const scaledCtx = scaledCanvas.getContext('2d');
    scaledCtx.drawImage(canvas, 0, 0, newWidth, newHeight);
    
    return scaledCanvas;
}

/**
 * Convert file to canvas
 */
function fileToCanvas(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Convert canvas to blob
 */
function canvasToBlob(canvas, type = 'image/jpeg', quality = 0.8) {
    return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
    });
}

/**
 * Download file
 */
function downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Download multiple files as zip
 */
async function downloadFilesAsZip(files, zipName = 'converted-images.zip') {
    const zip = new JSZip();
    
    for (const file of files) {
        zip.file(file.name, file.blob);
    }
    
    const blob = await zip.generateAsync({ type: 'blob' });
    downloadFile(blob, zipName);
}

/**
 * Validate image file
 */
function isValidImageFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'];
    return validTypes.includes(file.type);
}

/**
 * Validate PDF file
 */
function isValidPdfFile(file) {
    return file.type === 'application/pdf';
}

/**
 * Get image orientation
 */
async function getImageOrientation(file) {
    const dimensions = await getImageDimensions(file);
    if (dimensions.width > dimensions.height) return 'landscape';
    if (dimensions.width < dimensions.height) return 'portrait';
    return 'square';
}

/**
 * Calculate optimal page size based on image
 */
function getOptimalPageSize(imgWidth, imgHeight, orientation = 'portrait') {
    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;
    const A4_LANDSCAPE_WIDTH = 297;
    const A4_LANDSCAPE_HEIGHT = 210;
    
    if (orientation === 'landscape') {
        return { width: A4_LANDSCAPE_WIDTH, height: A4_LANDSCAPE_HEIGHT };
    } else if (orientation === 'auto') {
        const ratio = imgWidth / imgHeight;
        if (ratio > 0.7) {
            return { width: A4_LANDSCAPE_WIDTH, height: A4_LANDSCAPE_HEIGHT };
        }
    }
    
    return { width: A4_WIDTH, height: A4_HEIGHT };
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Generate unique ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Sanitize filename
 */
function sanitizeFilename(filename) {
    return filename.replace(/[^a-z0-9_\-\.]/gi, '-').replace(/^-+|-+$/g, '');
}

/**
 * Get file extension
 */
function getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
}

/**
 * Remove file extension
 */
function removeFileExtension(filename) {
    return filename.replace(/\.[^/.]+$/, '');
}

/**
 * Create canvas from image element
 */
function imageElementToCanvas(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return canvas;
}

/**
 * Check if browser supports required APIs
 */
function checkBrowserSupport() {
    const support = {
        fileAPI: typeof FileReader !== 'undefined',
        canvas: typeof HTMLCanvasElement !== 'undefined',
        blob: typeof Blob !== 'undefined',
        indexedDB: !!window.indexedDB,
        serviceWorker: 'serviceWorker' in navigator
    };
    
    return Object.values(support).every(v => v);
}

/**
 * Compress image using canvas
 */
async function compressImageCanvas(file, maxWidth = 2000, maxHeight = 2000, quality = 0.8, format = 'image/jpeg') {
    const canvas = await fileToCanvas(file);
    let { width, height } = canvas;
    
    // Calculate new dimensions while maintaining aspect ratio
    if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
        
        const scaledCanvas = resizeImageCanvas(canvas, width, height);
        const blob = await canvasToBlob(scaledCanvas, format, quality);
        return blob;
    }
    
    const blob = await canvasToBlob(canvas, format, quality);
    return blob;
}

/**
 * Create draggable list item (Works on Desktop and Mobile)
 */
function makeDraggable(container) {
    let draggedElement = null;
    let isTouch = false;
    
    // Make all image items draggable
    const makeItemDraggable = (item) => {
        // Desktop drag and drop
        item.draggable = true;
        
        item.addEventListener('dragstart', (e) => {
            draggedElement = item;
            item.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
        });
        
        item.addEventListener('dragend', (e) => {
            item.classList.remove('dragging');
            draggedElement = null;
        });
        
        // Mobile touch support
        item.addEventListener('touchstart', (e) => {
            isTouch = true;
            draggedElement = item;
            item.classList.add('dragging');
            e.preventDefault();
        }, { passive: false });
        
        item.addEventListener('touchmove', (e) => {
            if (!draggedElement || !isTouch) return;
            e.preventDefault();
            
            const touch = e.touches[0];
            const allItems = Array.from(container.querySelectorAll('.image-item'));
            
            // Get element below touch point
            const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            const targetElement = elementBelow?.closest('.image-item');
            
            if (targetElement && draggedElement && draggedElement !== targetElement) {
                const draggedIndex = allItems.indexOf(draggedElement);
                const targetIndex = allItems.indexOf(targetElement);
                
                if (draggedIndex < targetIndex) {
                    targetElement.parentNode.insertBefore(draggedElement, targetElement.nextSibling);
                } else {
                    targetElement.parentNode.insertBefore(draggedElement, targetElement);
                }
            }
        }, { passive: false });
        
        item.addEventListener('touchend', (e) => {
            if (draggedElement) {
                draggedElement.classList.remove('dragging');
                draggedElement = null;
            }
            isTouch = false;
        });
    };
    
    // Initialize drag for existing items
    container.querySelectorAll('.image-item').forEach(item => {
        makeItemDraggable(item);
    });
    
    // Handle desktop drag over events
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedElement) {
            e.dataTransfer.dropEffect = 'move';
        }
    });
    
    container.addEventListener('drop', (e) => {
        e.preventDefault();
    });
}

/**
 * Get PDF document pages count
 */
async function getPdfPageCount(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            pdfjsLib.getDocument({ data: e.target.result }).promise.then((pdf) => {
                resolve(pdf.numPages);
            });
        };
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Render PDF page as image
 */
async function renderPdfPageAsImage(file, pageNum = 1, scale = 2) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            pdfjsLib.getDocument({ data: e.target.result }).promise.then((pdf) => {
                pdf.getPage(pageNum).then((page) => {
                    const viewport = page.getViewport({ scale });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    };
                    
                    page.render(renderContext).promise.then(() => {
                        canvas.toBlob(resolve, 'image/png');
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Create PDF document
 */
function createPdfDocument() {
    const { PDFDocument, rgb, degrees } = PDFLib;
    return PDFDocument.create();
}

/**
 * Add image to PDF
 */
async function addImageToPdf(pdfDoc, imageBlob, pageSize, options = {}) {
    const imgData = await imageBlob.arrayBuffer();
    const imgType = imageBlob.type === 'image/png' ? 'png' : 'jpeg';
    let img;
    
    if (imgType === 'png') {
        img = await pdfDoc.embedPng(imgData);
    } else {
        img = await pdfDoc.embedJpg(imgData);
    }
    
    const { width, height } = pageSize;
    let scale = options.scale || 'fit';
    let imgWidth, imgHeight;
    
    if (scale === 'fit') {
        const maxWidth = width - (options.margin || 0) * 2;
        const maxHeight = height - (options.margin || 0) * 2;
        const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        imgWidth = img.width * ratio;
        imgHeight = img.height * ratio;
    } else if (scale === 'fill') {
        imgWidth = width - (options.margin || 0) * 2;
        imgHeight = height - (options.margin || 0) * 2;
    } else {
        imgWidth = img.width;
        imgHeight = img.height;
    }
    
    const x = (width - imgWidth) / 2;
    const y = (height - imgHeight) / 2;
    
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(img, { x, y, width: imgWidth, height: imgHeight });
    
    return pdfDoc;
}
