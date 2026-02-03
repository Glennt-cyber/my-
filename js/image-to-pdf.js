// Image to PDF Conversion Module

class ImageToPdfConverter {
    constructor() {
        this.images = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const uploadArea = document.getElementById('uploadArea');
        const imageInput = document.getElementById('imageInput');
        const convertBtn = document.getElementById('convertBtn');
        const clearBtn = document.getElementById('clearBtn');
        const compressQualitySlider = document.getElementById('compressQuality');
        const compressQualityValue = document.getElementById('qualityValue');

        // Upload area click
        uploadArea.addEventListener('click', () => imageInput.click());

        // File input change
        imageInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));

        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            this.handleFileSelect(e.dataTransfer.files);
        });

        // Convert button
        convertBtn.addEventListener('click', () => this.convertToPdf());

        // Clear button
        clearBtn.addEventListener('click', () => this.clearImages());
    }

    handleFileSelect(files) {
        const validFiles = Array.from(files).filter(file => {
            if (!isValidImageFile(file)) {
                showToast(`${file.name} is not a valid image format`, 'error');
                return false;
            }
            if (file.size > 50 * 1024 * 1024) { // 50MB limit
                showToast(`${file.name} is too large (max 50MB)`, 'error');
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.images.push({
                    id: generateId(),
                    file: file,
                    data: e.target.result,
                    name: file.name
                });
                this.renderImagePreview();
                this.updateConvertButton();
            };
            reader.readAsDataURL(file);
        });

        showToast(`Added ${validFiles.length} image(s)`, 'success');
    }

    renderImagePreview() {
        const container = document.getElementById('imagePreviewContainer');
        container.innerHTML = '';

        this.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'image-item';
            item.draggable = true;
            item.dataset.id = image.id;

            item.innerHTML = `
                <img src="${image.data}" alt="${image.name}">
                <div class="image-item-controls">
                    <button type="button" class="remove-btn" title="Remove">✕</button>
                </div>
                <div class="image-item-info">${index + 1}. ${image.name}</div>
            `;

            item.querySelector('.remove-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeImage(image.id);
            });

            container.appendChild(item);
        });

        if (this.images.length > 0) {
            makeDraggable(container);
        }
    }

    removeImage(id) {
        this.images = this.images.filter(img => img.id !== id);
        this.renderImagePreview();
        this.updateConvertButton();
        showToast('Image removed', 'success');
    }

    clearImages() {
        if (this.images.length === 0) return;

        const confirmed = confirm('Are you sure you want to clear all images?');
        if (confirmed) {
            this.images = [];
            document.getElementById('imagePreviewContainer').innerHTML = '';
            document.getElementById('imageInput').value = '';
            this.updateConvertButton();
            showToast('All images cleared', 'success');
        }
    }

    updateConvertButton() {
        const btn = document.getElementById('convertBtn');
        btn.disabled = this.images.length === 0;
    }

    async convertToPdf() {
        if (this.images.length === 0) {
            showToast('Please add at least one image', 'warning');
            return;
        }

        const orientation = document.getElementById('orientation').value;
        const imageScale = document.getElementById('imageScale').value;
        const quality = document.getElementById('pdfQuality').value;
        const margin = parseFloat(document.getElementById('pdfMargin').value) || 0;
        let filename = document.getElementById('pdfFilename').value || 'converted';
        filename = sanitizeFilename(filename) + '.pdf';

        showProgress(0, 'Preparing PDF...');

        try {
            // Get images in order from DOM
            const orderedImages = [];
            document.querySelectorAll('.image-item').forEach((item) => {
                const image = this.images.find(img => img.id === item.dataset.id);
                if (image) orderedImages.push(image);
            });

            const { PDFDocument, degrees, rgb } = PDFLib;
            const pdfDoc = await PDFDocument.create();

            // Determine quality (DPI to points conversion)
            const dpiMap = { high: 300, medium: 150, low: 72 };
            const dpi = dpiMap[quality] || 150;

            for (let i = 0; i < orderedImages.length; i++) {
                showProgress((i / orderedImages.length) * 100, `Processing image ${i + 1}/${orderedImages.length}...`);

                const image = orderedImages[i];
                const canvas = await fileToCanvas(image.file);

                // Get image dimensions
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;

                // Determine page size based on orientation
                let pageWidth, pageHeight;

                if (orientation === 'auto') {
                    const ratio = imgWidth / imgHeight;
                    pageWidth = ratio > 0.7 ? 297 : 210; // A4 landscape or portrait in mm
                    pageHeight = ratio > 0.7 ? 210 : 297;
                } else if (orientation === 'landscape') {
                    pageWidth = 297; // A4 landscape
                    pageHeight = 210;
                } else {
                    pageWidth = 210; // A4 portrait
                    pageHeight = 297;
                }

                // Convert mm to points (1mm = 2.834645669 points)
                const mmToPoints = 2.834645669;
                pageWidth *= mmToPoints;
                pageHeight *= mmToPoints;
                const marginPoints = margin * mmToPoints;

                // Embed image in PDF
                const blob = await canvasToBlob(canvas, 'image/jpeg', quality === 'high' ? 0.95 : quality === 'medium' ? 0.85 : 0.75);
                const imgData = await blob.arrayBuffer();
                const pdfImage = await pdfDoc.embedJpg(imgData);

                // Calculate scaling
                const availableWidth = pageWidth - (marginPoints * 2);
                const availableHeight = pageHeight - (marginPoints * 2);

                let scaledWidth, scaledHeight;

                if (imageScale === 'fit') {
                    const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
                    scaledWidth = imgWidth * ratio;
                    scaledHeight = imgHeight * ratio;
                } else if (imageScale === 'fill') {
                    scaledWidth = availableWidth;
                    scaledHeight = availableHeight;
                } else {
                    // Original size, but constrain if too large
                    scaledWidth = Math.min(imgWidth, availableWidth);
                    scaledHeight = Math.min(imgHeight, availableHeight);
                }

                const x = (pageWidth - scaledWidth) / 2;
                const y = (pageHeight - scaledHeight) / 2;

                const page = pdfDoc.addPage([pageWidth, pageHeight]);
                page.drawImage(pdfImage, {
                    x: x,
                    y: y,
                    width: scaledWidth,
                    height: scaledHeight
                });
            }

            // Save PDF
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            showProgress(100, 'Download starting...');
            downloadFile(blob, filename);

            setTimeout(() => {
                hideProgress();
                showToast(`PDF created successfully: ${filename}`, 'success');
            }, 500);

        } catch (error) {
            console.error('Error converting to PDF:', error);
            hideProgress();
            showToast('Error converting to PDF: ' + error.message, 'error');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.imageToPdfConverter = new ImageToPdfConverter();
});
