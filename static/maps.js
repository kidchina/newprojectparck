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
    zoom: 12,
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
    <div class="col-lg-8 post-list">
      <div class="single-post d-flex flex-row ${address || rating || (duration && distance) ? 'expandable' : ''}">
        <div class="thumb">
          <img src="${photoUrl}" alt=""/>
        </div>
        <div class="details">
          <div class="title d-flex flex-row justify-content-between">
            <div class="titles">
              <a href="single.html"><h4>${name}</h4></a>
            </div>
          </div>
          <div class="ele">
            ${address ? `<div class="pik"><span class="address">${address}</span></div>` : ''}
            ${rating ? `<div class="pik"><span class="rate">${getRatingStars(rating)}</span></div>` : ''}
            ${duration && distance ? `<div class="pik"><span><i class="fa-solid fa-person-walking"style="color: #558dec;"></i>  ${duration}</span><span>(${distance})</span></div>` : ''}





          </div>
        </div>
      </div>
    </div>
    <style>
      /* Customize the style of the card below */
      .col-lg-8 {
        /* Add styles for the col-lg-8 container if needed */
      }
  
      .post-list {
        width: 100%; /* Adjust the width as needed */
        display: flex;
        flex-direction: column;
      }
  
      .single-post {
        width: 184%; /* Adjust the width as needed */
        display: flex;
        flex-direction: row;
        margin-bottom: 20px; /* Add spacing between posts */
        border: 1px solid #ccc; /* Optional border style */
        border-radius: 5px; /* Optional border radius */
        padding: 10px; /* Optional padding */
        height: 5cm;
        margin-left: -1cm;
        overflow: hidden; /* Hide any overflow content */
      }
  
      .single-post.expandable {
        height: auto;
        margin-top : -28PX ;/* Allow the card with long content to expand */
        background-color: white;
      }
      .single-post.expandable:hover {
        transform: translateY(-5px);
        box-shadow: 0px 0px 40px 0px rgba(132, 144, 255, 0.4);
        transition: transform 0.3s;
    }
  
      .thumb {
        flex: 0 0 30%; /* Adjust the width of the image area */
        padding: 5px; /* Optional spacing around the image */
      }
  
      .thumb img {
        width: 100%; /* Make sure the image occupies the entire area */
        height: 2cm;
        border-radius: 5px; /* Optional border radius for the image */
      }
  
      .details {
        flex: 1; /* Let the details area fill the remaining space */
        padding: 7px; /* Optional padding inside the details area */
      }
  
      .title {
        margin-bottom: 3px;
      }
  
      .title h4 {
        margin: 0;
      }
  
      .rate {
        margin-top: -0.5cm;
      }
      
      .rate {
        font-size: 1.2rem; /* Adjust the font size as needed */
        color: gold; /* Set the color of the stars */
      }
  
      .koila {
        margin-top: -0.5cm;
      }
  
      .ele {
        margin-top: 0.2cm;
        display: flex;
        flex-direction: column;
      }
  
      .element-container {
        display: flex;
        flex-wrap: wrap;
      }
  
      .pik {
       
        align-items: center;
        margin-right: 20px; /* Adjust spacing between elements */
        margin-bottom: 0px;
        display: flex;
   
      /* Adjust spacing between lines */
      }
  
      label {
        margin-right: 10px;
        font-weight: bold;
      }
  
      span {
        margin-right: 5px;
      }
  
      h4 {
        margin: 0;
      }
  
      .lnr {
        display: inline-block;
        margin-right: 5px;
        font-size: 1rem;
      }
  
      .address {
        min-width: 0; /* Allow the address to shrink if too long */
        white-space: normal; /* Allow the address to wrap to a new line */
        word-break: break-word; /* Break the address into multiple lines */
        margin-top: 1px; /* Adjust spacing between the address and other elements */
      }
  
      /* Add more styles as needed to fine-tune the appearance of the card */
    </style>`;







  
  




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
 