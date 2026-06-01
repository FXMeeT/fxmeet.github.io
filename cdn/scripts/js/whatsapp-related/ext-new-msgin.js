const messages = [...document.querySelectorAll('div[data-testid^="conv-msg-"]')]
    .filter(el => el.querySelector('.message-in')) // ONLY message-in
    .map(el => {
        const textEl = el.querySelector('[data-testid="selectable-text"] span');
        return textEl ? textEl.innerText.trim() : null;
    })
    .filter(Boolean)
    .reverse(); // newest first

const obj = {
    0: messages[0]
};

console.log(obj);
