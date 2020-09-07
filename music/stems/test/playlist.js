var playlist = WaveformPlaylist.init({
    samplesPerPixel: 1000,
    waveHeight: 100,
    container: document.getElementById("playlist"),
    timescale: true,
    state: 'cursor', 
    isAutomaticScroll: true,
    colors: {
      waveOutlineColor: '#343434'
    },
    controls: {
      show: true, //whether or not to include the track controls
      width: 200 //width of controls in pixels
    },
    zoomLevels: [500, 1000, 3000, 5000]
  });
  
  playlist.load([
    {
      "src": "/static/files/audio/stems/test/bastablues_stem_session_Bass BUS.mp3",
      "name": "Bass",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/test/bastablues_stem_session_Drums BUS.mp3",
      "name": "Drums",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/test/bastablues_stem_session_Guitar BUS.mp3",
      "name": "Guitar",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/test/bastablues_stem_session_Reverb.mp3",
      "name": "Reverb",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
  ]).then(function() {
    //can do stuff with the playlist.
  });