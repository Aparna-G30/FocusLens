console.log("🚀 FocusLens service worker loaded");

chrome.runtime.onMessage.addListener(async(message)=>
{
        console.log("Service worker received:",message);

        if(message.type!=="TOGGLE"){
            return;
        }

        const [tab]=await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });

        if(!tab?.id){
            return;
        }

        chrome.tabs.sendMessage(tab.id, {
            type: "TOGGLE"
        });
        
});