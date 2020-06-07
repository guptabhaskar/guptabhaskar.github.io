//GeoIQ
//apikey="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJndXB0YWJoYW51MTk5OUBnbWFpbC5jb20ifQ.kE6dbqkrarNLFUTDTLlRPvcqtJ8mxSd6TrgvjwqjpGU"

//Geocoding
//apiKey="AIzaSyB3kAwioi5Adu1oBvr-tYIxKub_DkJ4Lx8"

var x = document.getElementById("demo");
var modal1=document.getElementById("modal1");
var modal2=document.getElementById("modal2");
var span1 = document.getElementById("close1");
var span2 = document.getElementById("close2");
var modal1Content = document.getElementById("modal1Content");
var ContainmentZones = document.getElementById("ContainmentZones");
var current=document.getElementById("current");
var button=document.getElementById("submit");
var apikey="AIzaSyB3kAwioi5Adu1oBvr-tYIxKub_DkJ4Lx8";

var latitude;
var longitude;
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findContainment);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function findContainment(position) {
	// x.innerHTML = "Latitude: " + position.coords.latitude +
	// "<br>Longitude: " + position.coords.longitude;
	latitude=position.coords.latitude;
	longitude=position.coords.longitude;
	console.log(latitude,longitude);
	var apiurl="https://data.geoiq.io/dataapis/v1.0/covid/nearbyzones";
	var object={
	  "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJndXB0YWJoYW51MTk5OUBnbWFpbC5jb20ifQ.kE6dbqkrarNLFUTDTLlRPvcqtJ8mxSd6TrgvjwqjpGU",
	  "lng": longitude,
	  "lat": latitude,
	  "radius": 5000
	}

	// Making a POST request using an axios instance from a connected library
	axios.post(apiurl,object)
	  // Handle a successful response from the server
	  .then(response => {
	          // Getting a data object from response that contains the necessary data from the server
	          const data = response.data;
	          if(data.numberOfNearbyZones>0){
	          	nearContainmentZone(data);
	          }
	          else{
	          	notNearContainmentZone();
	          }
	          // console.log(typeof data);
	          // console.log("Data1",data.containmentZoneNames);
	          // console.log(data.containmentZoneNames.length);
	  })
	  // Catch and print errors if any
	  .catch(error => console.error('Error', error));
}

function findContainment1(latitude,longitude) {
	var apiurl="https://data.geoiq.io/dataapis/v1.0/covid/nearbyzones";
	var object={
	  "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJndXB0YWJoYW51MTk5OUBnbWFpbC5jb20ifQ.kE6dbqkrarNLFUTDTLlRPvcqtJ8mxSd6TrgvjwqjpGU",
	  "lng": longitude,
	  "lat": latitude,
	  "radius": 5000
	}
	// Making a POST request using an axios instance from a connected library
	axios.post(apiurl,object)
	  // Handle a successful response from the server
	  .then(response => {
	          // Getting a data object from response that contains the necessary data from the server
	          const data = response.data;
	          if(data.numberOfNearbyZones>0){
	          	nearContainmentZone(data);
	          }
	          else{
	          	notNearContainmentZone();
	          }
	          // console.log("data",data);
	          // console.log(data.containmentZoneNames.length);
	  })
	  // Catch and print errors if any
	  .catch(error => console.error('Error', error));
}

function nearContainmentZone(data){
	data.containmentZoneNames.forEach(function(zoneName){
		ContainmentZones.innerHTML+="<li>"+zoneName+"</li>";
	});
	modal1.style.display="block";
}

function notNearContainmentZone(){
	modal2.style.display="block";
}

span1.onclick = function() {
  modal1.style.display = "none";
}
span2.onclick = function() {
  modal2.style.display = "none";
}

current.onclick=function(){
	getLocation();
}

button.onclick=function(){
	var address=document.getElementById("address").value;
	var platform = new H.service.Platform({
	'apikey': apiKey
	});

	// Get an instance of the geocoding service:
	var service = platform.getSearchService();

	// Call the geocode method with the geocoding parameters,
	// the callback and an error callback function (called if a
	// communication error occurs):
	service.geocode({
	q: address
	}, (result) => {
	// Add a marker for each location found
	console.log(result);
	// result.items.forEach((item) => {
	// map.addObject(new H.map.Marker(item.position));
	// });
	}, alert);
	// var googleapi=apistart+address+apiend;
	// // var object={
	// //   "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJndXB0YWJoYW51MTk5OUBnbWFpbC5jb20ifQ.kE6dbqkrarNLFUTDTLlRPvcqtJ8mxSd6TrgvjwqjpGU",
	// //   "lng": longitude,
	// //   "lat": latitude,
	// //   "radius": 5000
	// // }
	// // Making a POST request using an axios instance from a connected library
	// axios.post(googleapi)
	//   // Handle a successful response from the server
	//   .then(response => {
	//           // Getting a data object from response that contains the necessary data from the server
	//           const data = response.data;
	//           if(data.results.length==0)
	//           {
	//           	alert("Address not found.")
	//           }
	//           else
	//           {
	//           	// console.log(data.results);
	//           	latitude=data.results[0].geometry.location.lat;
	//           	longitude=data.results[0].geometry.location.lng;
	//           	findContainment1(latitude,longitude);
	//           }
	//           // console.log("Data2",data.results[0].geometry.location.lat);
	//           // console.log("Data2",data.results[0].geometry.location.lng);
	//           // console.log(data.containmentZoneNames.length);
	//   })
	//   // Catch and print errors if any
	//   .catch(error => console.error('Error', error));
	// // getLocation();
}

window.onclick = function(event) {
  if (event.target == modal1 || event.target == modal2) {
    modal1.style.display = "none";
    modal2.style.display = "none";
  }
}
