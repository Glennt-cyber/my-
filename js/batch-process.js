// Batch Processing Module

class BatchProcessor {
    constructor() {
        this.images = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const uploadArea = document.getElementById('batchUploadArea');
        const batchInput = document.getElementById('batchInput');
        const batchTypeRadios = document.querySelectorAll('input[name="batchType"]');
        const processBtn = document.getElementById('batchProcessBtn');
        const clearBtn = document.getElementById('clearBatchBtn');

        // Upload area click
        uploadArea.addEventListener('click', () => batchInput.click());

        // File input change
        batchInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));

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

        // Batch type change
        batchTypeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => this.updateBatchOptions(e.target.value));
        });

        // Process button
        processBtn.addEventListener('click', () => this.processBatch());

        // Clear button
        clearBtn.addEventListener('click', () => this.clearImages());
    }

    async handleFileSelect(files) {
        const validFiles = Array.from(files).filter(file => {
            if (!isValidImageFile(file)) {
                showToast(`${file.name} is not a valid image format`, 'error');
                return false;
            }
            return true;
        });

        if (validFiles.length === 0) return;

        const batchOptionsDiv = document.querySelector('.batch-options');
        batchOptionsDiv.style.display = 'block';

        validFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.images.push({
                    id: generateId(),
                    file: file,
                    data: e.target.result,
                    name: file.name
                });
                this.renderBatchFileList();
            };
            reader.readAsDataURL(file);
        });

        showToast(`Added ${validFiles.length} image(s) for batch processing`, 'success');
    }

    renderBatchFileList() {
        const container = document.getElementById('batchFileList');
        container.innerHTML = '';

        this.images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'image-item';
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
    }

    removeImage(id) {
        this.images = this.images.filter(img => img.id !== id);
        this.renderBatchFileList();
    }

    updateBatchOptions(type) {
        const formatOptions = document.getElementById('batchFormatOptions');

        if (type === 'convert-format') {
            formatOptions.style.display = 'block';
        } else {
            formatOptions.style.display = 'none';
        }
    }

    async processBatch() {
        if (this.images.length === 0) {
            showToast('Please add images for batch processing', 'warning');
            return;
        }

        const selectedType = document.querySelector('input[name="batchType"]:checked');
        if (!selectedType) {
            showToast('Please select a processing type', 'warning');
            return;
        }

        const batchType = selectedType.value;

        switch (batchType) {
            case 'convert-to-pdf':
                await this.batchConvertToPdf();
                break;
            case 'compress':
                await this.batchCompress();
                break;
            case 'convert-format':
                await this.batchConvertFormat();
                break;
        }
    }

    async batchConvertToPdf() {
        showProgress(0, 'Creating PDF from images...');

        try {
            const { PDFDocument } = PDFLib;
            const pdfDoc = await PDFDocument.create();

            for (let i = 0; i < this.images.length; i++) {
                showProgress((i / this.images.length) * 100, `Processing image ${i + 1}/${this.images.length}...`);

                const image = this.images[i];
                const canvas = await fileToCanvas(image.file);

                const blob = await canvasToBlob(canvas, 'image/jpeg', 0.85);
                const imgData = await blob.arrayBuffer();
                const pdfImage = await pdfDoc.embedJpg(imgData);

                // A4 size in points
                const pageWidth = 595; // 210mm
                const pageHeight = 842; // 297mm

                const imgWidth = canvas.width;
                const imgHeight = canvas.height;
                const ratio = Math.min((pageWidth - 40) / imgWidth, (pageHeight - 40) / imgHeight);

                const scaledWidth = imgWidth * ratio;
                const scaledHeight = imgHeight * ratio;
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

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });

            const filename = `batch-converted-${Date.now()}.pdf`;
            showProgress(100, 'Downloading...');
            downloadFile(blob, filename);

            setTimeout(() => {
                hideProgress();
                showToast(`PDF created successfully from ${this.images.length} images`, 'success');
            }, 500);

        } catch (error) {
            console.error('Error in batch PDF conversion:', error);
            hideProgress();
            showToast('Error creating PDF: ' + error.message, 'error');
        }
    }

    async batchCompress() {
        showProgress(0, 'Compressing images...');

        try {
            const quality = 0.8;
            const maxWidth = 2000;
            const maxHeight = 2000;
            const compressed = [];

            for (let i = 0; i < this.images.length; i++) {
                showProgress((i / this.images.length) * 100, `Compressing ${i + 1}/${this.images.length}...`);

                const image = this.images[i];
                const canvas = await fileToCanvas(image.file);

                // Resize if needed
                if (canvas.width > maxWidth || canvas.height > maxHeight) {
                    const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
                    const newWidth = Math.round(canvas.width * ratio);
                    const newHeight = Math.round(canvas.height * ratio);

                    const scaledCanvas = resizeImageCanvas(canvas, newWidth, newHeight, false);
                    const blob = await canvasToBlob(scaledCanvas, 'image/jpeg', quality);
                    compressed.push({ name: removeFileExtension(image.name) + '-compressed.jpg', blob });
                } else {
                    const blob = await canvasToBlob(canvas, 'image/jpeg', quality);
                    compressed.push({ name: removeFileExtension(image.name) + '-compressed.jpg', blob });
                }
            }

            if (compressed.length > 1) {
                showProgress(95, 'Creating ZIP file...');
                await downloadFilesAsZip(compressed, 'batch-compressed-images.zip');
            } else {
                downloadFile(compressed[0].blob, compressed[0].name);
            }

            showProgress(100, 'Complete!');
            setTimeout(() => {
                hideProgress();
                showToast(`Compressed ${compressed.length} image(s)`, 'success');
            }, 500);

        } catch (error) {
            console.error('Error in batch compression:', error);
            hideProgress();
            showToast('Error compressing: ' + error.message, 'error');
        }
    }

    async batchConvertFormat() {
        showProgress(0, 'Converting images...');

        try {
            const targetFormat = document.getElementById('batchFormat').value;
            const mimeType = targetFormat === 'jpg' ? 'image/jpeg' : `image/${targetFormat}`;
            const converted = [];

            for (let i = 0; i < this.images.length; i++) {
                showProgress((i / this.images.length) * 100, `Converting ${i + 1}/${this.images.length}...`);

                const image = this.images[i];
                const canvas = await fileToCanvas(image.file);

                const quality = targetFormat === 'jpg' ? 0.9 : 0.95;
                const blob = await canvasToBlob(canvas, mimeType, quality);

                const filename = removeFileExtension(image.name) + '.' + targetFormat;
                converted.push({ name: filename, blob });
            }

            if (converted.length > 1) {
                showProgress(95, 'Creating ZIP file...');
                await downloadFilesAsZip(converted, `batch-converted-${targetFormat}.zip`);
            } else {
                downloadFile(converted[0].blob, converted[0].name);
            }

            showProgress(100, 'Complete!');
            setTimeout(() => {
                hideProgress();
                showToast(`Converted ${converted.length} image(s) to ${targetFormat.toUpperCase()}`, 'success');
            }, 500);

        } catch (error) {
            console.error('Error in batch format conversion:', error);
            hideProgress();
            showToast('Error converting format: ' + error.message, 'error');
        }
    }

    clearImages() {
        if (this.images.length === 0) return;

        const confirmed = confirm('Clear all images?');
        if (confirmed) {
            this.images = [];
            document.getElementById('batchInput').value = '';
            document.getElementById('batchFileList').innerHTML = '';
            document.querySelectorAll('input[name="batchType"]').forEach(r => r.checked = false);
            showToast('All images cleared', 'success');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.batchProcessor = new BatchProcessor();
});
