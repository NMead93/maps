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
