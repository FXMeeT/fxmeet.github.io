const matches = [...document.querySelectorAll('div[data-testid^="conv-msg-"]')]
    .filter(el =>
        el.querySelector('[data-testid="msg-container"]') &&
        el.querySelector('[data-testid="msg-meta"]') &&
        (
            el.querySelector('[data-testid="selectable-text"]') || // text message
            el.querySelector('[data-testid="image-thumb"]') || // image message
            el.querySelector('[data-testid="image-caption selectable-text"]') // image caption
        )
    );

console.log(`Found ${matches.length} matching conv-msg element(s):`);

matches.forEach(el => console.log(el));
