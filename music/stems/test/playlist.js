/* DURACIÓN TOTAL PARA EVITAR SEEK FUERA DE RANO */
var totalduration = 52

var playlist = WaveformPlaylist.init({
    /* ZOOM POR DEFECTO */
    samplesPerPixel: 2000,
    waveHeight: 100,
    container: document.getElementById("playlist"),
    timescale: true,
    state: 'cursor', 
    isAutomaticScroll: true,
    colors: {
      waveOutlineColor: '#343434'
    },
    controls: {
      show: true, 
      width: 200
    },
    /* LISTA DE ZOOMS */
    zoomLevels: [100, 500, 1000, 2000,3000, 5000, 10000,30000]
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