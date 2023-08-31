import Replicate from "replicate";

import "dotenv/config";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const audioFileUrl =
  "https://upcdn.io/FW25b4F/raw/coding-train/DbcLg8nRWEg.m4a";

async function main() {
  const prediction = await replicate.predictions.create({
    // // https://replicate.com/daanelson/whisperx/versions (supposedly better but OOMing)
    // version: "9aa6ecadd30610b81119fc1b6807302fd18ca6cbb39b3216f430dcf23618cedd",

    // https://replicate.com/openai/whisper/versions
    version: "91ee9c0c3df30478510ff8c8a3a545add1ad0259ad3a9f78fba57fbc05ee64f7",
    input: { audio: audioFileUrl },
    webhook: "https://fe74d3ab4511.ngrok.app/dispatch",
  });
  console.log({ prediction });
  console.log(`https://replicate.com/p/${prediction.id}`);
}

main();
