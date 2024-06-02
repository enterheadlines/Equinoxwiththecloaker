window.addEventListener('DOMContentLoaded', (event) => {
    updateSettingsFromLocalStorage();
});

function updateSettingsFromLocalStorage() {
    const storedCloak = localStorage.getItem('equinox||cloak') || 'none';
    cloakPage(storedCloak);
}

function cloakPage(selectedCloak) {
    const tabIcons = {
        'google': '/assets/img/cloak/google.webp',
        'docs': '/assets/img/cloak/google-docs.webp',
        'drive': '/assets/img/cloak/google-drive.webp',
        'classroom': '/assets/img/cloak/home.webp',
        'chrome': '/assets/img/cloak/chrome.webp',
    };

    const tabTitles = {
        'google': 'Google',
        'docs': 'Google Docs',
        'drive': 'Google Drive',
        'classroom': 'Google Classroom',
        'chrome': 'Google Chrome',
    };

    document.body.classList.remove('cloak-google', 'cloak-googledrive', 'cloak-docs', 'cloak-classroom', 'cloak-chrome');
    if (selectedCloak !== 'none') {
        document.title = tabTitles[selectedCloak];

        const tabIcon = tabIcons[selectedCloak];
        if (tabIcon) {
            const existingFavicon = document.querySelector('link[rel="icon"]');
            if (existingFavicon) {
                existingFavicon.remove();
            }
            const newFavicon = document.createElement('link');
            newFavicon.rel = 'icon';
            newFavicon.href = tabIcon;
            document.head.appendChild(newFavicon);
        }

        localStorage.setItem('equinox||cloak', selectedCloak);
    } else {
        document.title = "Equinox V1";

        const defaultFaviconPath = '/assets/favicon.ico';
        const existingFavicon = document.querySelector('link[rel="icon"]');
        if (existingFavicon) {
            existingFavicon.remove();
        }
        const defaultFavicon = document.createElement('link');
        defaultFavicon.rel = 'icon';
        defaultFavicon.href = defaultFaviconPath;
        document.head.appendChild(defaultFavicon);

        localStorage.removeItem('equinox||cloak');
    }
}

function setLogoAndSubtitle(logoSrc, subtitleColor) {
    const spinningChangeIcon = document.getElementById('spinning');
    spinningChangeIcon.src = logoSrc;

    const creationInfo = document.querySelector('#creation-info');
    creationInfo.style.color = subtitleColor;
}