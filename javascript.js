window.addEventListener('resize', sizeChanged);

function sizeChanged() {
    if (document.documentElement.clientWidth > 760) {
        document.getElementById("sideButton").style.marginLeft = "";
        document.getElementById("sidenavLeft").style.width = "";
        document.getElementById("paypalMenu").style.display = "none";
    }
}

function toggleNav() {
    if (document.getElementById("sidenavLeft").style.width == 0) {
        document.getElementById('sideButton').classList.add('pressed');
        document.getElementById("sidenavLeft").style.width = "21.5em";
    }
    else {
        document.getElementById("sidenavLeft").style.width = "";
        document.getElementById('sideButton').classList.remove('pressed');
        document.getElementById("paypalMenu").style.display = "none";
    }
}

function toggleDonationMenu() {
    if (document.getElementById("paypalMenu").style.display == "none") {
        document.getElementById("paypalMenu").style.display = "block";
    }
    else {
        document.getElementById("paypalMenu").style.display = "none";
    }
}