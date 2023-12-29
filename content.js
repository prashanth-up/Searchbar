let isEnabled = false;

function handleKeydown(event) {
    // Check if the focused element is an input field or a textarea
    var focusedElement = document.activeElement;
    var isTyping = focusedElement.tagName === 'INPUT' || focusedElement.tagName === 'TEXTAREA';

    // If the user is typing in an input field or a textarea, do not override the key
    if (isTyping) {
        return;
    }

    if (event.key === '/' && isEnabled) {
        event.preventDefault(); // Prevent the default action
        var searchBars = document.querySelectorAll('input[type="search"], input[type="text"]');
        if (searchBars.length > 0) {
            searchBars[0].focus(); // Focus on the first search bar found
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
