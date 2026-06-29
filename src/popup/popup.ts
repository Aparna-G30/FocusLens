console.log("🎨 Popup opened");

const button = document.getElementById("toggleBtn") as HTMLButtonElement;

button.addEventListener("click", () => {
    console.log("🟢 Button clicked");

    chrome.runtime.sendMessage({
        type: "TOGGLE"
    });
});