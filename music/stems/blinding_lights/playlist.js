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
      "src": "/static/files/audio/stems/blinding_lights/session_STEM_Bass.ogg",
      "name": "Bass",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/blinding_lights/session_STEM_Drums.ogg",
      "name": "Drums",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/blinding_lights/session_STEM_JordiVocals.ogg",
      "name": "Vocals Jordi",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/blinding_lights/session_STEM_MarcVocals.ogg",
      "name": "Vocals Marc",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/blinding_lights/session_STEM_Bass.ogg",
      "name": "Bass",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/blinding_lights/session_STEM_RtmGuitars.ogg",
      "name": "Rhythm Guitars",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/blinding_lights/session_STEM_SoloGuitars.ogg",
      "name": "Solo Guitars",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/blinding_lights/session_STEM_Synth.ogg",
      "name": "Synth",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/blinding_lights/session_STEM_VocalFX.ogg",
      "name": "Vocal Effects",
      "gain": 1,
      "muted": false,
      "soloed": false
    },

    
  ]).then(function() {
    //can do stuff with the playlist.
  });