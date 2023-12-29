// Function to handle keydown events
function handleKeydown(event) {
    if (event.key === '/') {
        event.preventDefault(); // Prevent the default action
        var searchBars = document.querySelectorAll('input[type="search"], input[type="text"]');
        if (searchBars.length > 0) {
            searchBars[0].focus(); // Focus on the first search bar found
        }
    }
}

// Check the stored setting and add or remove the event listener accordingly
function checkSettingAndUpdateListener() {
    chrome.storage.sync.get('enableFeature', function(data) {
        if (data.enableFeature) {
            document.addEventListener('keydown', handleKeydown);
        } else {
            document.removeEventListener('keydown', handleKeydown);
        }
    });
}

// Listen for changes in the stored settings
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let key in changes) {
        if (key === 'enableFeature') {
            checkSettingAndUpdateListener();
        }
    }
});

// Initial check
checkSettingAndUpdateListener();
