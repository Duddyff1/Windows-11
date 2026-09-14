function openApp(appId) {
    const appWindow = document.getElementById(appId);
    if (appWindow) {
        appWindow.classList.remove('hidden');
    }
}

function closeApp(appId) {
    const appWindow = document.getElementById(appId);
    if (appWindow) {
        appWindow.classList.add('hidden');
    }
}
