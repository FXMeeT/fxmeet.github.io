// ===== Secure Random Core =====
function rng(length = 8) {
    let result = "";
    while (result.length < length) {
        const arr = new Uint8Array(length);
        crypto.getRandomValues(arr);
        result += Array.from(arr).map(n => (n % 10)).join("");
    }
    return Number(result.slice(0, length));
}

function rngJSON(length = 8) {
    return { code: rng(length) };
}

// ===== Helpers =====
function forceDigit(number, parity = "even") {
    let str = number.toString();
    const lastDigit = parseInt(str[str.length - 1]);
    if (parity === "even" && lastDigit % 2 !== 0) str = str.slice(0, -1) + (lastDigit ^ 1);
    if (parity === "odd" && lastDigit % 2 === 0) str = str.slice(0, -1) + (lastDigit ^ 1);
    return Number(str);
}

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// ===== Extensions =====
rng.even = (length = 8) => forceDigit(rng(length), "even");
rng.odd = (length = 8) => forceDigit(rng(length), "odd");
rng.prime = (length = 3) => {
    let n;
    do {
        n = rng(length);
    } while (!isPrime(n));
    return n;
};

rngJSON.even = (length = 8) => ({ code: rng.even(length) });
rngJSON.odd = (length = 8) => ({ code: rng.odd(length) });
rngJSON.prime = (length = 3) => ({ code: rng.prime(length) });

// ===== Seeded RNG (LCG) =====
function rng_seed(seed, length = 8) {
    // LCG constants
    let s = seed % 2147483647;
    let result = "";
    while (result.length < length) {
        s = (s * 16807) % 2147483647; // Park–Miller LCG
        const n = s % 10;
        result += n.toString();
    }
    return Number(result.slice(0, length));
}

function rngJSON_seed(seed, length = 8) {
    return { code: rng_seed(seed, length) };
}

