'use strict';
// var data = {{{json locations.stringify}}}
// console.log(data)
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

  $('#altAdd').click(function() {
    $('#note-form').toggle();
    $('#welcomeText').toggle();
    /*var noteform = "<div id='note-form'><div class='form-group'>"
         + "<input id='address' type='text' class='form-control' placeholder='La Jolla Cove'>"
         + "</div>"
         + "<div class='form-group'>"
         + "<input id='note' type='textbox' class='form-control' placeholder='Type a note here'>"
         + "</div>"
         + "<input id='submitNote' type='submit' class='btn btn-primary' value='Submit'>"
         + "</div>";

    $('#welcome').append(noteform);*/
  });
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
    var content = title.bold().big() + "<br>" + date.small() + "<br>" + noteContent + "<br>" + owner.italics();
    /*marker['infowindow'] var infowindow = new google.maps.InfoWindow({
      content: title.bold().big() + "<br>" + date.small() + "<br>" + noteContent + "<br>" + owner.italics()
    });*/

    // info window commands
    /*google.maps.event.addListener(marker, 'click', function() {
      this['infowindow'].open(map, this);
    });
    //unclick might be wrong
    google.maps.event.addListener(marker, 'click', function() {
      this['infowindow'].close();
    });*/

    // new info window controls
    markerView(map, marker, infowindow, content, false);
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
  infowindow = new google.maps.InfoWindow;

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
  /*var infowindow = new google.maps.InfoWindow({
    content: location.formatted_address.bold().big() + "<br>" + date.toDateString().small() + "<br>" + noteContent + "<br>" + user.italics(),
  });*/

  // infowindow commands
  /*infowindow.open(map, marker);
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });*/

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
