'use strict';
  // var data = {{{json locations.stringify}}}
  // console.log(data)
  var arrayData;
  var map;

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
  for(var i = 0; i < result.markers.length; i++){
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
    google.maps.event.addListener(marker, 'unclick', function () {
      this['infowindow'].close();
    });
    
  }

}

// Initialize the map, result now contains the json data 
function initMap() {
  var gliderport = {lat: 32.890128, lng:-117.251115};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: gliderport,
    disableDefaultUI: true
  });

  $.get('/json', testFunc);

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
      //pass in owner and note as well 
      var owner = document.getElementById('name')
      var noteContent = document.getElementById('note')
      console.log(owner)
      console.log(noteContent)
      console.log('before add marker')
      addMarker(results[0], owner, noteContent, resultsMap);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function addMarker(location, owner, noteContent, map) {
  var marker = new google.maps.Marker({
    position: location.geometry.location,
    map: map,
    clickable: true,
    title: document.getElementById('address').value
  });

  //IDK WHY VALUES AREN'T BEING PASSED IN 
  //var title = document.getElementById('address').value;
  //var owner = document.getElementById('name');
  console.log(owner);
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
  });

  //marker.addListener('click', viewNote(marker, infowindow, note, user, date, map));
}

function addNote(noteContent, user, marker, map) {

}

function viewNote(marker, map) {

}
