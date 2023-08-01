const youtubeSearchAPI = require('youtube-search-api');
const config = require('./config');
const fs = require('fs');
const { dlAudio } = require("youtube-exec");

async function searchYouTube(query) {
  try {
    console.log(`Searching YouTube for: ${query}`);
    const result = await youtubeSearchAPI.GetListByKeyword(query, false, 1, [{ type: 'video' }]);
    console.log(result);
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
    // Fetch the full video details, including duration
    const videoInfo = await dlAudio({
      url: `https://www.youtube.com/watch?v=${videoId}`,
      folder: outputDir,
      quality: "best",
    });

    const videoTitle = videoInfo.videoDetails.title.replace(/[^\w.-]/g, '_');
    const videoDuration = videoInfo.videoDetails.lengthSeconds;

    console.log(`Downloading: ${videoTitle}, Duration: ${videoDuration}s`);

    console.log(`Downloaded: ${videoTitle}`);
  } catch (error) {
    console.error('Failed to download YouTube video:', error.message);
  }
}

module.exports = {
  searchYouTube,
  downloadYouTubeVideo
};
