const commonRates = [60, 120, 144, 240];

function findNearestRateWithGoodDivisor(rate) {
    const validRates = commonRates.filter(r => r <= rate);

    if (validRates.length === 0) return 60;

    return validRates.reduce((prev, curr) =>
        Math.abs(curr - rate) < Math.abs(prev - rate) ? curr : prev
    );
}

function setMode(mode) {
    const fixedBtn = document.getElementById("fixedButton");
    const vrrBtn = document.getElementById("vrrButton");

    if (mode === 'vrr') {
        vrrBtn.classList.add('active');
        fixedBtn.classList.remove('active');
    } else {
        fixedBtn.classList.add('active');
        vrrBtn.classList.remove('active');
    }

    document.getElementById("refreshMode").value = mode;
    document.getElementById("fpsResults").style.display = "none";
}

function getLargestDivisors(number) {
    const divisors = [];
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            divisors.push(i);
        }
    }
    return divisors;
}

function calculateFPS() {
    const refreshRateInput = document.getElementById("refreshRate");
    const rr = parseFloat(refreshRateInput.value);
    const mode = document.getElementById("refreshMode").value;
    const results = document.getElementById("fpsResults");


    const maxLimitAttr = refreshRateInput.getAttribute("max");
    const maxRecommendedFPS = maxLimitAttr && maxLimitAttr !== "none" ? parseFloat(maxLimitAttr) : null;

    if (!rr || rr < 60) {
        results.innerHTML = `
            <div class="card card-red">
                <p>Enter a valid refresh rate of 60Hz or higher.</p>
            </div>
        `;
        results.style.display = "block";
        return;
    }

    if (mode === 'vrr') {
        let rrVRR = Math.round(rr * (1 - rr * 0.00028));

        if (maxRecommendedFPS && rrVRR > maxRecommendedFPS) {
            rrVRR = maxRecommendedFPS;
        }

        results.innerHTML = `
            <div class="card card-basic">
                <p>Recommended FPS Limit Range: Any value from 48* to ${rrVRR}</p>
            </div>
            <div class="card card-yellow">
                <p>
                    *Your VRR range typically starts at 48 FPS, but some displays support 30 or even 1.<br>
                    Check <a href="https://www.nvidia.com/en-us/geforce/products/g-sync-monitors/specs/" target="_blank">this list</a> to know your model's VRR range. Check the product page if it's not listed there.
                </p>
            </div>
            <div class="card card-green">
                <p>
                    Choose the highest value your system can maintain consistently.
                </p>
            </div>
        `;
    } else {
        let usableDivisors = getLargestDivisors(rr).filter(d => d >= 60);

        if (maxRecommendedFPS) {
            usableDivisors = usableDivisors.filter(d => d <= maxRecommendedFPS);
        }

        let recommendations = usableDivisors.map(d =>
            d === rr ? `${(d - 0.05).toFixed(2)}` : d
        ).join(' or ');

        let warning = '';
        if (!commonRates.includes(rr) && rr > 75) {
            const better = findNearestRateWithGoodDivisor(rr);
            warning = `
                <div class="card card-red">
                    <p>
                        Your refresh rate (${rr}Hz) has divisors that make it suited for VRR more than fixed refresh.<br>
                        Look into enabling VRR if your display supports it. If not, consider switching to <b>${better}Hz</b> instead if you can't hold performance close to the suggested value - you can do this in the <b>Nvidia Control Panel</b> or <b>Adrenalin</b> settings.
                    </p>
                </div>
            `;
        }

        results.innerHTML = `
            <div class="card card-basic">
                <p>Recommended FPS ${usableDivisors.length === 1 ? 'Limit' : 'Limits'}: ${recommendations} ${usableDivisors.length === 1 ? '' : '(choose one)'}</p>
            </div>
            ${warning}
            <div class="card card-green">
                <p>
                    Choose the highest value your system can maintain consistently.
                </p>
            </div>
        `;
    }

    results.style.display = "block";
}