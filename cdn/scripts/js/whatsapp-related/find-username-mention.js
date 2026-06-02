// TARGET HANDLE
const targetHandle = "@vazebusiness";

// Get all message blocks
const messages = [
    ...document.querySelectorAll('div[data-testid^="conv-msg-"]')
];

// Extract message text safely
function getText(msg) {
    const el = msg.querySelector('[data-testid="selectable-text"] span');
    return el ? el.innerText.trim() : "";
}

// Extract sender (optional fallback)
function getSender(msg) {
    const el = msg.querySelector("span[dir='auto']");
    return el ? el.innerText.trim() : "unknown";
}

// Build list of all messages containing the handle
const matched = messages
    .map(msg => {
        const text = getText(msg);
        return {
            msg,
            text,
            sender: getSender(msg),
            hasMention: text.includes(targetHandle)
        };
    })
    .filter(item => item.hasMention);

// Get latest mention (last in DOM order)
const latest = matched.length > 0 ? matched[matched.length - 1] : null;

if (!latest) {
    console.log(`No messages found mentioning ${targetHandle}`);
} else {
    console.log("Latest mention found:");
    console.log("Sender:", latest.sender);
    console.log("Message:", latest.text);

    // optional highlight in UI
    latest.msg.style.border = "2px solid red";
    latest.msg.scrollIntoView({ behavior: "smooth", block: "center" });
}
