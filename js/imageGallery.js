document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.image-gallery');
    galleries.forEach(initializeGallery);
});

function initializeGallery(gallery) {
    const images = Array.from(gallery.querySelectorAll('img'));
    if (!images.length) return;

    // Store original images data
    const imageData = images.map(img => ({
        src: img.src,
        alt: img.alt || '',
        classes: img.className
    }));

    // Clear gallery and create new structure
    gallery.innerHTML = '';

    if (imageData.length === 1) {
        // Single image - simple layout
        gallery.classList.add('single-image');
        const container = document.createElement('div');
        container.className = 'gallery-container';

        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-image-wrapper';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        const img = document.createElement('img');
        img.src = imageData[0].src;
        img.alt = imageData[0].alt;
        img.className = imageData[0].classes || 'content-img';

        const overlay = document.createElement('div');
        overlay.className = 'resize-overlay expand';

        imageContainer.appendChild(img);
        imageContainer.appendChild(overlay);
        wrapper.appendChild(imageContainer);
        container.appendChild(wrapper);
        gallery.appendChild(container);

        // Ensure click handler works for dynamically created images
        setupImageClickHandler(img);
    } else {
        // Multiple images - full gallery
        gallery.classList.add('multi-image');

        const container = document.createElement('div');
        container.className = 'gallery-container';

        // Previous button
        const prevBtn = document.createElement('div');
        prevBtn.className = 'gallery-nav gallery-prev';
        prevBtn.textContent = '❮';

        // Image wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-image-wrapper';

        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        const currentImg = document.createElement('img');
        currentImg.className = 'gallery-current-image ' + (imageData[0].classes || 'content-img');
        currentImg.src = imageData[0].src;
        currentImg.alt = imageData[0].alt;

        const overlay = document.createElement('div');
        overlay.className = 'resize-overlay expand';

        imageContainer.appendChild(currentImg);
        imageContainer.appendChild(overlay);
        wrapper.appendChild(imageContainer);

        // Counter
        const counter = document.createElement('div');
        counter.className = 'gallery-counter';
        counter.textContent = `1 / ${imageData.length}`;
        wrapper.appendChild(counter);

        // Next button
        const nextBtn = document.createElement('div');
        nextBtn.className = 'gallery-nav gallery-next';
        nextBtn.textContent = '❯';

        container.appendChild(prevBtn);
        container.appendChild(wrapper);
        container.appendChild(nextBtn);
        gallery.appendChild(container);

        // Store image data and set up navigation
        gallery.dataset.currentIndex = 0;
        gallery.imageData = imageData;

        prevBtn.addEventListener('click', () => navigateGallery(gallery, -1));
        nextBtn.addEventListener('click', () => navigateGallery(gallery, 1));

        // Ensure click handler works for dynamically created images
        setupImageClickHandler(currentImg);
    }
}

function setupImageClickHandler(img) {
    // This ensures the image viewer works with dynamically created images
    // The event delegation in imageViewer.js will handle the actual click
}

function navigateGallery(gallery, direction) {
    const currentIndex = parseInt(gallery.dataset.currentIndex || 0);
    const newIndex = (currentIndex + direction + gallery.imageData.length) % gallery.imageData.length;

    gallery.dataset.currentIndex = newIndex;
    updateGalleryDisplay(gallery);
}

function updateGalleryDisplay(gallery) {
    const currentImage = gallery.querySelector('.gallery-current-image');
    const counter = gallery.querySelector('.gallery-counter');
    const currentIndex = parseInt(gallery.dataset.currentIndex || 0);
    const imageData = gallery.imageData[currentIndex];

    if (currentImage && imageData) {
        currentImage.src = imageData.src;
        currentImage.alt = imageData.alt;
    }

    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${gallery.imageData.length}`;
    }
}
