function reccomendPreset() {
    const wInput = document.getElementById('res-width').value;
    const hInput = document.getElementById('res-height').value;
    const rows = document.querySelectorAll('#upscale-matrix tr[data-upscaler]');

    if (wInput === '' || hInput === '') {
        rows.forEach(row => {
            const cells = row.querySelectorAll('td[data-percent]');
            cells.forEach(cell => {
                cell.style.backgroundColor = '';
            });
        });
        return;
    }

    // Replace letters in case the user inputs the p at the end
    const w = parseInt(wInput.replace(/[^0-9]/g, ""), 10) || 0;
    const h = parseInt(hInput.replace(/[^0-9]/g, ""), 10) || 0;
    const totalPixels = w * h;

    rows.forEach(row => {
        const upscalerName = row.getAttribute('data-upscaler');
        const cells = row.querySelectorAll('td[data-percent]');

        cells.forEach(cell => {
            const pct = parseInt(cell.getAttribute('data-percent'));
            cell.style.backgroundColor = '';
            if (pct === 0) return;

            // Colors
            const COLORS = {
                green: 'rgba(40, 167, 69, 0.4)',
                orange: 'rgba(255, 193, 7, 0.4)',
                red: 'rgba(220, 53, 69, 0.4)'
            };

            // Quality = 66
            // Balanced = 58
            // Performance = 50
            // Ultra Perf. = 38

            if (upscalerName === 'DLSS 4') {
                if (totalPixels <= 2073600) { // 1080p and below
                    if (pct >= 66) cell.style.backgroundColor = COLORS.green; // Between Native and Quality
                    else if (pct >= 58) cell.style.backgroundColor = COLORS.orange; // Between Quality and Balanced
                    else cell.style.backgroundColor = COLORS.red; // Below Balanced

                } else if (totalPixels <= 3686400) { // Between 1080p and 1440p
                    if (pct >= 66) cell.style.backgroundColor = COLORS.green; // Between Native and Quality
                    else if (pct >= 58) cell.style.backgroundColor = COLORS.green; // Between Quality and Balanced
                    else if (pct >= 50) cell.style.backgroundColor = COLORS.orange; // Between Balanced and Performance
                    else cell.style.backgroundColor = COLORS.red; // Below Performance

                } else { // Above 1440p
                    if (pct >= 50) cell.style.backgroundColor = COLORS.green; // Performance and above
                    else cell.style.backgroundColor = COLORS.orange; // Ultra Perf. and below
                }
            }

            else if (upscalerName === 'FSR 4') {
                if (totalPixels <= 2073600) { // 1080p and below
                    if (pct >= 66) cell.style.backgroundColor = COLORS.green; // Between Native and Quality
                    else if (pct >= 58) cell.style.backgroundColor = COLORS.orange; // Between Quality and Balanced
                    else cell.style.backgroundColor = COLORS.red; // Below Balanced

                } else if (totalPixels <= 3686400) { // Between 1080p and 1440p
                    if (pct >= 66) cell.style.backgroundColor = COLORS.green; // Between Native and Quality
                    else if (pct >= 58) cell.style.backgroundColor = COLORS.green; // Between Quality and Balanced
                    else if (pct >= 50) cell.style.backgroundColor = COLORS.orange; // Between Balanced and Performance
                    else cell.style.backgroundColor = COLORS.red; // Below Performance

                } else { // Above 1440p
                    if (pct >= 50) cell.style.backgroundColor = COLORS.green; // Performance and above
                    else cell.style.backgroundColor = COLORS.orange; // Ultra Perf. and below
                }
            }

            else if (upscalerName === 'FSR 3') {
                if (totalPixels <= 2073600) { // 1080p and below
                    if (pct === 100) cell.style.backgroundColor = COLORS.green; // Native
                    else if (pct >= 66) cell.style.backgroundColor = COLORS.orange; // Between Native and Quality
                    else cell.style.backgroundColor = COLORS.red; // Below Quality

                } else if (totalPixels <= 3686400) { // Between 1080p and 1440p
                    if (pct >= 66) cell.style.backgroundColor = COLORS.green; // Between Native and Quality
                    else if (pct >= 58) cell.style.backgroundColor = COLORS.orange; // Between Quality and Balanced
                    else cell.style.backgroundColor = COLORS.red; // Below Balanced

                } else { // Above 1440p
                    if (pct >= 58) cell.style.backgroundColor = COLORS.green; // Balanced and above
                    else if (pct >= 50) cell.style.backgroundColor = COLORS.orange; // Performance and above
                    else cell.style.backgroundColor = COLORS.red; // Ultra Perf. and below
                }
            }

            else if (upscalerName.includes('XeSS')) {
                if (totalPixels <= 2073600) { // 1080p and below
                    if (pct === 100) cell.style.backgroundColor = COLORS.green; // Native
                    else if (pct >= 66) cell.style.backgroundColor = COLORS.orange; // Between Native and Quality
                    else cell.style.backgroundColor = COLORS.red; // Below Quality

                } else if (totalPixels <= 3686400) { // Between 1080p and 1440p
                    if (pct >= 66) cell.style.backgroundColor = COLORS.green; // Between Native and Quality
                    else if (pct >= 58) cell.style.backgroundColor = COLORS.orange; // Between Quality and Balanced
                    else cell.style.backgroundColor = COLORS.red; // Below Balanced

                } else { // Above 1440p
                    if (pct >= 58) cell.style.backgroundColor = COLORS.green; // Balanced and above
                    else if (pct >= 50) cell.style.backgroundColor = COLORS.orange; // Performance and above
                    else cell.style.backgroundColor = COLORS.red; // Ultra Perf. and below
                }
            }
        });
    });
}