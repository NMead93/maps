(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mapApi= "AIzaSyCbJy4DRK2WFoG-NLqP7t8WwUUwhBqcEjE";

function Global() {
  this.map;
  this.city = "";
  this.lat = 0;
  this.long = 0;
  this.geocoder;
}

Global.prototype.myMap = function(){
  var center = {lat: 0, lng: 0};
  var mapProp = {
    center: center,
    zoom: 5
  };
  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
  var marker = new google.maps.Marker({
    position: center,
    map: map
  });
  this.map = map;
};

Global.prototype.getCoords = function(city){
  this.geocoder = new google.maps.Geocoder;
  var current = this;
  this.geocoder.geocode({'address': city}, function(res, status){
    if(status === "OK"){
      current.lat = res[0].geometry.location.lat();
      current.long = res[0].geometry.location.lng();
      var marker = new google.maps.Marker({
        position: {lat: current.lat, lng: current.long},
        map: current.map
      })
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
