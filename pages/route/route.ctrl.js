assignment.controller('routeCtrl', ['$scope', 'RouteFactory', '$timeout', routeCtrl]);


function routeCtrl($scope, RouteFactory, $timeout) {
    $scope.token;
    $scope.locations = {};
    $scope.me; 

    function getToken() {
        RouteFactory.Bulk.create().$promise.then((response) => {
            $scope.token = response.token;
        }, (err) => {
            getToken();
        })
    }

    $scope.displayRoute = function (locations) {
        RouteFactory.ById.get({ id: $scope.token }).$promise.then((response) => {
            if (response.status !== "success") {
                $scope.displayRoute(locations);
            } else {
                $scope.me.route();
            }
        }, (err) => {
            $scope.displayRoute(locations);
        })
    }


    getToken();



function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      mapTypeControl: false,
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
  
    new AutocompleteDirectionsHandler(map);
  }

    /**
     * @constructor
    */
    function AutocompleteDirectionsHandler(map) {
        this.map = map;
        this.originPlaceId = null;
        this.destinationPlaceId = null;
        this.travelMode = 'WALKING';
        var originInput = document.getElementById('origin-input');
        var destinationInput = document.getElementById('destination-input');
        var modeSelector = document.getElementById('mode-selector');
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);

        var originAutocomplete = new google.maps.places.Autocomplete(
            originInput, { placeIdOnly: true });
        var destinationAutocomplete = new google.maps.places.Autocomplete(
            destinationInput, { placeIdOnly: true });

        this.setupClickListener('changemode-walking', 'WALKING');
        this.setupClickListener('changemode-transit', 'TRANSIT');
        this.setupClickListener('changemode-driving', 'DRIVING');

        this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
        this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
    }

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    AutocompleteDirectionsHandler.prototype.setupClickListener = function (id, mode) {
        var radioButton = document.getElementById(id);
        $scope.me = this;
        radioButton.addEventListener('click', function () {
            $scope.me.travelMode = mode;
            $scope.me.route();
        });
    };

    AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {
        $scope.me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.place_id) {
                window.alert("Please select an option from the dropdown list.");
                return;
            }
            if (mode === 'ORIG') {
                $scope.me.originPlaceId = place.place_id;
            } else {
                $scope.me.destinationPlaceId = place.place_id;
            }
        });

    };

    AutocompleteDirectionsHandler.prototype.route = function () {
        if (!this.originPlaceId || !this.destinationPlaceId) {
            return;
        }
        $scope.me = this;
        this.directionsService.route({
            origin: { 'placeId': this.originPlaceId },
            destination: { 'placeId': this.destinationPlaceId },
            travelMode: this.travelMode,
        }, function (response, status) {
            if (status == 'OK') {
            $scope.me.directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };


    $timeout(function () {
        initMap();
    }, 1000);



}