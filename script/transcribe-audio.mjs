import fs from 'fs/promises';
import Replicate from "replicate";

require('dotenv').config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});



async function main() {
  try {
    // Read and parse the JSON file
    const data = await fs.readFile('video_ids.json', 'utf8');
    const videoIds = JSON.parse(data);

    // Construct and print the URL for each ID
    for (let i = 0; i < videoIds.length; i++) {
      const url = `https://upcdn.io/FW25b4F/raw/coding-train/${videoIds[i]}.m4a`;
      console.log(url);

      let prediction = await replicate.predictions.create({
        version: "9aa6ecadd30610b81119fc1b6807302fd18ca6cbb39b3216f430dcf23618cedd",
        input: {
          audio: url
        }
      });
      console.log({prediction})
    }

  } catch (err) {
    console.error('Error:', err);
  }
}

main();
