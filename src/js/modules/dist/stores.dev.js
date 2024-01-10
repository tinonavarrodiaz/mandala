"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStoreList = void 0;

var _isMobile = require("./isMobile");

var _initialVariables = require("./initialVariables");

var storeListDraw = function storeListDraw(stores) {
  var storeFragment = _initialVariables.d.createDocumentFragment();

  var ul = document.createElement('ul');
  ul.className = "storesList";
  stores.map(function (el) {
    var li = document.createElement('li');
    li.innerText = "".concat(el.LocationName);
    li.dataset.store = el.LocationName;
    li.dataset.address = el.Address1;
    li.dataset.city = el.City;
    li.dataset.state = el.State;
    li.dataset.zip = el.Zip;
    ul.appendChild(li);
  });
  storeFragment.appendChild(ul);
  (0, _initialVariables.id)('listStore').appendChild(storeFragment);
  var firsLi = (0, _initialVariables.q)('.storesList li');

  _initialVariables.c.log(firsLi); // c.log([...id('listStore')].querySelectorAll('li'))
  // map(20.6566565, -103.3908839)


  listAction(ul);
  firsLi.click();
  search(Array.from((0, _initialVariables.all)('.storesList li')));
};

var search = function search(storeList) {
  var inputSearch = (0, _initialVariables.id)('inputSearch');
  var buttonSearch = (0, _initialVariables.id)('buttonSearch');
  inputSearch.addEventListener('keyup', function (e) {
    filter(e.target.value, storeList);
  });
};

var filter = function filter(text, storeList) {
  var textUp = text.toUpperCase();
  storeList.forEach(function (el) {
    if (el.textContent.toUpperCase().includes(textUp) || el.dataset.address.toUpperCase().includes(textUp) || el.dataset.city.toUpperCase().includes(textUp) || el.dataset.zip.includes(textUp)) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    } // ? el.style.display="block"
    // : el.style.display="none"023

  });
};

var getStoreList = function getStoreList() {
  fetch('./assets/json/stores.json').then(function (res) {
    return res.json();
  }).then(function (stores) {
    storeListDraw(stores);
  });
};

exports.getStoreList = getStoreList;

var listAction = function listAction(list) {
  list.addEventListener('click', function (e) {
    var Target = e.target;

    if (Target.nodeName === "LI") {
      showDirection(Target);
      (0, _isMobile.verifyMobile)() ? Array.from(Target.parentElement.querySelectorAll('li')).map(function (el) {
        return el.style.display = "none";
      }) : null;
    }
  });
};

var showDirection = function showDirection(li) {
  var address = "".concat(li.dataset.address, ", ").concat(li.dataset.city, ", ").concat(li.dataset.state);
  /*, ${li.dataset.zip}`*/

  (0, _initialVariables.id)('storeName').innerText = li.dataset.store;
  var directionStore = (0, _initialVariables.id)('directionStore');
  directionStore.innerHTML = "\n        <p>Direction:</p>\n        <p class=\"direction\">".concat(address, "</p>\n        <p>United States</p>\n      ");
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    "address": address
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      _initialVariables.c.log(results[0].geometry.location.lat(), results[0].geometry.location.lng());

      map(results[0].geometry.location.lat(), results[0].geometry.location.lng());
    }
  });
};

var map = function map(lat, lng) {
  var vMarker;
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  vMarker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    draggable: true,
    icon: "img/pin.png"
  }); // google.maps.event.addListener(vMarker, 'dragend', function (evt) {
  //   // $("#txtLat").val(evt.latLng.lat().toFixed(6));
  //   // $("#txtLng").val(evt.latLng.lng().toFixed(6));
  //
  //   map.panTo(evt.latLng);
  // });
  // map.setCenter(vMarker.position);

  vMarker.setMap(map);
};