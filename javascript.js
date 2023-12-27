window.addEventListener('resize', sizeChanged);

function closeAllDonoMenus() {
    var items = document.getElementsByClassName("donoMenu");
    for (var i = 0; i < items.length; i++) {
        if (items[i].style.display == "block") {
            items[i].style.display = "none";
        }
    }
}

function sizeChanged() {
    if (document.documentElement.clientWidth > 760) {
        document.getElementById("sideButton").style.marginLeft = "";
        document.getElementById("sidenavLeft").style.width = "";
        closeAllDonoMenus();
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
        closeAllDonoMenus();
    }
}

function handleButtonClick(event, element) {
    event.stopPropagation();

    toggleDonationMenu(element);
}

function toggleDonationMenu(element) {
    closeAllDonoMenus();
    if (element.style.display == "none") {
        element.style.display = "block";

        // Close the popup after 20 seconds
        setTimeout(function() {
            element.style.display = "none";
        }, 20000);
    }
    else {
        element.style.display = "none";
    }
}

document.addEventListener('click', function(event) {
    closeAllDonoMenus();
});
