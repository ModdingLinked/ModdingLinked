document.addEventListener('DOMContentLoaded', () => {
    const allGroups = document.querySelectorAll('.bm-group');

    // Highest FPS for the proportional bars to use as reference
    let globalMaxFps = 0;
    allGroups.forEach(group => {
        group.querySelectorAll('.bm-val').forEach(vSpan => {
            const val = parseFloat(vSpan.textContent.trim());
            if (!isNaN(val)) {
                vSpan.dataset.origVal = val;
                if (val > globalMaxFps) globalMaxFps = val;
            }
        });
    });

    // Proportional bars
    allGroups.forEach(group => {
        const rows = Array.from(group.querySelectorAll('.bm-row'));

        rows.forEach(row => {
            const valSpan = row.querySelector('.bm-val');
            if (valSpan) {
                const fps = parseFloat(valSpan.dataset.origVal);
                const pctWidth = globalMaxFps > 0 ? (fps / globalMaxFps) * 100 : 0;
                row.style.width = `${pctWidth.toFixed(1)}%`;
            }
        });

        // Hover
        rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                const hoveredValSpan = row.querySelector('.bm-val');
                if (!hoveredValSpan) return;

                const baseFps = parseFloat(hoveredValSpan.dataset.origVal);
                if (isNaN(baseFps) || baseFps === 0) return;

                rows.forEach(r => {
                    const vSpan = r.querySelector('.bm-val');
                    if (!vSpan) return;

                    const currentFps = parseFloat(vSpan.dataset.origVal);
                    if (isNaN(currentFps)) return;

                    const pct = (currentFps / baseFps) * 100;
                    vSpan.textContent = `${currentFps} (${pct.toFixed(1)}%)`;
                });
            });
        });

        group.addEventListener('mouseleave', () => {
            rows.forEach(r => {
                const vSpan = r.querySelector('.bm-val');
                if (vSpan && vSpan.dataset.origVal) {
                    vSpan.textContent = vSpan.dataset.origVal;
                }
            });
        });
    });

    window.addEventListener("click", function () {
        const popup = document.getElementById("desktopPopup");
        if (popup && popup.classList.contains("show")) {
            popup.classList.remove("show");
        }
    });
});

function togglePopup(event) {
    event.stopPropagation();

    // Find nearest
    const container = event.currentTarget.closest('.legend-popup-container');
    if (!container) return;

    const popup = container.querySelector('.tiny-popup');
    if (popup) {
        popup.classList.toggle('show');
    }
}

// Close when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.legend-popup-container')) {
        document.querySelectorAll('.tiny-popup.show').forEach(popup => {
            popup.classList.remove('show');
        });
    }
});