(() => {
  const CHARACTERS =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()-_=+[{]};:\"\\|<>/? ";

  const map = {};
  for (let i = 0; i < CHARACTERS.length; i++) {
    map[CHARACTERS[i]] = String(i).padStart(2, "0");
  }

  function encode(t) {
    let out = "";
    for (let i = 0; i < t.length; i++) {
      out += map[t[i]] ?? t[i];
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

    element.dispatchEvent(
      new InputEvent("input", { bubbles: true, cancelable: true })
    );
  }

  function pressEnter(element) {
    element.focus();

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
    width:300px;
    background:#1a1a1a;
    color:white;
    font-family:Arial;
    border-radius:10px;
    z-index:999999;
    box-shadow:0 0 12px rgba(0,0,0,0.6);
    overflow:hidden;
  `;

  const blueBtn = `
    background:#1e66ff;
    color:white;
    border:none;
    padding:6px;
    border-radius:6px;
    cursor:pointer;
    font-weight:bold;
  `;

  ui.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:#2a2a2a;">
      <span>Encoder</span>
      <button id="closeBtn" style="background:red;color:white;border:none;border-radius:4px;cursor:pointer;width:24px;height:22px;">X</button>
    </div>

    <div style="padding:8px;display:flex;flex-direction:column;gap:6px;">
      <input id="inp" autocomplete="off"
        style="padding:6px;border-radius:6px;border:none;outline:none"/>

      <div id="preview" style="font-size:12px;opacity:0.7;word-break:break-word;"></div>

      <div style="display:flex;gap:6px;">
        <button id="sendBtn" style="flex:1;${blueBtn}">Send</button>
        <button id="clearBtn" style="flex:1;${blueBtn}">Clear All</button>
      </div>
    </div>
  `;

  document.body.appendChild(ui);

  const input = ui.querySelector("#inp");
  const preview = ui.querySelector("#preview");
  const sendBtn = ui.querySelector("#sendBtn");
  const clearBtn = ui.querySelector("#clearBtn");
  const closeBtn = ui.querySelector("#closeBtn");

  let raw = "";

  function update() {
    preview.textContent = raw;
    input.value = encode(raw);
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      send();
      e.preventDefault();
      return;
    }

    if (e.key === "Backspace") {
      raw = raw.slice(0, -1);
      update();
      e.preventDefault();
      return;
    }

    if (e.key.length > 1) return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    raw += e.key;
    update();
    e.preventDefault();
  });

  function send() {
    const encoded = encode(raw);

    setText(el, encoded);
    setTimeout(() => pressEnter(el), 30);

    raw = "";
    update();
  }

  function clearAll() {
    raw = "";
    update();
  }

  sendBtn.onclick = send;
  clearBtn.onclick = clearAll;
  closeBtn.onclick = () => ui.remove();
})();
