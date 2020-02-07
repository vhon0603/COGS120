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

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<div id="bodyContent">'+
      '<p><b>Torrey Pines Gliderport</b><br>2800 Torrey Pines Scenic Dr,' +
      '<br>La Jolla, CA <br>92037</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: gliderport,
    map: map,
    title: 'Torrey Pines Gliderport'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
