(() => {
  const CHARACTERS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()-_=+[{]};:\"\\|<>/? ";

  const map = {};
  const reverse = {};

  for (let i = 0; i < CHARACTERS.length; i++) {
    const code = String(i).padStart(2, "0");
    map[CHARACTERS[i]] = code;
    reverse[code] = CHARACTERS[i];
  }

  function encode(t) {
    let out = "";
    for (let i = 0; i < t.length; i++) out += map[t[i]] ?? t[i];
    return out;
  }

  function decode(t) {
    let out = "";
    for (let i = 0; i < t.length; i++) {
      const chunk = t.slice(i, i + 2);
      if (reverse[chunk]) {
        out += reverse[chunk];
        i++;
      } else out += t[i];
    }
    return out;
  }

  const el = document.querySelector(
    '[data-testid="conversation-compose-box-input"]'
  );
  if (!el) return;

  function setText(element, text) {
    element.focus();
    element.innerText = "";
    document.execCommand("insertText", false, text);
    element.dispatchEvent(new InputEvent("input", { bubbles: true }));
  }

  function pressEnter(element) {
    element.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
      })
    );
    element.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: "Enter",
        code: "Enter",
        keyCode: 13,
        which: 13,
        bubbles: true,
      })
    );
  }

  const old = document.getElementById("encoder_gui");
  if (old) old.remove();

  const ui = document.createElement("div");
  ui.id = "encoder_gui";

  ui.style.cssText = `
    position:fixed;
    top:15px;
    right:15px;
    width:360px;
    background:#1a1a1a;
    color:white;
    font-family:Arial;
    border-radius:10px;
    z-index:999999;
    box-shadow:0 0 12px rgba(0,0,0,0.6);
    overflow:hidden;
  `;

  ui.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:#2a2a2a;">
      <span>Encoder</span>
      <button id="closeBtn" style="background:red;color:white;border:none;border-radius:4px;width:24px;height:22px;">X</button>
    </div>

    <div style="padding:8px;display:flex;flex-direction:column;gap:6px;">
      <input id="inp" autocomplete="off"
        style="padding:6px;border-radius:6px;border:none;outline:none"/>

      <span id="originalLive"
        style="font-size:12px;color:#00ffcc;word-break:break-word;">
      </span>

      <div style="display:flex;gap:6px;">
        <button id="sendBtn" style="flex:1;background:#1e66ff;color:white;border:none;padding:6px;border-radius:6px;">Send</button>
        <button id="clearBtn" style="flex:1;background:#1e66ff;color:white;border:none;padding:6px;border-radius:6px;">Clear</button>
      </div>

      <label style="font-size:12px;display:flex;align-items:center;gap:6px;">
        <input type="checkbox" id="auto">
        Auto Decode Chat
      </label>
    </div>
  `;

  document.body.appendChild(ui);

  const input = ui.querySelector("#inp");
  const sendBtn = ui.querySelector("#sendBtn");
  const clearBtn = ui.querySelector("#clearBtn");
  const closeBtn = ui.querySelector("#closeBtn");
  const autoBox = ui.querySelector("#auto");
  const liveSpan = ui.querySelector("#originalLive");

  autoBox.checked = false;

  let raw = "";

  const store = new WeakMap();

  function findNodes() {
    return document.querySelectorAll(
      'div.copyable-text span[data-testid="selectable-text"] span'
    );
  }

  function looksEncoded(str) {
    const digits = str.match(/\d/g);
    return digits && digits.length >= 2;
  }

  function clearUIState() {
    document.querySelectorAll(".toggle_btn").forEach((b) => b.remove());
  }

  function applyDecode() {
    const nodes = findNodes();

    nodes.forEach((node) => {
      const text = node.innerText?.trim();
      if (!text || !looksEncoded(text)) return;

      if (!store.has(node)) {
        store.set(node, {
          encoded: text,
          decoded: decode(text),
          toggled: false,
        });
      }

      const s = store.get(node);
      node.innerText = s.decoded;
      makeButton(node);
    });
  }

  function restoreOriginal() {
    const nodes = findNodes();

    nodes.forEach((node) => {
      const s = store.get(node);
      if (!s) return;
      node.innerText = s.encoded;
    });

    clearUIState();
  }

  function makeButton(node) {
    if (node.parentElement?.querySelector(".toggle_btn")) return;

    const btn = document.createElement("button");
    btn.className = "toggle_btn";
    btn.textContent = "see original";

    btn.style.cssText = `
      font-size:10px;
      margin-left:6px;
      padding:2px 4px;
      border:none;
      border-radius:4px;
      background:#444;
      color:#fff;
      cursor:pointer;
    `;

    btn.onclick = () => {
      const s = store.get(node);
      if (!s) return;

      s.toggled = !s.toggled;
      node.innerText = s.toggled ? s.encoded : s.decoded;
      btn.textContent = s.toggled ? "see translated" : "see original";
    };

    node.parentElement.appendChild(btn);
  }

  autoBox.addEventListener("change", () => {
    clearUIState();

    if (autoBox.checked) {
      applyDecode();
    } else {
      restoreOriginal();
    }
  });

  setInterval(() => {
    if (!autoBox.checked) return;
    applyDecode();
  }, 300);

  sendBtn.onclick = () => {
    const encoded = encode(raw);
    setText(el, encoded);
    setTimeout(() => pressEnter(el), 30);
    raw = "";
    input.value = "";
    liveSpan.textContent = "";
  };

  clearBtn.onclick = () => {
    raw = "";
    input.value = "";
    liveSpan.textContent = "";
  };

  closeBtn.onclick = () => ui.remove();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
      e.preventDefault();
      return;
    }

    if (e.key === "Backspace") {
      raw = raw.slice(0, -1);
      input.value = encode(raw);
      liveSpan.textContent = raw;
      e.preventDefault();
      return;
    }

    if (e.key.length > 1) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    raw += e.key;
    input.value = encode(raw);
    liveSpan.textContent = raw;
    e.preventDefault();
  });
})();
