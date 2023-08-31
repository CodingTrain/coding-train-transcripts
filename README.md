# Coding Train Transcripts 🚂🌈

A project to collect transcripts of [The Coding Train](https://www.youtube.com/@TheCodingTrain) videos.

## How it works

1. `script/collect-video-ids.js` - Use the Youtube API to collect all the video IDs from the Coding Train channel and save them to `data/video-ids.json`
1. `script/download-audio-from-youtube.py` - Use yt-dlp to download M4A audio files for each YouTube video
1. Upload (manual for now) - Put audio files on ByteScale with public URLs in the format `https://upcdn.io/FW25b4F/raw/coding-train/{youtube-video-id}.m4a`
1. `transcribe-audio.mjs` - User WhisperX on Replicate to transcribe audio files to text

## Usage

1. `cp .env.example .env`
1. Put credentials in `.env`
1. Run the scipts in the order above
1. Profit?
