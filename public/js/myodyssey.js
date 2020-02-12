'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

	/*$("h3").click(function(e) {
		e.preventDefault();
		var name = $(this).text();
		$(this).text(anagrammedName(name));
	});*/
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
}

// When the user clicks the marker, an info window opens.
function initMap() {
  var gliderport = {lat: 32.890128, lng:-117.251115};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: gliderport,
    disableDefaultUI: true
  });

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
  var infowindow = new google.maps.InfoWindow({
    content: title + '<br>' + address
  });

  infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
