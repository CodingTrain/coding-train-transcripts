const axios = require('axios');
const fs = require('fs');

require('dotenv').config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const CHANNEL_NAME = 'TheCodingTrain';
const OUTPUT_FILE = 'video_ids.json';

async function getChannelId() {
    try {
        let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${CHANNEL_NAME}&key=${GOOGLE_API_KEY}`);
        return response.data.items[0].snippet.channelId;
    } catch (error) {
        console.error('Error getting channel ID:', error);
    }
}

async function getVideoIds(channelId) {
    let videoIds = [];
    let pageToken = null;

    do {
        try {
            let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&channelId=${channelId}&maxResults=50&key=${GOOGLE_API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`);
            response.data.items.forEach(item => {
                videoIds.push(item.id.videoId);
            });
            pageToken = response.data.nextPageToken;
        } catch (error) {
            console.error('Error getting video IDs:', error);
            break;
        }
    } while (pageToken);

    return videoIds;
}

async function main() {
    const channelId = await getChannelId();
    if (!channelId) {
        console.error('Failed to get channel ID');
        return;
    }

    const videoIds = await getVideoIds(channelId);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(videoIds, null, 4));

    console.log(`Saved ${videoIds.length} video IDs to ${OUTPUT_FILE}`);
}

main();
