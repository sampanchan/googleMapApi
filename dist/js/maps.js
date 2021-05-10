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
      evt.preventDefault();
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
      console.log('handle result search ok');

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('got results', results); //list container

        var listContainer = document.createElement('div');
        listContainer.setAttribute('class', 'business-container');
        var classResults = document.querySelector('.classResults');
        classResults.appendChild(listContainer);
        console.log('listcontainercreated'); // markers = [];

        var _loop = function _loop(i) {
          var business = results[i];
          var lat = business.geometry.location.lat();
          var lng = business.geometry.location.lng();
          var position = {
            lat: lat,
            lng: lng
          };
          var name = business.name;
          var address = business.formatted_address; // const hours = business.opening_hours.isOpen(name); // hours?
          // phone#
          // const number = business.getPhoneNumber();

          var icon = business.icon;
          var image = business.photos[0].getUrl();
          var rating = business.rating;
          var url = business.photos[0].html_attributions; // list item

          var businessItemEl = document.createElement('div');
          businessItemEl.setAttribute('class', 'business-item');
          listContainer.appendChild(businessItemEl);
          console.log('businessitemcreated'); // Name

          var nameEl = document.createElement('h2'); // businessItemEl.setAttribute('class', 'name-item');

          businessItemEl.appendChild(nameEl);
          nameEl.textContent = name; // address

          var addressEl = document.createElement('p'); // listContainer.setAttribute('class', 'address-p');

          listContainer.appendChild(addressEl);
          addressEl.textContent = address; //image works

          var imageEl = document.createElement('img');
          businessItemEl.appendChild(imageEl);
          imageEl.setAttribute('src', image); //rating

          var ratingEl = document.createElement('p');
          businessItemEl.appendChild(ratingEl);
          ratingEl.textContent = rating + "/5"; //marker
          // let map;

          var marker = new google.maps.Marker({
            position: position,
            map: _this.map,
            title: 'the circus' // label: 'the creative circus',
            // draggable: true,

          }); // markers.push(marker);

          var infoWindowContent = "<div><img src=".concat(business.icon, " atl=\"\" width=\"20px\" height=\"20px\"></div>\n                                            <div>\n                                            <h3>").concat(business.name, "</h3>\n                                            <p>").concat(business.formatted_address, "</p>\n                                            \n                                            <p>").concat(business.opening_hours.isOpen(name), "</p>\n                                            <img src=").concat(business.photos[0].getUrl(), " atl=\" width=\"50px\" height=\"50px\">\n                                            <p> rating: ").concat(business.rating, "/5</p>\n                                            </div> ");
          var infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent
          });
          marker.addListener('click', function () {
            infoWindow.open(_this.map, marker);
          });
        };

        for (var i = 0; i < results.length; i++) {
          _loop(i);
        } //  ASK GREG
        // function setMpOnAll(map){
        //     for (let i = 0; i < markers.length; i++) {
        //         markers[i].setMap(map);
        //       }
        // }
        // function showMarkers() {
        //     setMapOnAll(map);
        //   }
        //   function deleteMarkers() {
        //     clearMarkers();
        //     markers = [];
        //   }

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
        zoom: 15
      };
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var image = "/dist/img/tent.png";
      var marker = new google.maps.Marker({
        position: theCircus,
        map: this.map,
        title: 'the circus',
        icon: image // label: 'the creative circus',
        // draggable: true,

      });
      var infoWindowContent = "<div><h2>Join the Circus!!</h2><p> A place where you leave your worries behind and make new stress factors</p></div>";
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
