document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("table.vram-table").forEach(function (table) {
        const ths = table.querySelectorAll("thead th");
        let vanillaIdx = -1;
        ths.forEach((th, idx) => {
            if (th.dataset && th.dataset.vram && th.textContent.trim().toLowerCase().includes("vanilla")) {
                vanillaIdx = idx;
            }
        });
        if (vanillaIdx === -1) return;

        table.querySelectorAll("tbody tr").forEach(function (tr) {
            const tds = tr.querySelectorAll("td");
            if (tds.length <= vanillaIdx) return;
            const vanillaCell = tds[vanillaIdx];
            const vanillaVram = parseFloat(vanillaCell.dataset.vram);
            tds.forEach((td, idx) => {
                if (idx === vanillaIdx) return;
                if (!td.dataset.vram) return;
                const vram = parseFloat(td.dataset.vram);
                const diffMb = Math.round((vram - vanillaVram) * 1000);
                if (diffMb === 0) return;
                const span = document.createElement("span");
                span.className = "vram-diff " + (diffMb < 0 ? "vram-green" : "vram-red");
                span.textContent = `(${diffMb >= 0 ? "+" : ""}${diffMb}MB)`;
                td.appendChild(span);
            });
        });
    });
});