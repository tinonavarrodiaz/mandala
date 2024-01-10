import { verifyMobile, setMobileClass } from "./isMobile";
import {
  d,
  w,
  dd,
  c,
  log,
  dir,
  id,
  q,
  all,
  body,
  cssScrollBarWidth
} from "./initialVariables";

const storeListDraw = (stores)=>{
  let storeFragment = d.createDocumentFragment()
  let ul = document.createElement('ul')
  ul.className = "storesList"
  stores.map(el=>{

    let li = document.createElement(('li'))
    li.innerText = `${el.LocationName}`
    li.dataset.store= el.LocationName
    li.dataset.address= el.Address1
    li.dataset.city= el.City
    li.dataset.state= el.State
    li.dataset.zip= el.Zip
    ul.appendChild(li)
  })
  storeFragment.appendChild(ul)
  id('listStore').appendChild(storeFragment)
  let firsLi = q('.storesList li')
  // c.log(firsLi)
  // c.log([...id('listStore')].querySelectorAll('li'))
  // map(20.6566565, -103.3908839)
  listAction(ul)
  // firsLi.click()
  search(Array.from(all('.storesList li')))
  // navigator.geolocation.getCurrentPosition(function(msg){
  //   console.error( msg );
  // });
}

const search = (storeList) => {
  const inputSearch = id('inputSearch')
  const buttonSearch = id('buttonSearch')
  inputSearch.addEventListener('keyup', e=> {
    filter(e.target.value,storeList)
  })
}

const filter = (text, storeList) =>{
  let textUp = text.toUpperCase()
  storeList.forEach(el =>{
    if(el.textContent.toUpperCase().includes(textUp) || el.dataset.address.toUpperCase().includes(textUp) || el.dataset.city.toUpperCase().includes(textUp) || el.dataset.zip.includes(textUp)){
      el.style.display="block"
    }else{
      el.style.display="none"
    }
     // ? el.style.display="block"
     // : el.style.display="none"023
  })
}
export const getStoreList = () => {
  fetch('./assets/json/stores.json')
    .then(res=>res.json())
    .then(stores=>{
      storeListDraw(stores)
    })
}

const listAction = (list) => {
  list.addEventListener('click', e=>{
    let Target = e.target
    if(Target.nodeName==="LI"){
      showDirection(Target)
      verifyMobile() ? Array.from(Target.parentElement.querySelectorAll('li')).map(el=>el.style.display="none"):null
    }
  })
}

const showDirection = (li)=>{
  let address = `${li.dataset.address}, ${li.dataset.city}, ${li.dataset.state}`/*, ${li.dataset.zip}`*/
  id('storeName').innerText=li.dataset.store
  id('storeName').style.borderColor="#fff"
  const directionStore = id('directionStore')
  directionStore.innerHTML=`
        <p>Direction:</p>
        <p class="direction">${address}</p>
        <p>United States</p>
      `
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    "address": address
  }, (results, status)=>{
    if (status == google.maps.GeocoderStatus.OK) {
      // c.log(results[0].geometry.location.lat(), results[0].geometry.location.lng())
      map(results[0].geometry.location.lat(), results[0].geometry.location.lng())
    }
  })
}

const map = (lat, lng)=>{
  let vMarker
  let map
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: new google.maps.LatLng(lat, lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  vMarker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    draggable: true,
    icon: "img/pin.png"
  });
  // google.maps.event.addListener(vMarker, 'dragend', function (evt) {
  //   // $("#txtLat").val(evt.latLng.lat().toFixed(6));
  //   // $("#txtLng").val(evt.latLng.lng().toFixed(6));
  //
  //   map.panTo(evt.latLng);
  // });
  // map.setCenter(vMarker.position);
  vMarker.setMap(map);
}
