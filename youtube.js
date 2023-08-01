const youtubeSearchAPI = require('youtube-search-api');
const config = require('./config');
const fs = require('fs');
const ytdl = require('ytdl-core');

async function searchYouTube(query) {
  try {
    console.log(`Searching YouTube for: ${query}`);
    const result = await youtubeSearchAPI.GetListByKeyword(query, false, 1, [{ type: 'video' }]);
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

    // Update to download audio-only in the desired format (e.g., mp3)
    const outputPath = `${outputDir}/${videoTitle}.mp3`;

    // Specify audio format and quality (optional)
    const audioOptions = {
      quality: 'highestaudio',
      filter: 'audioonly',
    };

    // Download the audio and save to the specified path
    const audioReadableStream = ytdl(videoId, audioOptions);
    const fileWriteStream = fs.createWriteStream(outputPath);
    audioReadableStream.pipe(fileWriteStream);

    fileWriteStream.on('finish', () => {
      console.log(`Downloaded: ${videoTitle}`);
    });
  } catch (error) {
    console.error('Failed to download YouTube video:', error.message);
  }
}

module.exports = {
  searchYouTube,
  downloadYouTubeVideo,
};
