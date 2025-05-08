document.addEventListener('DOMContentLoaded', function () {
    const galleries = document.querySelectorAll('.image-gallery');
    galleries.forEach(initializeGallery);
});

function initializeGallery(gallery) {
    const currentImage = gallery.querySelector('.gallery-current-image');
    const prevButton = gallery.querySelector('.gallery-prev');
    const nextButton = gallery.querySelector('.gallery-next');
    const counter = gallery.querySelector('.gallery-counter');
    const caption = gallery.querySelector('.gallery-caption');
    const galleryImages = Array.from(gallery.querySelectorAll('.gallery-image'));

    if (!galleryImages.length || !currentImage) return;

    gallery.dataset.currentIndex = 0;

    updateGalleryDisplay(gallery);

    if (prevButton) {
        prevButton.addEventListener('click', () => navigateGallery(gallery, -1));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => navigateGallery(gallery, 1));
    }
}

function navigateGallery(gallery, direction) {
    const galleryImages = Array.from(gallery.querySelectorAll('.gallery-image'));
    const currentIndex = parseInt(gallery.dataset.currentIndex || 0);
    const newIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;

    gallery.dataset.currentIndex = newIndex;
    updateGalleryDisplay(gallery);
}

function updateGalleryDisplay(gallery) {
    const currentImage = gallery.querySelector('.gallery-current-image');
    const counter = gallery.querySelector('.gallery-counter');
    const caption = gallery.querySelector('.gallery-caption');
    const galleryImages = Array.from(gallery.querySelectorAll('.gallery-image'));
    const currentIndex = parseInt(gallery.dataset.currentIndex || 0);

    const targetImage = galleryImages[currentIndex];
    if (currentImage && targetImage) {
        currentImage.src = targetImage.src;
        currentImage.alt = targetImage.alt;

        if (caption && targetImage.alt) {
            caption.textContent = targetImage.alt;
        }
    }

    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
    }
}
