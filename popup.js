document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('toggleFeature');

    // Load the current state of the feature
    chrome.storage.sync.get('enableFeature', function(data) {
        checkbox.checked = data.enableFeature !== false; // Set the checkbox state
    });

    // Save the current state of the feature
    checkbox.addEventListener('change', function() {
        chrome.storage.sync.set({enableFeature: checkbox.checked});
        // Send a message to the content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {featureEnabled: checkbox.checked});
        });
    });
});
