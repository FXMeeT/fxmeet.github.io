const matches = [...document.querySelectorAll('div[data-testid^="conv-msg-"]')]
    .filter(el =>
        el.querySelector('[data-testid="msg-container"]') &&
        el.querySelector('[data-testid="msg-meta"]') &&
        (
            // text messages
            el.querySelector('[data-testid="selectable-text"]') ||

            // image messages
            el.querySelector('[data-testid="image-thumb"]') ||
            el.querySelector('[data-testid="image-caption selectable-text"]') ||

            // video messages (NEW)
            el.querySelector('[data-testid="video-content"]')
        )
    );

console.log(`Found ${matches.length} matching conv-msg element(s):`);

matches.forEach(el => console.log(el));
