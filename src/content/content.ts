console.log("📄 FocusLens content script loaded");

chrome.runtime.onMessage.addListener((message)=>{
    console.log("Contenscript recieved:",message);
    
});