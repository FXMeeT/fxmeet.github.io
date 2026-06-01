const el = document.querySelector('[data-testid="conversation-compose-box-input"]');

function setText(element, text) {
    element.focus();

    element.innerText = "";

    document.execCommand("insertText", false, text);

    element.dispatchEvent(new InputEvent("input", {
        bubbles: true,
        cancelable: true
    }));
}

function pressEnter(element) {
    element.dispatchEvent(new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true
    }));

    element.dispatchEvent(new KeyboardEvent("keyup", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true
    }));
}

// RUN
setText(el, "testing");

setTimeout(() => {
    pressEnter(el);
}, 1);
