console.log("🎨 Popup opened");

// const button = document.getElementById("toggleBtn") as HTMLButtonElement;

// button.addEventListener("click", () => {
//     console.log("🟢 Button clicked");

//     chrome.runtime.sendMessage({
//         type: "TOGGLE"
//     });
// });

document.addEventListener("DOMContentLoaded", initialize);

async function initialize(): Promise<void> {
    const button = document.getElementById("toggleBtn") as HTMLButtonElement;

    const result = await chrome.storage.sync.get("enabled");

const enabled: boolean =
    typeof result.enabled === "boolean"
        ? result.enabled
        : true;

    updateButton(button, enabled);

    button.addEventListener("click", async () => {

    const result = await chrome.storage.sync.get("enabled");

    const enabled =
        typeof result.enabled === "boolean"
            ? result.enabled
            : true;

    const newValue = !enabled;

    await chrome.storage.sync.set({
        enabled: newValue
    });

    updateButton(button, newValue);

    console.log("FocusLens enabled:", newValue);

});
}

function updateButton(
    button: HTMLButtonElement,
    enabled: boolean
): void {

    if (enabled) {
        button.textContent = "Disable FocusLens";
    } else {
        button.textContent = "Enable FocusLens";
    }

}