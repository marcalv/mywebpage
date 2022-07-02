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
      "src": "/static/files/audio/stems/marcsvocals_backinblack/session_VOX.mp3",
      "name": "Vocals",
      "gain": 1,
      "muted": false,
      "soloed": false
    },
    {
      "src": "/static/files/audio/stems/marcsvocals_backinblack/session_INST.mp3",
      "name": "Instrumental",
      "gain": 1,
      "muted": false,
      "soloed": false
    },

    
  ]).then(function() {
    //can do stuff with the playlist.
  });