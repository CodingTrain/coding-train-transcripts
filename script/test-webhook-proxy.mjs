import Replicate from "replicate";

import "dotenv/config";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function main() {
  const ghRepo = `zeke/coding-train-transcripts`;
  const webhook = `https://fe74d3ab4511.ngrok.app/dispatch?gh_repo=${ghRepo}`;
  const webhook_events_filter = ["completed"];
  const version =
    "5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa"; // https://replicate.com/replicate/hello-world/versions

  const prediction = await replicate.predictions.create({
    version,
    input: { text: "Alice" },
    webhook,
    webhook_events_filter,
  });
  console.log({ prediction });
  console.log(`https://replicate.com/p/${prediction.id}`);
}

main();
