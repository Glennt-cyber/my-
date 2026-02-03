// Image Compression Module

class ImageCompressor {
    constructor() {
        this.images = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const uploadArea = document.getElementById('compressUploadArea');
        const compressInput = document.getElementById('compressInput');
        const compressQuality = document.getElementById('compressQuality');
        const qualityValue = document.getElementById('qualityValue');
        const compressBtn = document.getElementById('compressBtn');
        const clearBtn = document.getElementById('clearCompressBtn');

        // Upload area click
        uploadArea.addEventListener('click', () => compressInput.click());

        // File input change
        compressInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files));

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

        // Quality slider
        compressQuality.addEventListener('input', (e) => {
            qualityValue.textContent = e.target.value + '%';
        });

        // Compress button
        compressBtn.addEventListener('click', () => this.compressImages());

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

        const compressOptionsDiv = document.querySelector('.compress-options');
        compressOptionsDiv.style.display = 'block';

        for (const file of validFiles) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const id = generateId();
                const img = new Image();
                img.onload = () => {
                    this.images.push({
                        id: id,
                        file: file,
                        data: e.target.result,
                        name: file.name,
                        originalSize: file.size,
                        width: img.width,
                        height: img.height
                    });
                    this.renderCompressPreview();
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        showToast(`Added ${validFiles.length} image(s) for compression`, 'success');
    }

    renderCompressPreview() {
        const container = document.getElementById('compressPreview');
        container.innerHTML = '';

        this.images.forEach((image) => {
            const item = document.createElement('div');
            item.className = 'compress-item';
            item.dataset.id = image.id;

            // Calculate estimated compressed size
            const quality = parseInt(document.getElementById('compressQuality').value) / 100;
            const estimatedSize = Math.round(image.originalSize * quality * 0.8); // Rough estimate

            const sizeReduction = Math.round(((image.originalSize - estimatedSize) / image.originalSize) * 100);

            item.innerHTML = `
                <img src="${image.data}" alt="${image.name}">
                <div class="compress-item-info">
                    <p><strong>${image.name}</strong></p>
                    <p>${image.width} × ${image.height} px</p>
                    <div class="size-comparison">
                        <div class="size-before">
                            <span class="size-label">Original</span>
                            <span class="size-value">${formatFileSize(image.originalSize)}</span>
                        </div>
                        <div class="size-after">
                            <span class="size-label">Estimated</span>
                            <span class="size-value">${formatFileSize(estimatedSize)}</span>
                            <p style="font-size: 0.75rem; color: var(--success-color); margin-top: 4px;">
                                -${sizeReduction}%
                            </p>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-danger" style="position: absolute; top: 5px; right: 5px; padding: 5px 10px; font-size: 0.85rem;">Remove</button>
            `;

            item.querySelector('.btn-danger').addEventListener('click', () => {
                this.removeImage(image.id);
            });

            container.appendChild(item);
        });
    }

    removeImage(id) {
        this.images = this.images.filter(img => img.id !== id);
        this.renderCompressPreview();
    }

    async compressImages() {
        if (this.images.length === 0) {
            showToast('Please add images to compress', 'warning');
            return;
        }

        const quality = parseInt(document.getElementById('compressQuality').value) / 100;
        const maxWidth = parseInt(document.getElementById('maxWidth').value) || 2000;
        const maxHeight = parseInt(document.getElementById('maxHeight').value) || 2000;
        const targetSize = parseInt(document.getElementById('targetSize').value);
        const format = document.getElementById('compressFormat').value;

        showProgress(0, 'Compressing images...');

        try {
            const mimeType = format === 'jpg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp';
            const compressed = [];

            for (let i = 0; i < this.images.length; i++) {
                showProgress((i / this.images.length) * 100, `Compressing ${i + 1}/${this.images.length}...`);

                const image = this.images[i];
                let compressedBlob = await this.compressImage(
                    image.file,
                    quality,
                    maxWidth,
                    maxHeight,
                    mimeType,
                    targetSize
                );

                const originalName = removeFileExtension(image.name);
                const filename = `${originalName}-compressed.${format}`;

                compressed.push({
                    name: filename,
                    blob: compressedBlob,
                    originalSize: image.originalSize,
                    compressedSize: compressedBlob.size
                });
            }

            // Option to download as zip or individually
            if (compressed.length > 1) {
                const shouldZip = confirm(`Download ${compressed.length} images as ZIP file?`);
                if (shouldZip) {
                    showProgress(95, 'Creating ZIP file...');
                    await downloadFilesAsZip(compressed, 'compressed-images.zip');
                } else {
                    compressed.forEach(img => downloadFile(img.blob, img.name));
                }
            } else {
                downloadFile(compressed[0].blob, compressed[0].name);
            }

            // Calculate total savings
            const totalOriginal = compressed.reduce((sum, img) => sum + img.originalSize, 0);
            const totalCompressed = compressed.reduce((sum, img) => sum + img.compressedSize, 0);
            const totalSavings = Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100);

            showProgress(100, 'Compression complete!');
            setTimeout(() => {
                hideProgress();
                showToast(
                    `Compressed ${compressed.length} image(s) | Saved ${totalSavings}% (${formatFileSize(totalOriginal - totalCompressed)})`,
                    'success'
                );
            }, 500);

        } catch (error) {
            console.error('Error compressing images:', error);
            hideProgress();
            showToast('Error compressing images: ' + error.message, 'error');
        }
    }

    async compressImage(file, quality, maxWidth, maxHeight, mimeType, targetSize) {
        let canvas = await fileToCanvas(file);

        // Resize if needed
        if (canvas.width > maxWidth || canvas.height > maxHeight) {
            const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
            const newWidth = Math.round(canvas.width * ratio);
            const newHeight = Math.round(canvas.height * ratio);

            canvas = resizeImageCanvas(canvas, newWidth, newHeight, false);
        }

        // Compress with quality
        let blob = await canvasToBlob(canvas, mimeType, quality);

        // If target size is set, adjust quality iteratively
        if (targetSize > 0 && blob.size > targetSize * 1024) {
            let currentQuality = quality;
            let attempt = 0;
            const maxAttempts = 5;

            while (blob.size > targetSize * 1024 && currentQuality > 0.1 && attempt < maxAttempts) {
                currentQuality -= 0.15;
                blob = await canvasToBlob(canvas, mimeType, Math.max(0.1, currentQuality));
                attempt++;
            }
        }

        return blob;
    }

    clearImages() {
        if (this.images.length === 0) return;

        const confirmed = confirm('Clear all images?');
        if (confirmed) {
            this.images = [];
            document.getElementById('compressInput').value = '';
            document.getElementById('compressPreview').innerHTML = '';
            showToast('All images cleared', 'success');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.imageCompressor = new ImageCompressor();
});
