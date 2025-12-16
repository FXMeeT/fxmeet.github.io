// Generate secure random digits as a number/string
function rng(length = 8, evenLastDigit = false) {
    let result = "";
    while (result.length < length - (evenLastDigit ? 1 : 0)) {
        const arr = new Uint8Array(length);
        crypto.getRandomValues(arr);
        result += Array.from(arr).map(n => (n % 10)).join("");
    }

    if (evenLastDigit) {
        const lastDigit = [0,2,4,6,8][Math.floor(Math.random() * 5)];
        result += lastDigit;
    } else if (length > result.length) {
        // fill last digit normally
        const last = Math.floor(Math.random() * 10);
        result += last;
    }

    return Number(result.slice(0, length));
}

// Generate JSON version
function rngJSON(length = 8, evenLastDigit = false) {
    return { code: rng(length, evenLastDigit) };
}

// Example usage:
// console.log(rng(8));           // e.g., 48392017
// console.log(rngJSON(8));       // e.g., { code: 48392017 }
// console.log(rng(10, true));    // e.g., 1234567892 (last digit even)
// console.log(rngJSON(10, true));// e.g., { code: 1234567892 }
