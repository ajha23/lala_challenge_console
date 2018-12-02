// // This example requires the Places library. Include the libraries=places
// // parameter when you first load the API. For example:
// // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

// // function initMap() {
// //     var map = new google.maps.Map(document.getElementById('map'), {
// //       mapTypeControl: false,
// //       center: {lat: -33.8688, lng: 151.2195},
// //       zoom: 13
// //     });
  
// //     new AutocompleteDirectionsHandler(map);
// //   }
  
//    /**
//     * @constructor
//    */
//   function AutocompleteDirectionsHandler(map) {
//     this.map = map;
//     this.originPlaceId = null;
//     this.destinationPlaceId = null;
//     this.travelMode = 'WALKING';
//     var originInput = document.getElementById('origin-input');
//     var destinationInput = document.getElementById('destination-input');
//     var modeSelector = document.getElementById('mode-selector');
//     this.directionsService = new google.maps.DirectionsService;
//     this.directionsDisplay = new google.maps.DirectionsRenderer;
//     this.directionsDisplay.setMap(map);
  
//     var originAutocomplete = new google.maps.places.Autocomplete(
//         originInput, {placeIdOnly: true});
//     var destinationAutocomplete = new google.maps.places.Autocomplete(
//         destinationInput, {placeIdOnly: true});
  
//     this.setupClickListener('changemode-walking', 'WALKING');
//     this.setupClickListener('changemode-transit', 'TRANSIT');
//     this.setupClickListener('changemode-driving', 'DRIVING');
  
//     this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
//     this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
  
//     this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
//     this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
//     this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
//   }
  
//   // Sets a listener on a radio button to change the filter type on Places
//   // Autocomplete.
//   AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
//     var radioButton = document.getElementById(id);
//     var me = this;
//     radioButton.addEventListener('click', function() {
//       me.travelMode = mode;
//       me.route();
//     });
//   };
  
//   AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
//     var me = this;
//     autocomplete.bindTo('bounds', this.map);
//     autocomplete.addListener('place_changed', function() {
//       var place = autocomplete.getPlace();
//       if (!place.place_id) {
//         window.alert("Please select an option from the dropdown list.");
//         return;
//       }
//       if (mode === 'ORIG') {
//         me.originPlaceId = place.place_id;
//       } else {
//         me.destinationPlaceId = place.place_id;
//       }
//     //   me.route();
//     });
  
//   };
  
//   AutocompleteDirectionsHandler.prototype.route = function() {
//     if (!this.originPlaceId || !this.destinationPlaceId) {
//       return;
//     }
//     var me = this;
//     var waypts = [];
//     waypts.push({
//           location: {lat: 12.9590167, lng: 77.7064937},
//           stopover: true
//         },{
//           location: {lat: 12.9600167, lng: 77.7364937},
//           stopover: true
//         });
        
//     this.directionsService.route({
//         origin: {'placeId': this.originPlaceId},
//         destination: {'placeId': this.destinationPlaceId},
//         travelMode: this.travelMode,
//         waypoints: waypts
//     }, function(response, status) {
//       if (status == 'OK') {
//         me.directionsDisplay.setDirections(response);
//       } else {
//         window.alert('Directions request failed due to ' + status);
//       }
//     });
//   };


//   var directionsService;
//   var MapPoints;
//   var directionsDisplay;
// function initMap() {
//     var MapPoints = '[{"address":{"address":"plac Grzybowski, Warszawa, Polska","lat":"52.2360592","lng":"21.002903599999968"},"title":"Warszawa"},{"address":{"address":"Jana Paw\u0142a II, Warszawa, Polska","lat":"52.2179967","lng":"21.222655600000053"},"title":"Wroc\u0142aw"},{"address":{"address":"Wawelska, Warszawa, Polska","lat":"52.2166692","lng":"20.993677599999955"},"title":"O\u015bwi\u0119cim"}]';

//     var MY_MAPTYPE_ID = 'custom_style';
//      directionsService = new google.maps.DirectionsService();
//     var map;
    
//     // new google.maps.Map(document.getElementById('map'), {
//     //     mapTypeControl: false,
//     //     center: {lat: -33.8688, lng: 151.2195},
//     //     zoom: 13
//     //   });
//     directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});

//     // if (jQuery('#map').length > 0) {

//         var locations = JSON.parse(MapPoints);

//         map = new google.maps.Map(document.getElementById('map'), {
//             mapTypeId: google.maps.MapTypeId.ROADMAP,
//             scrollwheel: false
//         });
//         directionsDisplay.setMap(map);
        
//         var infowindow = new google.maps.InfoWindow();
//         var flightPlanCoordinates = [];
//         var bounds = new google.maps.LatLngBounds();

//         for (i = 0; i < locations.length; i++) {
//             marker = new google.maps.Marker({
//                 position: new google.maps.LatLng(locations[i].address.lat, locations[i].address.lng),
//                 map: map
//             });
//             flightPlanCoordinates.push(marker.getPosition());
//             bounds.extend(marker.position);

//             google.maps.event.addListener(marker, 'click', (function (marker, i) {
//                 return function () {
//                     infowindow.setContent(locations[i]['title']);
//                     infowindow.open(map, marker);
//                 }
//             })(marker, i));
//         }

//         map.fitBounds(bounds);
//         /* polyline
//             var flightPath = new google.maps.Polyline({
//                 map: map,
//                 path: flightPlanCoordinates,
//                 strokeColor: "#FF0000",
//                 strokeOpacity: 1.0,
//                 strokeWeight: 2
//             });
// */
//         // directions service
//         var start = flightPlanCoordinates[0];
//         var end = flightPlanCoordinates[flightPlanCoordinates.length - 1];
//         var waypts = [];
//         for (var i = 1; i < flightPlanCoordinates.length - 1; i++) {
//             waypts.push({
//                 location: flightPlanCoordinates[i],
//                 stopover: true
//             });
//         }
//         calcRoute(start, end, waypts);
//         new AutocompleteDirectionsHandler(map);
//     // }
// }

// function calcRoute(start, end, waypts) {
//     var request = {
//         origin: start,
//         destination: end,
//         waypoints: waypts,
//         optimizeWaypoints: true,
//         travelMode: google.maps.TravelMode.DRIVING
//     };
//     directionsService.route(request, function (response, status) {
//         if (status == google.maps.DirectionsStatus.OK) {
//             directionsDisplay.setDirections(response);
//             var route = response.routes[0];
//             var summaryPanel = document.getElementById('directions_panel');
//             summaryPanel.innerHTML = '';
//             // For each route, display summary information.
//             for (var i = 0; i < route.legs.length; i++) {
//                 var routeSegment = i + 1;
//                 summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
//                 summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//                 summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//                 summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
//             }
//         }
//     });
// }