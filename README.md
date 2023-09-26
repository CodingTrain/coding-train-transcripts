# Coding Train Transcripts 🚂🌈

A project to collect transcripts of [The Coding Train](https://www.youtube.com/@TheCodingTrain) videos.

## How it works

1. **Collect YouTube video ids**: `script/collect-video-ids.js` uses the Youtube API to collect all the video IDs from the Coding Train channel and save them to `data/video-ids.json`
1. **Download audio for each video**: `script/download-audio-from-youtube.py` uses yt-dlp to download M4A audio files for each YouTube video
1. **Upload audio files to cloud storage**: This is a manual process for now. Put audio files on ByteScale with public URLs in the format `https://upcdn.io/FW25b4F/raw/coding-train/{youtube-video-id}.m4a`
1. **Run a local webhook server**: Run `node webhook-handler.js` to stand up a local Node.js server to receive webhooks
1. **Run a local tunnel**: Run `ngrok http 3000` to create a public URL for the webhook server
1. **Transcribe audio using Whisper on Replicate**: Run `NGROK_HOST="your-ngrok-host" node script/transcribe-audio.mjs` - User Whisper on Replicate to transcribe audio files to text. The webhook handler takes care of receiving the finished transcripts and saving them to disk in the [transcripts](transcripts) directory.

## Usage

1. `cp .env.example .env`
1. Put credentials in `.env`
1. Run the scipts in the order above
