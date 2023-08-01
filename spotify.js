// spotify.js
const SpotifyWebApi = require('spotify-web-api-node');
const config = require('./config');

const spotifyApi = new SpotifyWebApi({
  clientId: config.spotify.clientId,
  clientSecret: config.spotify.clientSecret,
});

async function authenticateSpotify() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('access_token');
    console.log('Authenticated with Spotify!');
  } catch (error) {
    console.error('Failed to authenticate with Spotify:', error.message);
  }
}

async function getPlaylists() {
  try {
    const data = await spotifyApi.getUserPlaylists();
    const playlists = data.body.items;
    return playlists;
  } catch (error) {
    console.error('Failed to fetch playlists:', error.message);
    return [];
  }
}

module.exports = {
  authenticateSpotify,
  getPlaylists,
};
