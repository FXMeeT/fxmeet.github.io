function handleUrl(url) {
    try {
        const parsed = new URL(url);

        // check if domain starts with cloudnestra
        if (parsed.hostname.startsWith("cloudnestra")) {
            const ffmpegCmd = `ffmpeg -i "${url}" -c copy -bsf:a aac_adtstoasc output.mp4`;

            console.log("🎯 Cloudnestra stream detected:");
            console.log(ffmpegCmd);
        } else {
            console.log("Not a cloudnestra URL:", url);
        }

    } catch (e) {
        console.error("Invalid URL:", url);
    }
}

// example usage
handleUrl("https://cloudnestra.example.com/video/master.m3u8");
