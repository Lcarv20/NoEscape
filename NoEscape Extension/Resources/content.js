let escKeyListener = function(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
    }
};

function toggleListener(state) {
    if (state) {
        // The extension is enabled
        window.removeEventListener('keydown', escKeyListener);
        window.addEventListener('keydown', escKeyListener);
    } else {
        // The extension is disabled
        if (escKeyListener) {
            window.removeEventListener('keydown', escKeyListener);
        }
    }
}

// listen changes from background script and call toggleListener
browser.runtime.onMessage.addListener((response, sender, sendResponse) => {
    toggleListener(response)
});
