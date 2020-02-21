'use strict';
// var data = {{{json locations.stringify}}}
// console.log(data)
var arrayData;
var map;
var autocomplete;
var places;
var refResult;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

//wizard of oz login
/*function populateName(){
	var x = document.getElementByID('name').value;
	document.getElementbyID('try') = x;
}*/


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
  console.log("Javascript connected!");
}

/*PARSES THE JSON*/
function testFunc(result) {
  refResult = result;
  for (var i = 0; i < result.markers.length; i++) {
    //get the actual marker
    var x = result.markers[i].coordinatesX;
    var y = parseFloat(result.markers[i].coordinatesY);
    var resultLocation = new google.maps.LatLng(x, y);
    var marker = new google.maps.Marker({
      position: resultLocation,
      map: map,
      title: result.markers[i].title,
      clickable: true
    })

    //info window content
    var title = result.markers[i].title
    var date = result.markers[i].date
    var noteContent = result.markers[i].noteContent
    var owner = result.markers[i].person
    marker['infowindow'] = new google.maps.InfoWindow({
      content: title.bold().big() + "<br>" + date.small() + "<br>" + noteContent + "<br>" + owner.italics()
    });

    //info window commands
    google.maps.event.addListener(marker, 'click', function() {
      this['infowindow'].open(map, this);
    });
    //unclick might be wrong
    google.maps.event.addListener(marker, 'unclick', function() {
      this['infowindow'].close();
    });
  }
}

// Initialize the map, result now contains the json data
function initMap() {
  var gliderport = {
    lat: 32.890128,
    lng: -117.251115
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: gliderport,
    disableDefaultUI: true
  });

  var addressInput = document.getElementById('address');
  autocomplete = new google.maps.places.Autocomplete(addressInput);
  places = new google.maps.places.PlacesService(map);

  $.get('/json', testFunc);
  var geocoder = new google.maps.Geocoder();

  /*document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });*/
  $("#submitNote").click(function() {
    //getAddress(autocomplete, map);
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      //pass in owner and note as well
      var owner = document.getElementById('name');
      var noteContent = document.getElementById('note');
      //addMarker(results[0], owner, noteContent, resultsMap);
      addMarker(results[0], resultsMap);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function getAddress(autocomplete, map) {

}

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location.geometry.location,
    map: map,
    clickable: true,
    title: document.getElementById('address').value
  });
  // console.log("PRINTING LOCATION")
  // console.log(typeof location.geometry.location);
  var date = new Date();
  var user = document.getElementById('userName').innerHTML;
  var noteContent = $("#note").val();
  var infowindow = new google.maps.InfoWindow({
    content: location.formatted_address.bold().big() + "<br>" + date.toDateString().small() + "<br>" + noteContent + "<br>" + user.italics(),
  });

  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  var objectToAdd = {
    "title": location.formatted_address,
    "coordinatesX": location.geometry.location.lat,
    "coordinatesY": location.geometry.location.lng,
    "address": location.formatted_address,
    "person": user,
    "date": date.toDateString(),
    "noteContent": noteContent
  }

  refResult.markers.push(objectToAdd)
  $.post('/json', refResult, function(res) {
    console.log(res)
  });


  /*refResult.markers.push(objectToAdd);
  refResult = JSON.stringify(refResult)

  fs.writeFile("./sample.txt", fileContent, (err) => {
  if (err) {
      console.error(err);
      return;
  };
  console.log("File has been created");
});*/


  //IDK WHY VALUES AREN'T BEING PASSED IN
  //var title = document.getElementById('address').value;
  //var owner = document.getElementById('name');
  /*console.log(owner);
  var date = "1 minute ago";
  //var noteContent = document.getElementById('note');
  console.log(noteContent);

  var address = location.formatted_address;

  marker['infowindow'] = new google.maps.InfoWindow({
    content: address.bold().big() + "<br>" + date.small() + "<br>" + noteContent + "<br>" + owner.italics()
  });

	//addNote("Test note", "Shauna", marker, map);
  addressPopup.open(map, marker);

  //info window commands
  google.maps.event.addListener(marker, 'click', function() {
    this['infowindow'].open(map, this);
  });
  //unclick might be wrong
  google.maps.event.addListener(marker, 'unclick', function () {
    this['infowindow'].close();
  });*/

  //marker.addListener('click', viewNote(marker, infowindow, note, user, date, map));
}

function addNote(noteContent, user, marker, map) {

}

function viewNote(marker, map) {

}
