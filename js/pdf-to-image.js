// PDF to Image Conversion Module

class PdfToImageConverter {
    constructor() {
        this.pdfFile = null;
        this.pdfPages = 0;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const uploadArea = document.getElementById('pdfUploadArea');
        const pdfInput = document.getElementById('pdfInput');
        const conversionType = document.getElementById('conversionType');
        const convertBtn = document.getElementById('convertPdfBtn');
        const clearBtn = document.getElementById('clearPdfBtn');

        // Upload area click
        uploadArea.addEventListener('click', () => pdfInput.click());

        // File input change
        pdfInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));

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

        // Conversion type change
        conversionType.addEventListener('change', (e) => {
            this.updateConversionOptions(e.target.value);
        });

        // Convert button
        convertBtn.addEventListener('click', () => this.convertToImages());

        // Clear button
        clearBtn.addEventListener('click', () => this.clearPdf());
    }

    async handleFileSelect(files) {
        const file = files[0];

        if (!isValidPdfFile(file)) {
            showToast('Please select a valid PDF file', 'error');
            return;
        }

        if (file.size > 100 * 1024 * 1024) { // 100MB limit
            showToast('PDF file is too large (max 100MB)', 'error');
            return;
        }

        this.pdfFile = file;

        try {
            // Get PDF page count
            this.pdfPages = await getPdfPageCount(file);

            // Update UI
            document.getElementById('endPage').max = this.pdfPages;
            document.getElementById('endPage').value = this.pdfPages;

            const optionsDiv = document.querySelector('.pdf-conversion-options');
            optionsDiv.style.display = 'block';

            // Render preview of first page
            await this.renderPdfPreview();

            showToast(`PDF loaded: ${this.pdfPages} page(s)`, 'success');

        } catch (error) {
            console.error('Error loading PDF:', error);
            showToast('Error loading PDF: ' + error.message, 'error');
        }
    }

    async renderPdfPreview() {
        const container = document.getElementById('pdfPages');
        container.innerHTML = '';

        try {
            for (let i = 1; i <= Math.min(this.pdfPages, 5); i++) {
                const blob = await renderPdfPageAsImage(this.pdfFile, i, 1);
                const url = URL.createObjectURL(blob);

                const item = document.createElement('div');
                item.className = 'image-item';
                item.innerHTML = `
                    <img src="${url}" alt="Page ${i}">
                    <div class="image-item-info">Page ${i} of ${this.pdfPages}</div>
                `;

                container.appendChild(item);
            }

            if (this.pdfPages > 5) {
                const item = document.createElement('div');
                item.className = 'image-item';
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.justifyContent = 'center';
                item.innerHTML = `<div class="image-item-info">... and ${this.pdfPages - 5} more pages</div>`;
                container.appendChild(item);
            }

        } catch (error) {
            console.error('Error rendering preview:', error);
        }
    }

    updateConversionOptions(type) {
        const pageRangeOptions = document.getElementById('pageRangeOptions');
        const specificPagesOptions = document.getElementById('specificPagesOptions');

        pageRangeOptions.style.display = type === 'range' ? 'flex' : 'none';
        specificPagesOptions.style.display = type === 'specific' ? 'block' : 'none';

        // Reset to flex for grouped display
        if (type === 'range') {
            pageRangeOptions.style.display = 'grid';
            pageRangeOptions.style.gridTemplateColumns = '1fr 1fr';
            pageRangeOptions.style.gap = '15px';
        }
    }

    getPageList() {
        const type = document.getElementById('conversionType').value;
        const pages = [];

        if (type === 'pages') {
            for (let i = 1; i <= this.pdfPages; i++) {
                pages.push(i);
            }
        } else if (type === 'range') {
            const start = parseInt(document.getElementById('startPage').value) || 1;
            const end = parseInt(document.getElementById('endPage').value) || this.pdfPages;

            for (let i = Math.max(1, start); i <= Math.min(this.pdfPages, end); i++) {
                pages.push(i);
            }
        } else if (type === 'specific') {
            const input = document.getElementById('specificPages').value;
            const nums = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0 && n <= this.pdfPages);
            pages.push(...nums);
        }

        return [...new Set(pages)].sort((a, b) => a - b); // Remove duplicates and sort
    }

    async convertToImages() {
        if (!this.pdfFile) {
            showToast('Please select a PDF file', 'warning');
            return;
        }

        const pages = this.getPageList();

        if (pages.length === 0) {
            showToast('No valid pages selected', 'error');
            return;
        }

        const format = document.getElementById('imageFormat').value;
        const scale = parseInt(document.getElementById('pdfScale').value) / 100 || 1;

        showProgress(0, 'Converting pages to images...');

        try {
            const images = [];

            for (let i = 0; i < pages.length; i++) {
                const pageNum = pages[i];
                showProgress((i / pages.length) * 100, `Converting page ${pageNum}/${Math.max(...pages)}...`);

                const blob = await renderPdfPageAsImage(this.pdfFile, pageNum, scale);

                // Convert to desired format if needed
                let finalBlob = blob;
                if (format !== 'png') {
                    const canvas = await this.blobToCanvas(blob);
                    const mimeType = `image/${format}`;
                    const quality = format === 'jpg' ? 0.9 : 0.95;
                    finalBlob = await canvasToBlob(canvas, mimeType, quality);
                }

                const filename = `page-${pageNum}.${format}`;
                images.push({
                    name: filename,
                    blob: finalBlob,
                    url: URL.createObjectURL(finalBlob)
                });
            }

            // Option to download as zip or individually
            if (images.length > 1) {
                const shouldZip = confirm(`Download ${images.length} images as ZIP file?`);
                if (shouldZip) {
                    showProgress(95, 'Creating ZIP file...');
                    await downloadFilesAsZip(images, `converted-pdf-images.zip`);
                } else {
                    images.forEach(img => downloadFile(img.blob, img.name));
                }
            } else {
                downloadFile(images[0].blob, images[0].name);
            }

            showProgress(100, 'Download complete!');
            setTimeout(() => {
                hideProgress();
                showToast(`${images.length} image(s) converted successfully`, 'success');
            }, 500);

        } catch (error) {
            console.error('Error converting PDF to images:', error);
            hideProgress();
            showToast('Error converting PDF: ' + error.message, 'error');
        }
    }

    async blobToCanvas(blob) {
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
            reader.readAsDataURL(blob);
        });
    }

    clearPdf() {
        this.pdfFile = null;
        this.pdfPages = 0;
        document.getElementById('pdfInput').value = '';
        document.querySelector('.pdf-conversion-options').style.display = 'none';
        document.getElementById('pdfPages').innerHTML = '';
        showToast('PDF cleared', 'success');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.pdfToImageConverter = new PdfToImageConverter();
});
