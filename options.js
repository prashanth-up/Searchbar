// Saves options to chrome.storage
function save_options() {
    var enableFeature = document.getElementById('enableFeature').checked;
    chrome.storage.sync.set({
        enableFeature: enableFeature
    }, function() {
        // Update status to let user know options were saved.
        console.log('Settings saved.');
    });
}

// Restores checkbox state using the preferences stored in chrome.storage
function restore_options() {
    chrome.storage.sync.get({
        enableFeature: true // default value
    }, function(items) {
        document.getElementById('enableFeature').checked = items.enableFeature;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('enableFeature').addEventListener('change', save_options);
