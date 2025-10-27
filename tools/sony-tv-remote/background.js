/**
 * comb9999_n0enter.js
 * --------------------------------------------
 * Sends every 4-digit combination (0000 → 9999)
 * to a Sony Bravia TV using IRCC codes.
 * 
 * TV details:
 *   IP  : 192.168.9.13
 *   PSK : KDLOVE
 * 
 * No "Enter" key is sent after each combo.
 * Stop with Ctrl + C.
 * --------------------------------------------
 * Author : Avinash-style Rewrite
 * Version: 1.0
 * --------------------------------------------
 */

"use strict";

const http = require("http");

// -------------------- Configuration --------------------
const TV_IP = "192.168.9.13";
const PSK = "KDLOVE";
const PORT = 80;

// -------------------- IRCC Codes --------------------
const IRCC_CODES = {
  "0": "AAAAAQAAAAEAAAAJAw==",
  "1": "AAAAAQAAAAEAAAAAAw==",
  "2": "AAAAAQAAAAEAAAABAw==",
  "3": "AAAAAQAAAAEAAAACAw==",
  "4": "AAAAAQAAAAEAAAADAw==",
  "5": "AAAAAQAAAAEAAAAEAw==",
  "6": "AAAAAQAAAAEAAAAFAw==",
  "7": "AAAAAQAAAAEAAAAGAw==",
  "8": "AAAAAQAAAAEAAAAHAw==",
  "9": "AAAAAQAAAAEAAAAIAw=="
};

// -------------------- Timing (ms) --------------------
const DIGIT_DELAY = 250;          // between digits
const COMBO_DELAY = 450;          // between combos
const RETRY_DELAY = 1200;         // after failed send

// -------------------- Helpers --------------------
/**
 * Build XML SOAP envelope for IRCC code.
 */
function makeEnvelope(code) {
  return `<?xml version="1.0"?>
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"
  s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <s:Body>
    <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
      <IRCCCode>${code}</IRCCCode>
    </u:X_SendIRCC>
  </s:Body>
</s:Envelope>`;
}

/**
 * Send one IRCC code via HTTP POST.
 */
function sendIRCC(code) {
  const xml = makeEnvelope(code);
  const options = {
    host: TV_IP,
    port: PORT,
    path: "/sony/IRCC",
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=UTF-8",
      "Content-Length": Buffer.byteLength(xml),
      "X-Auth-PSK": PSK
    },
    timeout: 7000
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve();
        else reject(new Error(`HTTP ${res.statusCode}`));
      });
    });
    req.on("error", reject);
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.write(xml);
    req.end();
  });
}

/**
 * Retry sending a single digit.
 */
async function sendDigitWithRetry(digit, tries = 3) {
  const code = IRCC_CODES[digit];
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      await sendIRCC(code);
      return;
    } catch (err) {
      if (attempt === tries) throw err;
      await delay(RETRY_DELAY);
    }
  }
}

/**
 * Send all digits of one 4-digit combo.
 */
async function sendCombo(combo) {
  for (const d of combo) {
    await sendDigitWithRetry(d);
    await delay(DIGIT_DELAY);
  }
}

/**
 * Utility delay.
 */
function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// -------------------- Main Process --------------------
async function comb9999() {
  console.log(`\n▶ Starting comb9999 (no Enter)\nTV: ${TV_IP}\nPSK: ${PSK}\n`);

  for (let i = 0; i <= 9999; i++) {
    const combo = i.toString().padStart(4, "0");
    process.stdout.write(`\rTrying: ${combo} (${i + 1}/10000)`);

    try {
      await sendCombo(combo);
    } catch (err) {
      console.error(`\n⚠ Failed combo ${combo}: ${err.message}`);
      console.log("↻ Retrying...");
      await delay(RETRY_DELAY);
      try {
        await sendCombo(combo);
      } catch (err2) {
        console.error(`❌ Retry failed for ${combo}: ${err2.message}`);
      }
    }

    await delay(COMBO_DELAY);
  }

  console.log("\n✅ Done: All combinations attempted.\n");
}

// -------------------- Signal Handler --------------------
process.on("SIGINT", () => {
  console.log("\n🛑 Interrupted by user. Exiting.\n");
  process.exit();
});

// -------------------- Start --------------------
comb9999();
