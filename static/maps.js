var urlParams = new URLSearchParams(window.location.search);
var la = parseFloat(urlParams.get('latitude'));
var lo = parseFloat(urlParams.get('longitude'));
console.log(la); // Check the value of la
console.log(lo); //
var map;
var markers = [];
var myLatLng ;

function initMap() {
  // Specify the coordinates for the center of the map
  var myLatLng = { lat: la, lng: lo};
  // Create a new map instance
    map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 14.5,
    styles: [
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]
  });
  
  // Add a marker to the map
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "My Location"
  });
  
}



window.onload = function(){

  var customIicon = {

    size: new google.maps.Size(20, 20), // Set the dimensions of the icon
    origin: new google.maps.Point(0, 0), // Set the origin of the icon (usually top-left)
    anchor: new google.maps.Point(16, 32) // Set the anchor point of the icon (usually centered bottom)
  };

  function getRatingStars(rating) {
    var stars = '';
    for (var i = 0; i < rating; i++) {
      stars += '<span class="star" style="color: #FFD300;">&#9733;</span>' // Filled star
    }
    for (var j = rating; j < 5; j++) {
      stars += '&#9734;'; // Empty star
    }
    return stars;
  }

function createMarker(place, duration, distance){
    
    var table = document.getElementById('placesdiv');
    var place_id = place.place_id ; 
    var photoUrl;
    var name = place.name; 
    var rating = place.rating ; 
    var address = place.vicinity;
    findDistanceAndDuration(place.vicinity);
    //console.log(place);
    if(place.photos){
       photoUrl = place.photos[0].getUrl();
      //let cell2 = row.insertCell(0);
    }
    else{
       photoUrl = "https://via.placeholder.com/150"; 
     
    }// ${rating}
    var editUrl = `http://127.0.0.1:8000/landingparck/parking_detail?id=${place_id}&img=${photoUrl}`;
    var card = `
    <div class="card">
      <div class="details">
        <img class="kdachi" src="${photoUrl}" alt="Image" />
        <div class="title d-flex flex-row justify-content-between">
          <div class="titles">
            <a href="single.html"><h4>${name}</h4></a>
          </div>
          <ul class="btns">
            <li><a href="#"><span class="lnr lnr-heart"></span></a></li>
            <li><a href="#"></a></li>
          </ul>
        </div>
        <p>
          ${getRatingStars(rating)}
        </p>
        <h5>${address}</h5>
        <p class="address"><span class="lnr lnr-map"></span> ${duration}</p>
        <p class="address"><span class="lnr lnr-database"></span> ${distance}</p>
      </div>
    </div>
    <style>
  .card {
    width: 7cm;
    height: 4cm;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
    margin: 5px;
  }

  .card img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .title {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .title h4 {
    margin: 0;
  }

  .btns {
    list-style: none;
    padding: 0;
    display: flex;
  }

  .btns li {
    margin-right: 5px;
  }

  .address {
    margin: 0;
  }

  .lnr {
    display: inline-block;
    margin-right: 5px;
    font-size: 1rem;
  }

  /* Add more styles as needed to fine-tune the appearance of the card */
</style>
  `;
   table.innerHTML+=card;

  var customIcon = {
      url: 'https://img.icons8.com/nolan/x/marker.png',
      scaledSize: new google.maps.Size(32, 32), // Set the desired dimensions of the icon
    };
  var marker= new google.maps.Marker({
    position: place.geometry.location,
    map: map,
    icon:customIcon

  })
  google.maps.Map.prototype.clearOverlays = function(){
    for(var i=0; i < markers.length; i++){
      markers[i].setMap(null);
    }
    markers.length = 0;
  }
  
  google.maps.event.addListener(marker,"click",function(){});
  
  
  map.clearOverlays();
}


function searchNearbyParking(map, location) {
  const request = {
    location: location,
    radius: 10000,
    types: ['parking'],
    
  };

  const service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      findDistanceAndDuration(results);
    console.log(results);
      
      }
      
    });
    
  }
  const loca = new google.maps.LatLng(la,lo);
  searchNearbyParking(map, loca);
 
 
  function findDistanceAndDuration(results) {
    var origin1 = new google.maps.LatLng(la, lo);
    for (var i = 0; i < results.length; i++) {
      (function (index) {
        var destinationA = results[index].vicinity;
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1],
            destinations: [destinationA],
            travelMode: 'DRIVING',
            avoidHighways: false,
            avoidTolls: false,
          },
          function (response, status) {
            createMarker(results[index], response.rows[0].elements[0].duration.text, response.rows[0].elements[0].distance.text);
          }
        );
      })(i);
    }
  }
  
  
}
 