 document.querySelectorAll('img').forEach((img, index) => {
    if (index === 7) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1920;
        canvas.height = 1080;
        ctx.drawImage(img, 0, 0, 1920, 1080);

        // Modify pixels: Convert gray to green, white to black
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];

            // Check if pixel is gray (R â‰ˆ G â‰ˆ B)
            if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10) {
                data[i] = 0;      // Red = 0
                data[i + 1] = 255; // Green = 255
                data[i + 2] = 0;   // Blue = 0
            }

            // Convert white to black
            if (r > 200 && g > 200 && b > 200) {
                data[i] = 0;
                data[i + 1] = 0;
                data[i + 2] = 0;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);

        if (window.previousBlobUrl) {
            URL.revokeObjectURL(window.previousBlobUrl);
        }

        canvas.toBlob(blob => {
            if (blob) {
                const blobUrl = URL.createObjectURL(blob);
                window.previousBlobUrl = blobUrl;
                console.log(`Blob URL: %c${blobUrl}`, 'color: cyan; font-weight: bold;');

                let copyButton = document.getElementById('copyBlobButton');
                if (!copyButton) {
                    copyButton = document.createElement('button');
                    copyButton.id = 'copyBlobButton';
                    copyButton.textContent = 'Copy Blob URL';
                    copyButton.style.cssText = 'margin: 5px; padding: 5px; font-size: 14px; cursor: pointer;';
                    document.body.appendChild(copyButton);
                }

                copyButton.onclick = () => {
                    navigator.clipboard.writeText(blobUrl).then(() => {
                        console.log('%cCopied to clipboard!', 'color: limegreen; font-weight: bold;');
                    }).catch(err => {
                        console.error('Failed to copy:', err);
                    });
                };

                setTimeout(() => {
                    URL.revokeObjectURL(blobUrl);
                    console.log('%cBlob URL revoked to free memory.', 'color: red; font-weight: bold;');
                }, 60000);

                fetchAndDescribeImage(blobUrl);
            }
        }, 'image/png');
    }
});

const API_KEY = 'AIzaSyBbkHLFEGMRXqvqBwD0p6QdEpdsif6FrKM';
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

function fetchAndDescribeImage(imageUrl) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", imageUrl, true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function () {
        if (xhr.status === 200) {
            const binary = new Uint8Array(xhr.response);
            let binaryString = "";
            for (let i = 0; i < binary.length; i++) {
                binaryString += String.fromCharCode(binary[i]);
            }
            const imageBase64 = btoa(binaryString);

            const data = JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Extract only the captcha code from the image." },
                        { inlineData: { mimeType: "image/png", data: imageBase64 } }
                    ]
                }]
            });

            const xhr2 = new XMLHttpRequest();
            xhr2.open("POST", url, true);
            xhr2.setRequestHeader("Content-Type", "application/json");

            xhr2.onload = function () {
                if (xhr2.status === 200) {
                    const response = JSON.parse(xhr2.responseText);
                    const content = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
                    const captchaCode = content.match(/[A-Za-z0-9]{4,}/)?.[0] || "";
                    console.log(`Extracted Captcha: %c${captchaCode}`, 'color: limegreen; font-weight: bold;');
                    
                    if (captchaCode) {
                        let captchaInput = document.getElementById("id_login_captcha");
                        captchaInput.value = captchaCode;
                        
                        let event = new Event('keyup', { bubbles: true, cancelable: true });
                        captchaInput.dispatchEvent(event);

                        fetch('https://allsaints.schoolnet.com.my/sms/ajaxpage_result.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({ 'typ': 'captcha_validation', 'value': captchaCode })
                        })
                        .then(response => response.text())
                        .then(data => console.log(data))
                        .catch(error => console.error('Error:', error));
                    } else {
                        console.error("No captcha code extracted.");
                    }
                } else {
                    console.error("Error:", xhr2.responseText);
                }
            };

            xhr2.onerror = function () {
                console.error("Request failed");
            };

            xhr2.send(data);
        } else {
            console.error("Failed to fetch image");
        }
    };

    xhr.onerror = function () {
        console.error("Image request failed");
    };

    xhr.send();
}
