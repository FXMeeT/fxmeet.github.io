 // Define custom Base16 characters
const BASE16_CHARS = '0123456789ABCDEF';
const BASE16_VALUES = Object.fromEntries(BASE16_CHARS.split('').map((ch, idx) => [ch, idx]));
function decodeURL(stringURL) {return decodeURI(stringURL);} function encodeURL(stringURL) {return encodeURI(stringURL);}
function encodeBase16(input16) {
    const b16_data16 = new TextEncoder().encode(input16);
    let b16_encoded16 = '';

    for (let b16_i16 = 0; b16_i16 < b16_data16.length; b16_i16++) {
        const b16_byte16 = b16_data16[b16_i16];
        b16_encoded16 += BASE16_CHARS[b16_byte16 >> 4] + BASE16_CHARS[b16_byte16 & 0x0F];
    }

    return b16_encoded16;
}

function decodeBase16(input16) {
    if (input16.length % 2 !== 0) {
        throw new Error('Invalid Base16 encoded string');
    }

    const b16_out16 = new Uint8Array(input16.length / 2);

    for (let b16_i16 = 0; b16_i16 < input16.length; b16_i16 += 2) {
        const b16_high16 = BASE16_VALUES[input16[b16_i16]];
        const b16_low16 = BASE16_VALUES[input16[b16_i16 + 1]];
        if (b16_high16 === undefined || b16_low16 === undefined) {
            throw new Error('Invalid character in Base16 encoded string');
        }
        b16_out16[b16_i16 / 2] = (b16_high16 << 4) | b16_low16;
    }

    return new TextDecoder().decode(b16_out16);
}

// Base32 encoding/decoding functions
const BASE32_RFC4648 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const BASE32_VALUES = Object.fromEntries(BASE32_RFC4648.split('').map((ch, idx) => [ch, idx]));

function encodeBase32(input32) {
    const data32 = new TextEncoder().encode(input32);
    let encoded32 = '';
    let bits32 = 0;
    let value32 = 0;

    for (let i32 = 0; i32 < data32.length; i32++) {
        value32 = (value32 << 8) | data32[i32];
        bits32 += 8;

        while (bits32 >= 5) {
            encoded32 += BASE32_RFC4648[(value32 >>> (bits32 - 5)) & 31];
            bits32 -= 5;
        }
    }

    if (bits32 > 0) {
        encoded32 += BASE32_RFC4648[(value32 << (5 - bits32)) & 31];
    }

    while (encoded32.length % 8 !== 0) {
        encoded32 += '=';
    }

    return encoded32;
}

function decodeBase32(input32) {
    const sanitizedInput32 = input32.replace(/=+$/, '');
    const output32 = [];
    let bits32 = 0;
    let value32 = 0;

    for (let i32 = 0; i32 < sanitizedInput32.length; i32++) {
        const char32 = sanitizedInput32[i32];
        if (BASE32_VALUES[char32] === undefined) {
            throw new Error('Invalid character in Base32 encoded string');
        }

        value32 = (value32 << 5) | BASE32_VALUES[char32];
        bits32 += 5;

        if (bits32 >= 8) {
            output32.push((value32 >>> (bits32 - 8)) & 255);
            bits32 -= 8;
        }
    }

    return new TextDecoder().decode(new Uint8Array(output32));
}

// Base64 encoding/decoding functions
function encodeBase64(input64) {
    return btoa(input64);
}

function decodeBase64(input64) {
    return atob(input64);
}

// Base85 encoding/decoding functions
const BASE85_CHARS = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstu';
const BASE85_VALUES = Object.fromEntries(BASE85_CHARS.split('').map((ch, idx) => [ch, idx]));

function encodeBase85(input85) {
    const data85 = new TextEncoder().encode(input85);
    let encoded85 = '';
    let b85 = 0;
    let n85 = 0;

    for (let i85 = 0; i85 < data85.length; i85++) {
        b85 = (b85 << 8) | data85[i85];
        n85 += 8;
        if (n85 >= 32) {
            for (let j85 = 0; j85 < 5; j85++) {
                encoded85 = BASE85_CHARS[b85 % 85] + encoded85;
                b85 = Math.floor(b85 / 85);
            }
            n85 = 0;
        }
    }

    if (n85 > 0) {
        for (let i85 = 0; i85 < 5; i85++) {
            b85 = (b85 << (32 - n85)) >>> (32 - n85);
            encoded85 = BASE85_CHARS[b85 % 85] + encoded85;
            b85 = Math.floor(b85 / 85);
        }
    }

    return '<~' + encoded85 + '~>';
}

function decodeBase85(input85) {
    const sanitizedInput85 = input85.replace(/<~|~>/g, '');
    const output85 = [];
    let b85 = 0;
    let n85 = 0;

    for (let i85 = 0; i85 < sanitizedInput85.length; i85++) {
        const char85 = sanitizedInput85[i85];
        if (BASE85_VALUES[char85] === undefined) {
            throw new Error('Invalid character in Base85 encoded string');
        }

        b85 = (b85 * 85) + BASE85_VALUES[char85];
        n85 += 5;

        if (n85 >= 32) {
            for (let j85 = 3; j85 >= 0; j85--) {
                output85.push((b85 >>> (j85 * 8)) & 255);
            }
            b85 = 0;
            n85 = 0;
        }
    }

    if (n85 > 0) {
        b85 = (b85 << (32 - n85)) >>> (32 - n85);
        for (let i85 = 3; i85 >= 0; i85--) {
            output85.push((b85 >>> (i85 * 8)) & 255);
        }
    }

    return new TextDecoder().decode(new Uint8Array(output85));
}

// Base91 encoding/decoding functions
const BASE91_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&()*+,./:;<=>?@[]^_`{|}~"';
const BASE91_VALUES = Object.fromEntries(BASE91_CHARS.split('').map((ch, idx) => [ch, idx]));

function encodeBase91(input91) {
    const data91 = new TextEncoder().encode(input91);
    let b91 = 0;
    let n91 = 0;
    let encoded91 = '';

    for (let i91 = 0; i91 < data91.length; i91++) {
        b91 |= data91[i91] << n91;
        n91 += 8;
        if (n91 > 13) {
            let v91 = b91 & 8191;
            if (v91 > 88) {
                b91 >>= 13;
                n91 -= 13;
            } else {
                v91 = b91 & 16383;
                b91 >>= 14;
                n91 -= 14;
            }
            encoded91 += BASE91_CHARS[v91 % 91] + BASE91_CHARS[Math.floor(v91 / 91)];
        }
    }

    if (n91) {
        encoded91 += BASE91_CHARS[b91 % 91];
        if (n91 > 7 || b91 > 90) {
            encoded91 += BASE91_CHARS[Math.floor(b91 / 91)];
        }
    }

    return encoded91;
}

function decodeBase91(input91) {
    let v91 = -1;
    let b91 = 0;
    let n91 = 0;
    const out91 = [];

    for (let i91 = 0; i91 < input91.length; i91++) {
        const char91 = input91[i91];
        if (!(char91 in BASE91_VALUES)) continue;
        const c91 = BASE91_VALUES[char91];
        if (v91 < 0) {
            v91 = c91;
        } else {
            v91 += c91 * 91;
            b91 |= v91 << n91;
            n91 += (v91 & 8191) > 88 ? 13 : 14;
            while (n91 > 7) {
                out91.push(b91 & 255);
                b91 >>= 8;
                n91 -= 8;
            }
            v91 = -1;
        }
    }

    if (v91 >= 0) {
        out91.push((b91 | (v91 << n91)) & 255);
    }

    return new TextDecoder().decode(new Uint8Array(out91));
}


// Given:
const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()-_=+[{]};:"\\|<>/? ';
const CHARACTERS_VALUE = '101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778';


function createCharToValueMap(characters, values) {
    const map = {};
    for (let i = 0; i < characters.length; i++) {
        map[characters[i]] = values.substring(i * 2, i * 2 + 2); // Take pairs of characters as values
    }
    return map;
}

function createValueToCharMap(characters, values) {
    const map = {};
    for (let i = 0; i < characters.length; i++) {
        map[values.substring(i * 2, i * 2 + 2)] = characters[i]; // Take pairs of characters as keys
    }
    return map;
}

const charToValueMap = createCharToValueMap(CHARACTERS, CHARACTERS_VALUE);
const valueToCharMap = createValueToCharMap(CHARACTERS, CHARACTERS_VALUE);

function encode(chars) {
    let encoded = '';
    for (let iEn = 0; iEn < chars.length; iEn++) {
        const char = chars[iEn];
        const value = charToValueMap[char];
        if (value) {
            encoded += value;
        } else {
            console.error(`Character "${char}" cannot be encoded. Check if it exists in CHARACTERS.`);
            throw new Error(`Character "${char}" cannot be encoded.`);
        }
    }
    encoded += '00'; // Append '00' to indicate the end of the encoded string
    return encoded;
}

function decode(encoded) {
    let decoded = '';
    for (let iDe = 0; iDe < encoded.length - 2; iDe += 2) { // -2 to ignore the final '00'
        const value = encoded.substring(iDe, iDe + 2);
        const char = valueToCharMap[value];
        if (char) {
            decoded += char;
        } else {
            console.error(`Encoded value "${value}" cannot be decoded. Check if it exists in CHARACTERS_VALUE.`);
            throw new Error(`Encoded value "${value}" cannot be decoded.`);
        }
    }
    return decoded;
}

export {
    encodeBase16,
    decodeBase16,
    encodeBase32,
    decodeBase32,
    encodeBase64,
    decodeBase64,
    encodeBase85,
    decodeBase85,
    encodeBase91,
    decodeBase91,
    encode,
    decode
}
