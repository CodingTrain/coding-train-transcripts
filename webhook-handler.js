const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const TRANSCRIPTS_DIR = path.join(__dirname, "transcripts");

// Ensure transcripts directory exists
if (!fs.existsSync(TRANSCRIPTS_DIR)) {
  fs.mkdirSync(TRANSCRIPTS_DIR);
}

// Middleware to parse JSON payloads

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// Single route to save prediction object
app.post("/", (req, res) => {
  const video_id = req.query.video_id;
  const prediction = req.body;

  // Check if video_id and prediction id are provided
  if (!video_id || !prediction.id) {
    return res
      .status(400)
      .json({ message: "Missing video_id or prediction id" });
  }

  const filename = `${video_id}--${prediction.id}.json`;
  const filepath = path.join(TRANSCRIPTS_DIR, filename);

  // Save JSON object to disk
  fs.writeFile(filepath, JSON.stringify(prediction, null, 2), (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error saving the file", error: err });
    }
    res.status(200).json({ message: "File saved successfully" });
  });

  console.log(`Saved ${filename}`);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
