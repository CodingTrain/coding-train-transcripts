const fs = require("fs");
const path = require("path");

// Directory with the JSON files
const TRANSCRIPTS_DIR = path.join(__dirname, "../transcripts");

// Output file path
const OUTPUT_FILE = path.join(
  __dirname,
  "../training-data/coding-train-autocomplete.jsonl"
);

// Check if directory exists
if (!fs.existsSync(TRANSCRIPTS_DIR)) {
  console.error(`Directory ${TRANSCRIPTS_DIR} does not exist.`);
  process.exit(1);
}

// Read all files in the directory
const files = fs.readdirSync(TRANSCRIPTS_DIR);

// Filter for only JSON files
const jsonFiles = files.filter((file) => path.extname(file) === ".json");

// Prepare the write stream for the output file
const writeStream = fs.createWriteStream(OUTPUT_FILE, "utf8");

jsonFiles.forEach((file) => {
  const filePath = path.join(TRANSCRIPTS_DIR, file);

  // Read the JSON file
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Extract the transcription
  if (jsonData.output && jsonData.output.transcription) {
    const transcription = jsonData.output.transcription.trim();

    // Create the new JSON object
    const newJsonObject = {
      text: transcription,
    };

    // Write the new JSON object as a string on a new line in the output file
    writeStream.write(JSON.stringify(newJsonObject) + "\n");
  }
});

writeStream.end(() => {
  console.log("Transcriptions written to", OUTPUT_FILE);
});
