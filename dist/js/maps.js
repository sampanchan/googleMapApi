"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GoogleMapApi = /*#__PURE__*/function () {
  function GoogleMapApi() {
    var _this = this;

    _classCallCheck(this, GoogleMapApi);

    _defineProperty(this, "API_KEY", 'AIzaSyBN8YgsGRhmpj0vSQlLl5EViZa3MGbrjr8');

    _defineProperty(this, "handlePlaceSearch", function (evt) {
      console.log('handle place search ok');
      var placeName = document.querySelector('#place').value;
      var placeRequest = {
        location: _this.map.getCenter(),
        radius: 50,
        query: placeName
      };
      _this.service = new google.maps.places.PlacesService(_this.map);

      _this.service.textSearch(placeRequest, _this.handlePlaceResults);
    });

    _defineProperty(this, "handlePlaceResults", function (results, status) {
      evt.preventDefault();

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('got results', results);
      }
    });
  }

  _createClass(GoogleMapApi, [{
    key: "init",
    value: function init() {
      console.log('google map init');
      var form = document.querySelector('form[name="place_search"]');
      form.addEventListener('submit', this.handlePlaceSearch);
    }
  }, {
    key: "ready",
    value: function ready() {
      var _this2 = this;

      console.log('map is ready');
      var theCircus = {
        lat: 33.81328,
        lng: -84.36175
      };
      var mapOptions = {
        center: theCircus,
        zoom: 18
      };
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var marker = new google.maps.Marker({
        position: theCircus,
        map: this.map,
        title: 'the circus' // label: 'the creative circus',
        // draggable: true,

      });
      var infoWindowContent = "<div><h2>Hi Circus</h2><p> I am at a place in the boonies</p></div>";
      var infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      });
      marker.addListener('click', function () {
        infoWindow.open(_this2.map, marker);
      });
    }
  }]);

  return GoogleMapApi;
}();

window.gMap = new GoogleMapApi();
window.gMap.init();
//# sourceMappingURL=maps.js.map
