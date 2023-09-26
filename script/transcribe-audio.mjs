import fs from "fs/promises";
import Replicate from "replicate";

import "dotenv/config";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function main() {
  try {
    // Read and parse the JSON file
    const data = await fs.readFile("video_ids.json", "utf8");
    const videoIds = JSON.parse(data);

    // Exclude video IDs that already have transcripts
    const filenames = await fs.readdir("transcripts");
    const videoIdsWithoutTranscripts = videoIds.filter(
      (videoId) => !filenames.includes(`${videoId}.json`)
    );

    console.log("Total video IDs:", videoIds.length);
    console.log(
      "Video IDs without transcripts:",
      videoIdsWithoutTranscripts.length
    );

    // Construct and print the URL for each ID
    for (let i = 0; i < videoIdsWithoutTranscripts.length; i++) {
      const videoId = videoIdsWithoutTranscripts[i];
      const webhook = `${process.env.NGROK_HOST}/?video_id=${videoId}`;
      const audioFileUrl = `https://upcdn.io/FW25b4F/raw/coding-train/${videoId}.m4a`;
      console.log({ videoId, webhook, audioFileUrl });

      let prediction = await replicate.predictions.create({
        // https://replicate.com/openai/whisper/versions
        version:
          "91ee9c0c3df30478510ff8c8a3a545add1ad0259ad3a9f78fba57fbc05ee64f7",
        input: {
          audio: audioFileUrl,
        },
        webhook,
        webhook_events_filter: ["completed"],
      });
      console.log({ prediction });
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
