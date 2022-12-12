//API key for google: AIzaSyAevrhRvesvcgMUqZ_PhfF6LRuMkdFmOfY

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

/*function changeMarkerIcon(marker, iconUrl) {
  // Create a new icon object
  let icon = {
    url: "./pnpIcon.png",
    scaledSize: new google.maps.Size(32, 32), // scaled size
    origin: new google.maps.Point(100,100), // origin
    anchor: new google.maps.Point(100, 100) // anchor
  };

  // Set the marker's icon to the new icon
  marker.setIcon(icon);
}*/


let map, infoWindow;

function openFoodCategory(evt, categoryName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(categoryName).style.display = "block";
  evt.currentTarget.className += " active";
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.0522, lng: -118.2437 },
    zoom: 12,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Use my Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

//make the search for local resturaunts
function searchRestaurants() {
  // Get the search query from the input field
  var query = document.getElementById('searchInput').value;

  // Set the latitude, longitude, and radius for the search
  var latitude = 34.0522;
  var longitude = -118.2437;
  var radius = 500;

  // Create a new instance of the Google Maps API client
  var client = new google.maps.places.PlacesService(document.createElement('div'));

  // Set the search parameters for the Places API request
  var request = {
    location: new google.maps.LatLng(latitude, longitude),
    radius: radius,
    query: query,
    type: 'restaurant',
    rankBy: google.maps.places.RankBy.DISTANCE
  };

  // Make the request to the Places API
  client.textSearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // Create an HTML table to display the search results
      var resultsTable = 
      '<table>'
      '<thead>'
        '<tr>'
        '</tr>'
      '</thead>'
      '<tbody>';
      // Loop through the top 3 results and log each place's name
      for (var i = 0; i < 3; i++) {
        console.log(results[i].name);
        resultsTable += '<tr><td>' + results[i].name + '</td><td>' + results[i].formatted_address + '</td></tr>';
      }
      // Close the table and add it to the page
      resultsTable += '</tbody></table>';
      document.getElementById('foundPlaces').innerHTML = resultsTable;

      var map = new google.maps.Map(document.getElementById('map'), {
        center: results[0].geometry.location,
        zoom: 18
      });

      // Add a marker for the first result to the map
      //changeMarkerIcon();
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      
    } else {
      console.error('Request to the Google Maps API failed with status: ' + status);
    }
  });
}

window.initMap = initMap;