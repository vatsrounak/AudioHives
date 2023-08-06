# AudioHives : Spotify Playlist Downloader

This is a Node.js project that allows you to download songs from a Spotify playlist using YouTube as the source. The script uses the Spotify Web API to fetch playlist details, searches for each track on YouTube, and downloads the audio files.

## Prerequisites

Before running the script, make sure you have the following installed on your machine:

- Node.js (https://nodejs.org)
- npm (Node Package Manager) (comes with Node.js)

## Installation

1. Clone this repository to your local machine.

```bash
git clone https://github.com/Abhi6722/AudioHives
```

2. Change into the project directory.

```bash
cd AudioHives
```

3. Install the required npm packages.

```bash
npm install
```

## Getting Started

1. Obtain your Spotify API credentials (Client ID and Client Secret) and update them in the `config.js` file:

```javascript
// config.js
module.exports = {
    spotify: {
      clientId: 'YOUR_SPOTIFY_CLIENT_ID',
      clientSecret: 'YOUR_SPOTIFY_CLIENT_SECRET',
    },
    youtube: {
      apiKey: 'YOUR_YOUTUBE_API_KEY',
    },
  };
```

## Usage

1. To start the download process, simply run:
```bash
npm start
```

2. The script will run the index.js file and then we can open the [http://localhost:8888/login](http://localhost:8888/login) and login into our Spotify Account and then after that we can see the Access token in our terminal.

<img width="1207" alt="Screenshot 2023-08-06 at 12 59 46 AM" src="https://github.com/Abhi6722/AudioHives/assets/62201123/02a4c013-58bb-4353-9396-b237693a9d6b">

3. Now we have to copy the access token and paste ```getMe.js``` file in the token variable.
```
const token = "YOUR_GENERATED_ACCESS_TOKEN";
```

4. Now we have to run the getMe.js file in another terminal using the command
```
node getMe.js
```

5. The script will fetch the playlist details from Spotify, search for each track on YouTube, and download the audio files. The downloaded songs will be saved in the `songs` directory.

<img width="1293" alt="Screenshot 2023-08-06 at 1 01 16 AM" src="https://github.com/Abhi6722/AudioHives/assets/62201123/e91a39c5-6fe1-438f-9aac-41bcac2aff8f">


## Notes

- Make sure you have the required npm packages installed as mentioned in the `package.json` file.
- The script will download the audio of the first YouTube search result for each track. If you want to customize this behavior, you can modify the `downloadYouTubeVideo` function in the `youtube.js` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

This project uses the Spotify Web API and YouTube API to fetch playlist details and download songs, respectively.

Feel free to use, modify, and distribute this project according to the terms of the MIT License. Happy playlist downloading! 🎵🎧
