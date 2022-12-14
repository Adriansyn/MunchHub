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

//Yelp Fusionls
Client ID
FKyQWTe-yrm1tRTRveurkA

API Key
70MBw7TuVsRr36nTsoQWnlMty01Szep2mc7KzI3kGi5S-Zm6iCJ-hukRvZs0prwGLrpdcENC1EwO3sZEnfJvwXAmeW7NSmMs9yFB7e5IMgiRqMQIP7Vz7alOF4WXY3Yx


}*/

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




var places = []
var suggestedPlaces = []


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


var places = [];


let map, infoWindow;

//save query and location to local storage

function afterLoadedData (query, resultsTable) {
  //  console.log(query.target.value);
 //   localStorage.setItem(query, resultsTable );
}

function afterLoadedData(query, suggestionsTable) {
  //  console.log(query.target.value);
  localStorage.setItem(query, suggestionsTable);
  console.log("first Function");
  suggestionLoadedData()
}
//display suggested locations
function suggestionLoadedData() {
  
  var suggestionsTable = 
      '<table>'
     '<thead>'
        '<tr>'
        '</tr>'
      '</thead>'
      '<tbody>' 
  console.log("Second Function");
  for (var i =0; i< 3; i++) {
  
    const randomIndex = Math.floor(Math.random() * places.length);
    // Add the random index value to the array
    const suggestedPlaces = JSON.parse(localStorage.getItem('suggestedPlaces'));
    // Get the object at the current index
    const newSpot = suggestedPlaces[randomIndex];
    // Create an element to display the object on the page
     suggestionsTable += '<tr><td>' + newSpot.name + '</td><td>' + newSpot.address + '</td></tr>';
    // Add the element to the page
    
  
  }
  suggestionsTable += '</tbody></table>';
  document.getElementById('suggestedPlaces').innerHTML = suggestionsTable;
}
function afterLoadedData(query, suggestionsTable) {
  console.log(query.target.value);
  localStorage.setItem(query, suggestionsTable);
//   console.log("first Function");
//   suggestionLoadedData()

}
// //display suggested locations

// function suggestionLoadedData() {
//   console.log("Second Function");
//   for (var i =0; i< 3; i++) {
//   if (places.length > 3){
//     const randomIndex = Math.floor(Math.random() * places.length);
//     // Add the random index value to the array
//     const suggestedPlaces = JSON.parse(localStorage.getItem('suggestedPlaces', places[randomIndex]));
//     // Get the object at the current index
//     const newSpot = places[randomIndex];
  
//     // Create an element to display the object on the page
//     const elem = document.createElement('div');
//     elem.innerText = JSON.stringify(newSpot);
//     // Add the element to the page
//     document.body.appendChild(elem);
//   }
//   }
// }

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
// Set the latitude, longitude, and radius for the search
var latitude = 34.0522;
var longitude = -118.2437;
var radius = 500;

//make the search for local resturaunts
function searchRestaurants() {
  // Get the search query from the input field
  var query = document.getElementById('searchInput').value;
  //save query to local storage
  //localStorage.setItem(query, resultsTable);

  // Create a new instance of the Google Maps API client
  var client = new google.maps.places.PlacesService(document.createElement('div'));

  // Set the search parameters for the Places API request
  var request = {
    location: new google.maps.LatLng(latitude, longitude),
    radius: radius,
    query: query,
    type: 'restaurant',
    rankBy: google.maps.places.RankBy.DISTANCE,
    //serves_beer: true
  };

  // Make the request to the Places API
  client.textSearch(request, function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // Create an HTML table to display the search results
      var resultsTable =
      '<table>'
      '<thead>'
      '<tr>'
      '</tr>'
      '</thead>'
      '<tbody>';


      

      places = []

      // var suggestionsTable =
      // '<table>'
      // '<thead>'
      // '<tr>'
      // '</tr>'
      // '</thead>'
      // '<tbody>';


      // Loop through the top 3 results and log each place's name
      for (var i = 0; i < 3; i++) {
        console.log(results[i].geometry.location);
        const searchResultButton = document.createElement("a");

        getBusiness(results[i].name, results[i].geometry.location.lat(), results[i].geometry.location.lng());
        resultsTable += '<tr><td>' + results[i].name + '</td><td>' + results[i].formatted_address + '</td></tr>';

     

        // //suggestionsTable += '<tr><td>' + places[i].name + '</td><td>' + places[i].formatted_address + '</td></tr>';


        var storedData = {
          name: results[i + 3].name,
          address: results[i + 3].formatted_address,

        }
        places.push(storedData);
        suggestedPlaces.push(storedData);
      }
      // Close the table and add it to the page
      resultsTable += '</tbody></table>';
      document.getElementById('foundPlaces').innerHTML = resultsTable;
      //adding search results to local storage

     //document.getElementById('foundPlaces').addEventListener('loadeddata',afterLoadedData);

     //resultsTable += '</tbody></table>';
    // document.getElementById('suggestedPlaces').innerHTML = resultsTable;
     //adding search results to local storage
    //document.getElementById('suggestedPlaces').addEventListener('loadeddata',afterLoadedData);
     

  afterLoadedData("suggestedPlaces",JSON.stringify(suggestedPlaces));
  //  afterLoadedData(query, JSON.stringify(places));

      //suggestionsTable += '</tbody></table>';
      //document.getElementById('suggestedPlaces').innerHTML = suggestionsTable;
      //adding search results to local storage
      document.getElementById('foundPlaces').addEventListener('loadeddata', afterLoadedData);

      afterLoadedData(query, JSON.stringify(places));

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




function getBusiness(nameofResult, latitude, longitude) {
//call Yelp API to do business search
const options1 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 70MBw7TuVsRr36nTsoQWnlMty01Szep2mc7KzI3kGi5S-Zm6iCJ-hukRvZs0prwGLrpdcENC1EwO3sZEnfJvwXAmeW7NSmMs9yFB7e5IMgiRqMQIP7Vz7alOF4WXY3Yx'
  }
};

fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${nameofResult}&latitude=${latitude}&longitude=${longitude}`, options1)
  .then(response => response.json())
  .then(response => {
    console.log(response.businesses[0].id)
    getBusinessReviews(response.businesses[0].id);
  })
  .catch(err => console.error(err));
}
//call Yelp API to get reviews
function getBusinessReviews(businessId) {
  const options2 = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer 70MBw7TuVsRr36nTsoQWnlMty01Szep2mc7KzI3kGi5S-Zm6iCJ-hukRvZs0prwGLrpdcENC1EwO3sZEnfJvwXAmeW7NSmMs9yFB7e5IMgiRqMQIP7Vz7alOF4WXY3Yx'
    }
  };
  
  fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${businessId}/reviews?limit=5&sort_by=yelp_sort`, options2)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

//getBusiness(nameofResult, latitude, longitude)






















// function getYelpBusID(location) {

// let yelpAPI = require('yelp-api');

// // Create a new yelpAPI object with your API key
// let apiKey = 'YOUR_API_KEY';
// let yelp = new yelpAPI(apiKey);

// // Set any parameters, if applicable (see API documentation for allowed params)
// let params = [
//   { name: results[i].name }, 
//   { latitude: results[i].google.maps.LatLng(latitude) }, 
//   { longitude: results[i].LatLng(longitude) },
//   { country: 'US' }
// ];

// // Call the endpoint
// yelp.query('businesses/matches/best', params)
// .then(data => {
//   // Success
//   console.log(data);
// })
// .catch(err => {
//   // Failure
//   console.log(err);
// });


//   const businesses = searchYelp(coordinates);
  
//   // Return the first business ID from the search results
//   return businesses[0].id;

// }



// Toast static API auth token: c75a2aa085d30a90308841d388fc7828f1a28e29bdd2c82150a30cf356d4d87f

/*fetch('/api/reviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    clientSecret: "",
    clientId: "",
    accessType: ""
  }),
})
  .then((res) => res.json())
  .then((data) => {
    console.log('Successful POST request:', data);
    return data;
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
  });

fetch('urlgoeshere', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'authentication': 'Bearer ' + token
  },

})
  .then((res) => res.json())
  .then((data) => {
    console.log('Successful POST request:', data);
    return data;
  })
  .catch((error) => {
    console.error('Error in POST request:', error);
  });

window.initMap = initMap;
*/