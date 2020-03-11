'use strict';

var arrayData;
var map;
var autocomplete;
var places;
var refResult;
var infowindow;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
  initializePage();
})

/*
 * Function that is called when the document is ready.
 * Handles google analytics.
 */
function initializePage() {
  console.log("Javascript connected!");

  $('#altAdd').click(function() {
    $('#note-form').toggle();
    $('#welcomeText').toggle();
    ga('create', 'UA-159852180-1', 'auto');
    ga('require', 'GTM-MBPFPSX');
    ga('send', 'event', 'altAdd', 'click');
  });

  $('#add').click(function() {
    ga('create', 'UA-159852180-1', 'auto');
    ga('require', 'GTM-MBPFPSX');
    ga('send', 'event', 'add', 'click');
  });
}

/*
 * Parses the JSON.
 */
function parseJson(result) {
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
    var content = title.bold().big() + "<br>" + date.small() + "<br>" + noteContent + "<br>" + owner.italics();

    // new info window controls
    markerView(map, marker, infowindow, content, false);
  }
}

// initialize the map, result now contains the json data
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
  infowindow = new google.maps.InfoWindow;

  $.get('/json', parseJson);
  var geocoder = new google.maps.Geocoder();

  $("#submitNote").click(function() {
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
      addMarker(results[0], resultsMap);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location.geometry.location,
    map: map,
    clickable: true,
    title: document.getElementById('address').value
  });

  var date = new Date();
  var user = document.getElementById('userName').innerHTML;
  var noteContent = $("#note").val();
  var content = location.formatted_address.bold().big() + "<br>" + date.toDateString().small() + "<br>" + noteContent + "<br>" + user.italics();

  // new info window controls
  markerView(map, marker, infowindow, content, true);

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
}

// handles opening and closing info windows on markers
function markerView(map, marker, infowindow, content, isNew) {
  if (isNew) {
    infowindow.setContent(content);
    infowindow.open(map, marker);
    marker.open = true;
  }
  google.maps.event.addListener(marker, 'click', function() {
    if (!marker.open) {
      infowindow.setContent(content);
      infowindow.open(map, marker);
      marker.open = true;
    } else {
      infowindow.close();
      marker.open = false;
    }
    google.maps.event.addListener(map, 'click', function() {
      infowindow.close();
      marker.open = false;
    });
  });
}
