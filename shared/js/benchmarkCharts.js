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

// Funzione globale accessibile dal click HTML
function togglePopup(event) {
    event.stopPropagation();
    const popup = document.getElementById("desktopPopup");
    popup.classList.toggle("show");
}