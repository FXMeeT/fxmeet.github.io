let lastMessage = null;

setInterval(() => {
    const messages = [...document.querySelectorAll('div[data-testid^="conv-msg-"]')]
        .filter(el => el.querySelector('.message-in'))
        .map(el => {
            const textEl = el.querySelector('[data-testid="selectable-text"] span');
            return textEl ? textEl.innerText.trim() : null;
        })
        .filter(Boolean)
        .reverse();

    const latest = messages[0];

    // only log if new message appears
    if (latest && latest !== lastMessage) {
        lastMessage = latest;

        console.log({
            0: latest
        });
    }
}, 5);
