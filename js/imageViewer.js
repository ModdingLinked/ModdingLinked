// Image overlay

document.addEventListener('DOMContentLoaded', function () {
    createImageHandlers();
});

function createImageHandlers() {
    const imageOverlay = document.getElementById('image-overlay');
    const enlargedImage = document.getElementById('enlarged-image');
    if (!enlargedImage || !imageOverlay)
        return;

    // Use event delegation to handle both static and dynamic images
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('content-img')) {
            imageOverlay.style.display = "flex";
            enlargedImage.src = event.target.src;
        }
    });

    imageOverlay.addEventListener('click', function () {
        imageOverlay.style.display = "none";
        enlargedImage.src = '';
    });
}