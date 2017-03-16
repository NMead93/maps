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
