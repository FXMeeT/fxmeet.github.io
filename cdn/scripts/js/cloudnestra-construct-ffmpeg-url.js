function handleUrl(url) {
    if (typeof url !== "string") return;

    // check full URL string for cloudnestra anywhere
    if (url.includes("cloudnestra")) {

        const ffmpegCmd = `ffmpeg -i "${url}" -c copy -bsf:a aac_adtstoasc output.mp4`;

        console.log("🎯 Cloudnestra detected URL:");
        console.log(url);
        console.log("\n🚀 FFmpeg command:");
        console.log(ffmpegCmd);

    } else {
        console.log("No match:", url);
    }
}

// example
handleUrl("https://cloudnestra.com/rcp/NDNkODFj...");
