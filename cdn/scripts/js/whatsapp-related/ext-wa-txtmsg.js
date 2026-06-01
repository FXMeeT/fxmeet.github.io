const messages = [...document.querySelectorAll('div[data-testid^="conv-msg-"]')]
    .map(el => {
        const textEl = el.querySelector('[data-testid="selectable-text"] span');
        return textEl ? textEl.innerText.trim() : null;
    })
    .filter(Boolean);

const obj = {};

for (let i = 0; i < messages.length; i++) {
    obj[i] = messages[i];
}

console.log(obj);
