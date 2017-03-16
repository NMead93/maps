(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mapApi= "AIzaSyCbJy4DRK2WFoG-NLqP7t8WwUUwhBqcEjE";

function Global() {
  this.map;
  this.city = "";
  this.lat = 0;
  this.long = 0;
  this.geocoder;
  this.infowindow;
}

Global.prototype.myMap = function(){
  var center = {lat: 0, lng: 0};
  var mapProp = {
    center: center,
    zoom: 5,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
      'styled_map']
    }
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var marker = new google.maps.Marker({
    position: center,
    map: map
  });

  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#263c3f"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6b9a76"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#38414e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#212a37"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9ca5b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#1f2835"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#f3d19c"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2f3948"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#d59563"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#515c6d"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#17263c"
          }
        ]
      }
    ],
    {name: 'Styled Map'});

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
    map.addListener('center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });
    this.map = map;
  };

  Global.prototype.getCoords = function(city){
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
    var current = this;
    this.geocoder.geocode({'address': city}, function(res, status){
      if(status === "OK"){
        current.lat = res[0].geometry.location.lat();
        current.long = res[0].geometry.location.lng();
        var marker = new google.maps.Marker({
          position: {lat: current.lat, lng: current.long},
          map: current.map
        })
        current.map.setCenter(marker.getPosition());
        current.infowindow.setContent(res[0].formatted_address);
        current.infowindow.open(current.map, marker);
        console.log(current.lat, current.long);
      }
      else{
        console.log('broken as shit');
      }
    });
  }


  exports.Global = Global;

},{}],2:[function(require,module,exports){
var Global = require("./../js/map.js").Global;

$(document).ready(function(){
  newWorld = new Global();
  newWorld.myMap();
  console.log("Hello");
  $("#location").submit(function(event) {
    event.preventDefault();
    newWorld.getCoords($('#city').val());
  })
});


// function myMap() {
//   var center = {lat: 0, lng: 0};
//   var mapProp = {
//     center: center,
//     zoom:5,
//   };
//   var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
//   var marker = new google.maps.Marker({
//     position: center,
//     map: map
//   });
// }

},{"./../js/map.js":1}]},{},[2]);
