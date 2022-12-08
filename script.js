//API key for google: AIzaSyAevrhRvesvcgMUqZ_PhfF6LRuMkdFmOfY

function initMap() {
    // Create a new map and center it on the specified location.
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }

  window.initMap = initMap;