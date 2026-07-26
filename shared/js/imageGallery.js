document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('showcase-gallery');
    if (!gallery) return;

    initNumberedGallery(gallery);
});

function initNumberedGallery(gallery) {
    const totalImages = parseInt(gallery.dataset.totalImages, 10) || 121;
    const basePath = gallery.dataset.imagePath || './img/Showcase/ScreenShot';

    const displayImg = gallery.querySelector('.gallery-display');
    const labelSpan = gallery.querySelector('.gallery-label');
    const prevBtn = gallery.querySelector('.gallery-prev');
    const nextBtn = gallery.querySelector('.gallery-next');

    let currentIndex = 1;

    function updateGallery() {
        displayImg.src = `${basePath}${currentIndex}.webp`;
        displayImg.alt = `Showcase screenshot ${currentIndex}`;

        labelSpan.textContent = `${currentIndex} / ${totalImages}`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex === 1 ? totalImages : currentIndex - 1;
        updateGallery();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex === totalImages ? 1 : currentIndex + 1;
        updateGallery();
    });

    updateGallery();
}