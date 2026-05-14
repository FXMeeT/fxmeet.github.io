(() => {
    const panel = document.createElement("div");

    panel.style = `
        position: fixed;
        bottom: 0;
        right: 0;
        width: 420px;
        height: 45vh;
        overflow: auto;
        background: rgba(0,0,0,0.85);
        color: #0f0;
        font-family: monospace;
        font-size: 12px;
        z-index: 999999;
        padding: 10px;
        border-top-left-radius: 10px;
    `;

    panel.innerHTML = "<b>NETWORK LOG</b><br><br>";

    document.body.appendChild(panel);

    function log(type, url) {
        const line = document.createElement("div");

        const isMedia =
            url.includes(".m3u8") ||
            url.includes(".mp4") ||
            url.includes(".ts") ||
            url.includes(".mp3");

        line.innerHTML = `
            <span style="color:${isMedia ? 'red' : '#0f0'}">
                [${type}]
            </span>
            ${url}
        `;

        panel.appendChild(line);
        panel.scrollTop = panel.scrollHeight;
    }

    // ---- FETCH hook ----
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
        const url = typeof args[0] === "string" ? args[0] : args[0].url;

        log("FETCH", url);

        return originalFetch.apply(this, args);
    };

    // ---- XHR hook ----
    const open = XMLHttpRequest.prototype.open;
    const send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this._url = url;
        return open.call(this, method, url, ...rest);
    };

    XMLHttpRequest.prototype.send = function (...args) {
        if (this._url) log("XHR", this._url);
        return send.call(this, ...args);
    };

    // ---- DOM media scanner ----
    function scanMedia() {
        document.querySelectorAll("video, audio, source").forEach(el => {
            const src = el.currentSrc || el.src;

            if (src) log("MEDIA", src);
        });
    }

    setInterval(scanMedia, 1000);

    console.log("[NETWORK INSPECTOR ACTIVE]");
})();
