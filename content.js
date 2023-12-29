let isEnabled = false;

function handleKeydown(event) {
    if (event.key === '/' && isEnabled) {
        event.preventDefault();
        var searchBars = document.querySelectorAll('input[type="search"], input[type="text"]');
        if (searchBars.length > 0) {
            searchBars[0].focus();
        }
    }
}

// Initialize and add event listener
function init() {
    document.addEventListener('keydown', handleKeydown);
    chrome.storage.sync.get('enableFeature', function(data) {
        isEnabled = data.enableFeature !== false;
    });
}

// Listen for changes from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.featureEnabled !== undefined) {
        isEnabled = request.featureEnabled;
    }
});

init();
