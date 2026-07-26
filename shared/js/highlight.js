document.addEventListener("DOMContentLoaded", function () {
    const annotationLinks = document.querySelectorAll('a[href^="#annotation"]');

    annotationLinks.forEach(link => {
        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.classList.remove("blink-entry");
                void targetElement.offsetWidth;
                targetElement.classList.add("blink-entry");
            }
        });
    });
});