let extensionEnabled = true;

// Send state for to active tab
browser.tabs.onActivated.addListener((focus)=> {
    browser.tabs.sendMessage(focus.tabId, extensionEnabled)
})

// Send for updated tabs
browser.tabs.onUpdated.addListener((focus) => {
    browser.tabs.sendMessage(focus, extensionEnabled)
})

// For the popup switch toggle
// This will send a message to inject or remove the listener from content.js
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.type === "GET_STATE") {
        console.log(sendResponse)
        sendResponse(extensionEnabled);
    }
    
    if(request.type === "TOGGLE_STATE") {
        extensionEnabled = request.state
        sendResponse(extensionEnabled)
        
        // real time update to content.js when toggling the popup switch
        browser.tabs.getCurrent().then((res)=>{
            browser.tabs.sendMessage(res.id, extensionEnabled)
        })
    }
});
