// automate.js
const cron = require('node-cron');
const { authenticateSpotify, getPlaylists } = require('./spotify');
const { searchYouTube, downloadYouTubeVideo } = require('./youtube');

const outputDir = './downloads';

console.log("hello")

async function scrapeAndDownload() {
  console.log('Starting the scraping and downloading process...');
  await authenticateSpotify();

  const playlists = await getPlaylists();
  console.log(`Found ${playlists.length} playlists.`);
  for (const playlist of playlists) {
    const tracks = playlist.tracks.items.map((item) => item.track.name);
    for (const track of tracks) {
      const query = `${track} ${playlist.name} audio`;
      const videoIds = await searchYouTube(query);
      if (videoIds.length > 0) {
        const videoId = videoIds[0]; // Select the first video
        downloadYouTubeVideo(videoId, outputDir);
      }
    }
  }
}

scrapeAndDownload();
// Schedule the script to run every 4 hours
// cron.schedule('0 */4 * * *', () => {
//   console.log('Running the script...');
//   scrapeAndDownload();
// });
