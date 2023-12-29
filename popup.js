document.addEventListener('DOMContentLoaded', function() {
    var checkbox = document.getElementById('toggleFeature');

    // Load the current state of the feature
    chrome.storage.sync.get('enableFeature', function(data) {
        checkbox.checked = data.enableFeature !== false;
    });

    // Save the current state of the feature
    checkbox.addEventListener('change', function() {
        chrome.storage.sync.set({enableFeature: checkbox.checked});
    });
});
