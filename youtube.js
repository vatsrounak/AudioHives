// youtube.js
const youtubeSearchAPI = require('youtube-search-api');
const config = require('./config');
const fs = require('fs');
const ytdl = require('ytdl-core');

async function searchYouTube(query) {
  try {
    console.log(`Searching YouTube for: ${query}`);
    const result = await youtubeSearchAPI.GetListByKeyword(query, false, 5, [{ type: 'video' }]);
    const videoIds = result.items.map((item) => item.id);
    console.log(`Found ${videoIds.length} videos.`);
    return videoIds;
  } catch (error) {
    console.error('Failed to search on YouTube:', error.message);
    return [];
  }
}


async function downloadYouTubeVideo(videoId, outputDir) {
  try {
    const videoInfo = await ytdl.getInfo(videoId);
    const videoTitle = videoInfo.videoDetails.title.replace(/[^\w.-]/g, '_');
    const outputPath = `${outputDir}/${videoTitle}.mp4`;

    ytdl(videoId).pipe(fs.createWriteStream(outputPath));
    console.log(`Downloaded: ${videoTitle}`);
  } catch (error) {
    console.error('Failed to download YouTube video:', error.message);
  }
}

module.exports = {
  searchYouTube,
  downloadYouTubeVideo,
};
