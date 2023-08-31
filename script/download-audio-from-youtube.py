import json
import os
import subprocess

# Load the video IDs from the JSON file
with open('video_ids.json', 'r') as file:
    video_ids = json.load(file)

# Ensure "audio" directory exists
if not os.path.exists('audio'):
    os.makedirs('audio')

# Check if yt-dlp is installed
try:
    subprocess.check_call(["yt-dlp", "--version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
except FileNotFoundError:
    raise SystemExit("Error: yt-dlp is not installed. Please install yt-dlp to proceed.")

# Loop through each video ID and download it as m4a
for video_id in video_ids:
    filename = f"audio/{video_id}.m4a"
    
    # Check if the file already exists, if so, skip it
    if os.path.exists(filename):
        print(f"{filename} already exists. Skipping download.")
        continue
    
    url = f"https://www.youtube.com/watch?v={video_id}"
    
    # Command to download video as m4a
    command = [
        "yt-dlp",
        "-f", "bestaudio[ext=m4a]",
        "--output", filename,
        url
    ]
    
    try:
        subprocess.run(command, check=True)
        print(f"Downloaded {url} as {filename}")
    except subprocess.CalledProcessError:
        print(f"Error downloading {url}")

print("Downloads completed!")
