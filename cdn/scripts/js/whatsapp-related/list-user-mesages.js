const matches = [...document.querySelectorAll('div[data-testid^="conv-msg-"]')]
    .filter(el =>
        el.querySelector('[data-testid="msg-container"]') &&
        el.querySelector('[data-testid="selectable-text"]') &&
        el.querySelector('[data-testid="msg-meta"]')
    );

console.log(`Found ${matches.length} matching conv-msg element(s):`);

matches.forEach(el => console.log(el));
