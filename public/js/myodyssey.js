'use strict';
  // var data = {{{json locations.stringify}}}
  // console.log(data)
  var arrayData = [];

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
  console.log(document.getElementById("test").textContent)
	/*$("h3").click(function(e) {
		e.preventDefault();
		var name = $(this).text();
		$(this).text(anagrammedName(name));
	});*/
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
  $.get('/json', testFunc);
}

function testFunc(result) {
  console.log("testFunc")
  for(var i in result.markers) {
      arrayData.push([i, result.markers[i]]);
  }

}

// Initialize the map, result now contains the json data 
function initMap() {
  console.log("initMap")
  console.log(arrayData)

  var gliderport = {lat: 32.890128, lng:-117.251115};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: gliderport,
    disableDefaultUI: true
  });1



	/*$.getJSON(json, function(json1) {
    $.each(json1, function(key, data) {
        var latLng = new google.maps.LatLng(data.lat, data.long);
        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: data.title
        });
    });
});*/

  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status == 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      addMarker(results[0], resultsMap);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location.geometry.location,
    map: map
  });

  var title = document.getElementById('address').value;
  var address = location.formatted_address;
  var addressPopup = new google.maps.InfoWindow({
    content: '<b>' + title + '</b><br>' + address
  });

	addNote("Test note", "Shauna", marker, map);

  addressPopup.open(map, marker);

  marker.addListener('click', viewNote(marker, infowindow, note, user, date, map));
}

function addNote(noteContent, user, marker, map) {

}

function viewNote(marker, map) {

}
