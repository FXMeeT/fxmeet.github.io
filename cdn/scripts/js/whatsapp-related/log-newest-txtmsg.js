const messages = [...document.querySelectorAll('div[data-testid^="conv-msg-"]')]
    .map(el => {
        const textEl = el.querySelector('[data-testid="selectable-text"] span');
        return textEl ? textEl.innerText.trim() : null;
    })
    .filter(Boolean)
    .reverse();

// only ONE entry (latest message)
const obj = {
    0: messages[0]
};

console.log(obj);
