// Parses CapFrameX JSON files and generates interactive charts with gallery navigation

class BenchmarkCharts {
    constructor() {
        this.chartIdCounter = 0;
        this.galleries = new Map(); // Store gallery instances
    }

    // Read and parse a single JSON file
    async readJSONFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const json = await response.json();

            const frameData = json.Runs[0].CaptureData.MsBetweenPresents;
            const sum = frameData.reduce((acc, val) => acc + val, 0);
            const avgFPS = 1000 / (sum / frameData.length);

            return {
                Hash: json.Hash,
                AppVersion: json.Info.AppVersion,
                Id: json.Info.Id,
                Processor: json.Info.Processor,
                GameName: json.Info.GameName,
                ProcessName: json.Info.ProcessName,
                CreationDate: json.Info.CreationDate,
                Motherboard: json.Info.Motherboard,
                OS: json.Info.OS,
                SystemRam: json.Info.SystemRam,
                BaseDriverVersion: json.Info.BaseDriverVersion,
                GPUDriverVersion: json.Info.GPUDriverVersion,
                DriverPackage: json.Info.DriverPackage,
                GPU: json.Info.GPU,
                GPUCount: json.Info.GPUCount,
                GpuCoreClock: json.Info.GpuCoreClock,
                GpuMemoryClock: json.Info.GpuMemoryClock,
                Comment: json.Info.Comment || 'No comment',
                ApiInfo: json.Info.ApiInfo,
                ResizableBar: json.Info.ResizableBar,
                WinGameMode: json.Info.WinGameMode,
                HAGS: json.Info.HAGS || 'Unsupported',
                PresentationMode: json.Info.PresentationMode,
                // Seems to always return null?
                // ResolutionInfo: json.Info.ResolutionInfo,
                AvgFPS: avgFPS,
                FrametimeData: frameData
            };
        } catch (error) {
            console.error('Error reading JSON file:', filePath, error);
            throw error;
        }
    }

    calculatePercentile(array, percentile) {
        if (!Array.isArray(array) || array.length === 0) return null;
        const sorted = [...array].sort((a, b) => a - b);
        const n = sorted.length;
        const index = (n - 1) * percentile;
        if (Number.isInteger(index)) {
            return sorted[index];
        } else {
            const lower = Math.floor(index);
            const upper = Math.ceil(index);
            const weight = index - lower;
            return sorted[lower] * (1 - weight) + sorted[upper] * weight;
        }
    }

    // Create a single chart from benchmark data
    createChart(data, title = null) {
        if (!data || data.length === 0) {
            return null;
        }

        // Precompute all FPS values for each data item
        data.forEach(dataItem => {
            dataItem.onePercentLow = 1000 / this.calculatePercentile(dataItem.FrametimeData, 1 - 0.01);
            dataItem.pointTwoPercentLow = 1000 / this.calculatePercentile(dataItem.FrametimeData, 1 - 0.002);
        });

        // Create chart container
        const chart = document.createElement('div');
        chart.className = 'benchmark-chart';

        // Chart title
        const titleElement = document.createElement('h3');
        titleElement.textContent = title || (data[0].GameName + ' Performance Comparison');
        chart.appendChild(titleElement);

        // Sort data by average FPS (descending)
        data.sort((a, b) => b.AvgFPS - a.AvgFPS);

        // Find max FPS for scaling across all data points and types
        const allFPSValues = [];
        data.forEach(dataItem => {
            allFPSValues.push(dataItem.AvgFPS, dataItem.onePercentLow, dataItem.pointTwoPercentLow);
        });
        const maxFPS = Math.max(...allFPSValues);

        // Create legend
        const legend = document.createElement('div');
        legend.className = 'benchmark-legend';
        legend.innerHTML = `
            <div class="benchmark-legend-item">
                <div class="benchmark-legend-color benchmark-bar-avg"></div>
                <span>Average FPS</span>
            </div>
            <div class="benchmark-legend-item">
                <div class="benchmark-legend-color benchmark-bar-1percent"></div>
                <span>1% Low</span>
            </div>
            <div class="benchmark-legend-item">
                <div class="benchmark-legend-color benchmark-bar-02percent"></div>
                <span>0.2% Low</span>
            </div>
        `;
        chart.appendChild(legend);

        // Create bars for each data item
        data.forEach((dataItem) => {
            const testContainer = document.createElement('div');
            testContainer.className = 'benchmark-test';

            // Test name container with tooltip
            const testNameContainer = document.createElement('div');
            testNameContainer.className = 'benchmark-test-name-container';

            // Test name
            const testName = document.createElement('div');
            testName.className = 'benchmark-test-name';
            testName.textContent = dataItem.Comment;

            // System info tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'benchmark-tooltip card';
            tooltip.innerHTML = `
                <p><strong>Test Date:</strong> ${new Date(dataItem.CreationDate).toLocaleDateString()}</p>
                <hr>
                <p><strong>Hardware:</strong></p>
                <ul>
                    <li>CPU: ${dataItem.Processor}</li>
                    <li>Motherboard: ${dataItem.Motherboard}</li>
                    <li>GPU: ${dataItem.GPU}</li>
                    <li>RAM: ${dataItem.SystemRam}</li>
                </ul>
                <hr>
                <p><strong>Software:</strong></p>
                <ul>
                    <li>OS: ${dataItem.OS}</li>
                    <li>GPU Driver: ${dataItem.GPUDriverVersion}</li>
                    <li>API: ${dataItem.ApiInfo}</li>
                </ul>
                <hr>
                <p><strong>Settings:</strong></p>
                <ul>
                    <li>Resizable BAR: ${dataItem.ResizableBar}</li>
                    <li>Game Mode: ${dataItem.WinGameMode}</li>
                    <li>HAGS: ${dataItem.HAGS}</li>
                    <li>Presentation Mode: ${dataItem.PresentationMode}</li>
                </ul>
            `;

            testNameContainer.appendChild(testName);
            testNameContainer.appendChild(tooltip);
            testContainer.appendChild(testNameContainer);

            // Bars container
            const barsContainer = document.createElement('div');
            barsContainer.className = 'benchmark-bars';

            // Use precomputed percentiles
            const bars = [
                {
                    label: 'Avg',
                    value: dataItem.AvgFPS,
                    className: 'benchmark-bar-avg',
                    maxValue: maxFPS
                },
                {
                    label: '1%',
                    value: dataItem.onePercentLow,
                    className: 'benchmark-bar-1percent',
                    maxValue: maxFPS
                },
                {
                    label: '0.2%',
                    value: dataItem.pointTwoPercentLow,
                    className: 'benchmark-bar-02percent',
                    maxValue: maxFPS
                }
            ];

            // Create each bar
            bars.forEach(bar => {
                const barRow = document.createElement('div');
                barRow.className = 'benchmark-bar-row';

                const barLabel = document.createElement('span');
                barLabel.className = 'benchmark-bar-label';
                barLabel.textContent = bar.label;

                const barContainer = document.createElement('div');
                barContainer.className = 'benchmark-bar-container';

                const barElement = document.createElement('div');
                const barWidth = (bar.value / bar.maxValue) * 100; // Use percentage for full width
                barElement.className = `benchmark-bar ${bar.className}`;
                barElement.style.width = `${barWidth}%`;
                barElement.textContent = bar.value.toFixed(1);
                barElement.title = `${bar.label}: ${bar.value.toFixed(2)} FPS`;

                // Store original data for hover calculations
                barElement.dataset.originalValue = bar.value.toFixed(1);
                barElement.dataset.fpsValue = bar.value;

                // Add hover functionality for relative percentages
                this.addHoverFunctionality(barElement, testContainer);

                barContainer.appendChild(barElement);
                barRow.appendChild(barLabel);
                barRow.appendChild(barContainer);
                barsContainer.appendChild(barRow);
            });

            testContainer.appendChild(barsContainer);
            chart.appendChild(testContainer);
        });

        return chart;
    }

    // Add hover functionality for relative percentage display across all charts
    addHoverFunctionality(barElement, testContainer) {
        barElement.addEventListener('mouseenter', (e) => {
            const hoveredValue = parseFloat(e.target.dataset.fpsValue);
            // Find the chart container that contains this bar
            const chartContainer = testContainer.closest('.benchmark-chart');
            // Find all charts in the current gallery (all visible charts)
            const galleryContainer = chartContainer.closest('.benchmark-gallery, .benchmark-current-chart');
            const allBars = galleryContainer.querySelectorAll('.benchmark-bar');

            // Set reference bar and update others with percentages
            allBars.forEach(bar => {
                const barValue = parseFloat(bar.dataset.fpsValue);
                const percentage = ((barValue / hoveredValue) * 100).toFixed(0);

                if (bar === e.target) {
                    bar.textContent = '100%';
                    bar.classList.add('benchmark-reference');
                } else {
                    bar.textContent = `${percentage}%`;
                    bar.classList.add('benchmark-dimmed');
                }
            });
        });

        barElement.addEventListener('mouseleave', () => {
            // Find the chart container that contains this bar
            const chartContainer = testContainer.closest('.benchmark-chart');
            // Find all charts in the current gallery (all visible charts)
            const galleryContainer = chartContainer.closest('.benchmark-gallery, .benchmark-current-chart');
            const allBars = galleryContainer.querySelectorAll('.benchmark-bar');

            // Restore original values
            allBars.forEach(bar => {
                bar.textContent = bar.dataset.originalValue;
                bar.classList.remove('benchmark-reference', 'benchmark-dimmed');
            });
        });
    }

    createGallery(slides, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        if (slides.length === 0) {
            container.innerHTML = '<div class="benchmark-error"><h4>No Data</h4><p>No valid charts to display.</p></div>';
            return;
        }

        if (slides.length === 1) {
            // Single chart
            const gallery = document.createElement('div');
            gallery.className = 'benchmark-gallery single-chart';
            gallery.style.width = '100%';

            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'benchmark-gallery-container';
            galleryContainer.style.width = '100%';

            const wrapper = document.createElement('div');
            wrapper.className = 'benchmark-chart-wrapper';
            wrapper.style.width = '100%';

            // Full width for the chart
            slides[0].style.width = '100%';
            slides[0].style.maxWidth = '100%';

            wrapper.appendChild(slides[0]);
            galleryContainer.appendChild(wrapper);
            gallery.appendChild(galleryContainer);
            container.appendChild(gallery);
        } else {
            // Multiple charts
            const gallery = document.createElement('div');
            gallery.className = 'benchmark-gallery multi-chart';

            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'benchmark-gallery-container';

            // Previous button
            const prevBtn = document.createElement('div');
            prevBtn.className = 'benchmark-gallery-nav benchmark-gallery-prev';
            prevBtn.textContent = '❮';

            // Chart wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'benchmark-chart-wrapper';

            // Current chart container
            const currentChartContainer = document.createElement('div');
            currentChartContainer.className = 'benchmark-current-chart';
            currentChartContainer.appendChild(slides[0]);

            wrapper.appendChild(currentChartContainer);

            // Counter
            const counter = document.createElement('div');
            counter.className = 'benchmark-gallery-counter';
            counter.textContent = `1 / ${slides.length}`;
            wrapper.appendChild(counter);

            // Next button
            const nextBtn = document.createElement('div');
            nextBtn.className = 'benchmark-gallery-nav benchmark-gallery-next';
            nextBtn.textContent = '❯';

            galleryContainer.appendChild(prevBtn);
            galleryContainer.appendChild(wrapper);
            galleryContainer.appendChild(nextBtn);
            gallery.appendChild(galleryContainer);
            container.appendChild(gallery);

            // Store chart data and set up navigation
            gallery.dataset.currentIndex = 0;
            gallery.chartSlides = slides;

            const galleryState = {
                currentSlide: 0,
                totalSlides: slides.length,
                slides: slides,
                prevButton: prevBtn,
                nextButton: nextBtn,
                counter: counter,
                currentChartContainer: currentChartContainer,
                gallery: gallery
            };

            this.galleries.set(containerId, galleryState);

            prevBtn.addEventListener('click', () => this.navigateChartGallery(containerId, -1));
            nextBtn.addEventListener('click', () => this.navigateChartGallery(containerId, 1));
        }
    }

    // Navigate chart gallery
    navigateChartGallery(containerId, direction) {
        const galleryState = this.galleries.get(containerId);
        if (!galleryState) return;

        const currentIndex = galleryState.currentSlide;
        const newIndex = (currentIndex + direction + galleryState.totalSlides) % galleryState.totalSlides;

        galleryState.currentSlide = newIndex;
        this.updateChartGalleryDisplay(containerId);
    }

    // Update chart gallery display
    updateChartGalleryDisplay(containerId) {
        const galleryState = this.galleries.get(containerId);
        if (!galleryState) return;

        const { currentSlide, slides, counter, currentChartContainer } = galleryState;

        // Clear current chart and add new one
        currentChartContainer.innerHTML = '';
        currentChartContainer.appendChild(slides[currentSlide]);

        // Update counter
        if (counter) {
            counter.textContent = `${currentSlide + 1} / ${slides.length}`;
        }
    }

    // Gallery navigation
    previousSlide(containerId) {
        this.navigateChartGallery(containerId, -1);
    }
    nextSlide(containerId) {
        this.navigateChartGallery(containerId, 1);
    }

    async loadJSONFilesFromFolder(folderPath) {
        try {
            const response = await fetch(folderPath);
            if (response.ok) {
                const html = await response.text();
                const doc = new DOMParser().parseFromString(html, 'text/html');
                return Array.from(doc.querySelectorAll('a'))
                    .map(link => link.getAttribute('href'))
                    .filter(href => href && href.toLowerCase().endsWith('.json'))
                    .map(href => href.split('/').pop().toLowerCase());
            }
        } catch {
            // Fallback to REST API below
        }
        try {
            const [repoOwner, repoName] = ['ModdingLinked', 'ModdingLinked'];
            const apiPath = folderPath.replace(/^\.\//, '').replace(/\/$/, '');
            const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${apiPath}`;
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Could not access folder: ${folderPath} (GitHub API)`);
            const files = await response.json();
            return files
                .filter(item => item.type === 'file' && item.name.toLowerCase().endsWith('.json'))
                .map(item => item.name);
        } catch (error) {
            console.error(`Error listing JSON files in folder: ${folderPath}`, error);
            throw error;
        }
    }

    async loadBenchmarkFromElement(element) {
        const containerId = element.getAttribute('data-chart-container');
        const baseFolder = element.getAttribute('data-chart-folder');
        const chartFolders = element.getAttribute('data-chart-files');
        const chartTitles = element.getAttribute('data-chart-titles');

        if (!containerId || !baseFolder || !chartFolders) {
            console.error('Missing required data attributes for benchmark chart');
            return;
        }

        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Container not found:', containerId);
            return;
        }

        try {
            container.innerHTML = '<div class="benchmark-loading">Loading benchmark data...</div>';

            // Parse folders
            const folderIdentifiers = chartFolders.split('|').map(folder => folder.trim());
            const explicitTitles = chartTitles ? chartTitles.split('|').map(title => title.trim()) : [];

            const charts = [];

            // Process folders
            for (let i = 0; i < folderIdentifiers.length; i++) {
                const scenarioName = folderIdentifiers[i];
                // Use explicit title if provided, otherwise use the folder/scenario name
                const chartTitle = explicitTitles[i] || scenarioName;

                try {
                    const folderPath = `${baseFolder}/${scenarioName}/`;
                    const jsonFiles = await this.loadJSONFilesFromFolder(folderPath);

                    if (jsonFiles.length > 0) {
                        const promises = jsonFiles.map(file => this.readJSONFile(`${folderPath}${file}`));
                        const benchmarkData = await Promise.all(promises);

                        if (benchmarkData.length > 0) {
                            const chart = this.createChart(benchmarkData, chartTitle);
                            if (chart) {
                                charts.push(chart);
                            }
                        }
                    } else {
                        console.warn(`No JSON files found in folder: ${folderPath}`);
                    }
                } catch (error) {
                    console.error(`Error loading chart ${i + 1}:`, error);
                }
            }

            // Create gallery with all loaded charts
            this.createGallery(charts, containerId);

        } catch (error) {
            console.error('Error loading benchmark data:', error);
            container.innerHTML = `
        <div class="benchmark-error">
            <h4>Error Loading Benchmark Data</h4>
            <p>Could not load benchmark files.</p>
            <details>
                <summary>Error Details</summary>
                <pre>${error.message}</pre>
            </details>
        </div>
    `;
        }
    }

    generateFrametimeData(avgFPS, sampleCount = 1000) {
        const baseFrametime = 1000 / avgFPS;
        const frametimes = [];

        for (let i = 0; i < sampleCount; i++) {
            const variance = (Math.random() - 0.5) * 2 * (baseFrametime * 0.3);
            const frametime = Math.max(1, baseFrametime + variance);
            frametimes.push(frametime);
        }

        return frametimes;
    }

    initializeAllCharts() {
        const chartElements = document.querySelectorAll('[data-chart-container]');
        chartElements.forEach(element => {
            this.loadBenchmarkFromElement(element);
        });
    }
}

// VRAM diff logic for tables
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

// Init all charts on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    window.benchmarkCharts = new BenchmarkCharts();
    window.benchmarkCharts.initializeAllCharts();
});