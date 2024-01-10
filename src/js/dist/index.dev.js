"use strict";

var _isMobile = require("./modules/isMobile");

var _initialVariables = require("./modules/initialVariables");

var _aos = _interopRequireDefault(require("aos"));

var _loading = require("./modules/loading");

var _dotsSlider = require("./modules/dots-slider");

var _scrollSmooth = require("./modules/scrollSmooth");

var _activeMenu = require("./modules/active-menu");

var _access = require("./modules/access");

var _getProducts = require("./modules/get-products");

var _stores = require("./modules/stores");

var _jquery = _interopRequireDefault(require("jquery"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

_aos["default"].init({
  easing: 'ease-out-back',
  duration: 850,
  startEvent: 'DOMContentLoaded',
  useClassNames: true
});

(0, _isMobile.setMobileClass)(_initialVariables.dd, "mobile", "desktop");
(0, _activeMenu.activeMenu)();
var accessPage = (0, _initialVariables.q)('.access-page');
var buyButton = (0, _initialVariables.q)('.buy-container');

if ((0, _isMobile.verifyMobile)() && buyButton) {
  var newbuyButton = buyButton.cloneNode(true);
  buyButton.remove();
  (0, _initialVariables.id)('main-menu').appendChild(newbuyButton);
}

var miStorage = window.sessionStorage;
var loadingEle = document.getElementById("loading");
addEventListener("load", function () {
  if (miStorage.getItem('accsess') !== 'true') {
    if (!_initialVariables.body.classList.contains('access-page')) {
      location.href = "./access.html";
    } else {
      _initialVariables.body.classList.remove('opacity');
    }
  } else {
    _initialVariables.body.classList.remove('opacity');
  }

  (0, _initialVariables.cssScrollBarWidth)();
  if (loadingEle) (0, _loading.loading)(loadingEle, 500);
});
addEventListener("resize", function () {
  (0, _initialVariables.cssScrollBarWidth)();
  (0, _isMobile.setMobileClass)(_initialVariables.dd, "mobile", "desktop");
});
addEventListener('DOMContentLoaded', function () {
  window.scrollTo({
    top: 0,
    left: 0
  });
});

var setCurrentYear = function setCurrentYear(ele) {
  ele.innerText = new Date().getFullYear();
};

var currentYearElement = (0, _initialVariables.id)("currentYear");
if (currentYearElement) setCurrentYear(currentYearElement);

(function () {// !accessPage ? scrollTo(".scroll", false, ".main-header") : null;
})();

!accessPage ? (0, _activeMenu.toggleMenu)((0, _isMobile.verifyMobile)(), "#toggle", "#main-menu") : null;

var accessFunction = function accessFunction(page) {
  page.querySelector('button').addEventListener('click', function (e) {
    miStorage.setItem('accsess', 'true');
    location.href = "./";
  });
};

accessPage ? accessFunction(accessPage) : null;

var dots = _toConsumableArray((0, _initialVariables.all)('.dots__item'));

dots ? (0, _dotsSlider.dotsSlider)(dots) : null;

var scrollEle = _toConsumableArray((0, _initialVariables.all)('.scoll-element'));

var screenHeight = _initialVariables.w.innerHeight;
var rightmsg = (0, _initialVariables.q)('.right-msg');
addEventListener('scroll', function (e) {
  if (rightmsg) {
    var scrollY = _initialVariables.w.scrollY;
    scrollY >= screenHeight ? rightmsg.classList.add('fixed') : rightmsg.classList.remove('fixed');
    scrollEle.map(function (el) {
      el.style = "transform: translateY(-100%)";
      el.style = "transition: all .5";
    });
  }
});
(0, _jquery["default"])(document).ready(function () {
  //parallax scroll
  (0, _jquery["default"])(window).on("load scroll", function () {
    var parallaxElement = (0, _jquery["default"])(".parallax_scroll"),
        parallaxQuantity = parallaxElement.length;
    window.requestAnimationFrame(function () {
      for (var i = 0; i < parallaxQuantity; i++) {
        var currentElement = parallaxElement.eq(i),
            windowTop = (0, _jquery["default"])(window).scrollTop(),
            elementTop = currentElement.offset().top,
            elementHeight = currentElement.height(),
            viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
            scrolled = windowTop - elementTop + viewPortHeight;
        currentElement.css({
          transform: "translate3d(0," + scrolled * -0.15 + "px, 0)"
        });
      }
    });
  });
});
var menuTequilasLink = (0, _initialVariables.id)('submenu-link');
var menuTequilaEle = (0, _initialVariables.id)('nav-tequilas');
menuTequilasLink.addEventListener('click', function (e) {
  e.preventDefault();
  menuTequilaEle.classList.toggle('active');
  _initialVariables.dd.classList.contains('Home') ? _initialVariables.dd.classList.toggle('menu-tequila-active') : null;
});
var stayInTouch = (0, _initialVariables.id)('stay-in-touch');
var stayInTouchClose = (0, _initialVariables.id)('stay-in-touch-close');
var stayInTouchForm = (0, _initialVariables.id)('stay-in-touch-form'); // console.log(stayInTouch, stayInTouchClose, stayInTouchForm)

var stayInTouchRemove = function stayInTouchRemove(el) {
  el.parentElement.classList.add('hide');
  setTimeout(function () {
    el.parentElement.remove();
  }, 300);
};

stayInTouch.addEventListener('click', function (e) {
  // console.log(e.target)
  if (e.target.classList.contains('stay-in-touch__close')) {
    stayInTouchRemove(stayInTouch);
  }
});
stayInTouchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var Target = e.target;
  var data = new FormData(Target);
  var url = Target.action;
  var method = Target.method;
  var button = Target.querySelector('button');
  var input = Target.querySelector('input');
  button.innerHTML = '<img src="img/loadin.svg">';
  var authOptions = {
    method: 'POST',
    url: "php/newsletter.php",
    data: data,
    headers: {
      'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
      'Content-Type': 'application/json'
    },
    json: true
  };
  var authOptions1 = {
    method: 'POST',
    url: "php/wellcome.php",
    data: data,
    headers: {
      'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
      'Content-Type': 'application/json'
    },
    json: true
  }; // console.log(data.get("newsletter"))

  (0, _axios["default"])(authOptions).then(function (res) {
    console.log(res.data);

    if (res.status === 200) {
      (0, _axios["default"])(authOptions1).then(function (res1) {
        if (res1.status === 200) {
          button.innerText = "Sent";
          button.setAttribute('disabled', 'disabled');
          input.setAttribute('readonly', 'readonly'); // console.log(res)

          spop({
            position: 'bottom-right',
            template: '<h4>Success</h4>your email has been registered',
            style: 'success',
            autoclose: 3000
          });
          setTimeout(function () {
            Target.parentElement.parentElement.remove();
          }, 3000);
        } else {
          button.innerText = "Subscribe";
          spop({
            position: 'bottom-right',
            template: '<h4>An error occurred.</h4>Please try again later',
            style: 'error',
            autoclose: 10000
          });
        }
      });
    } else {
      button.innerText = "Subscribe";
      spop({
        position: 'bottom-right',
        template: '<h4>An error occurred.</h4>Please try again later',
        style: 'error',
        autoclose: 10000
      });
    }
  })["catch"](function (error) {
    button.innerText = "Subscribe";
    spop({
      position: 'bottom-right',
      template: '<h4>An error occurred.</h4>Please try again later',
      style: 'error',
      autoclose: 10000
    });
  }); // stayInTouchRemove(stayInTouch)
  // fetch()
});
var accessButton = (0, _initialVariables.id)('accessButton'); // accessButton.addEventListener('click', e=>access())

var switchs = _toConsumableArray((0, _initialVariables.all)('.switch'));

var profiles = _toConsumableArray((0, _initialVariables.all)('.acsb-profile-content'));

if (switchs && profiles) {
  profiles.map(function (profile) {
    profile.addEventListener('click', function () {
      this.classList.toggle('selected');
      this.parentElement.querySelector('label').click();
    });
  });
  switchs.map(function (el) {
    el.addEventListener('change', function (e) {
      var Target = e.target;
      var parenLi = Target.parentElement.parentElement.parentElement;
      Target.checked ? parenLi.querySelector('p').classList.add('is-visible') : parenLi.querySelector('p').classList.remove('is-visible');
      Target.checked ? parenLi.querySelector('.acsb-profile-content').classList.add('selected') : parenLi.querySelector('.acsb-profile-content').classList.remove('selected');
    });
  });
}

var accessibilityMenu = (0, _initialVariables.id)('accessibility-menu');
(0, _initialVariables.id)('accessibility').addEventListener('click', function (e) {
  // // c.log(this)
  accessibilityMenu.classList.toggle('active');
  accessibilityActions(this, accessibilityMenu);
});

var accessibilityActions = function accessibilityActions(accessibilityButton, accessibilityMenu) {
  accessibilityMenu.querySelector('.icon-times').addEventListener('click', function () {
    return accessibilityButton.click();
  });
  (0, _access.accessibilitySide)(accessibilityMenu); // accessibilitySide()
}; // const $switchs = $('.switch')
//  // c.log($switchs)
// if ($switchs) {
//   $switchs.on('change', function (e){
//     let parent = $(this).parent().parent().parent()
//     if ($(this).is(':checked')){
//       parent.find('p').slideDown()
//     }else{
//       parent.find('p').slideUp()
//     }
//   })
// }
// const
// accessibilitySide(accessibilityMenu,id(''))


var question = (0, _initialVariables.id)('question');
question.addEventListener('click', function (e) {
  (0, _initialVariables.q)('.ref').classList.toggle('show');
});
(0, _initialVariables.q)('.ref__close').addEventListener('click', function (e) {
  question.click();
});

if (_initialVariables.body.classList.contains('story')) {// body.querySelector('main').insertAdjacentHTML('beforeend', '<img class="img-mandal" src="img/mandala_new.png" id="">')
}

if (_initialVariables.dd.classList.contains('Craftsmanship') || _initialVariables.dd.classList.contains('OurTeam')) {
  _initialVariables.body.classList.add('story');
}

var getParameterByName = function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

var param = getParameterByName("prod") !== ' ' ? getParameterByName("prod") : 'Tequila-Blanco';
param ? (0, _getProducts.getProducts)(param) : null;
_initialVariables.body.classList.contains('retailer') ? (0, _stores.getStoreList)() : null;
var Seizurebutton = (0, _initialVariables.id)('Seizure');
var Visionbutton = (0, _initialVariables.id)('Vision');
var Cognitivebutton = (0, _initialVariables.id)('Cognitive');
var refreshbutton = (0, _initialVariables.id)('refresh');
Seizurebutton.addEventListener('change', function (e) {
  _initialVariables.dd.classList.toggle('Seizure');
});
Visionbutton.addEventListener('change', function (e) {
  _initialVariables.dd.classList.toggle('Vision');
});
Cognitivebutton.addEventListener('change', function (e) {
  _initialVariables.dd.classList.toggle('Cognitive');
});
refreshbutton.addEventListener('click', function (e) {
  _initialVariables.dd.classList.remove('Cognitive');

  _initialVariables.dd.classList.remove('Vision');

  _initialVariables.dd.classList.remove('Seizure');
});

var hrefLocal = _toConsumableArray((0, _initialVariables.all)('[href="#"]')); // c.log(hrefLocal)


hrefLocal.map(function (el) {
  return el.addEventListener('click', function (e) {
    return e.preventDefault();
  });
}); // const scrollMoveElement = q('h1.animate__animated')
// addEventListener('scroll', e=>{
//   // c.log(scrollY*.20)
//   scrollMoveElement.style.transform=`translateY(${scrollY}px)`
// })

if (_initialVariables.body.classList.contains('products')) {
  var links = _toConsumableArray((0, _initialVariables.all)('.main-menu__link'));

  links.map(function (el) {
    return el.classList.remove('active');
  });
  console.log(links);
  links[1].classList.add('active');
}

if ((0, _isMobile.verifyMobile)()) {
  var mainM = (0, _initialVariables.id)('main-menu'); // console.log(mainM)

  mainM.classList.remove('main-menu');
  mainM.classList.add('main-menu-mobile');
  var menuTequilas = document.querySelector('.menu-tequilas');
  var tequilasClone = menuTequilas.cloneNode(true);
  (0, _initialVariables.q)('.nav-tequilas').remove();
  menuTequilas.remove();
  var tequilasLink = (0, _initialVariables.id)('submenu-link');
  tequilasLink.appendChild(tequilasClone);
  var submenuLink = document.querySelector('#submenu-link');
  submenuLink.addEventListener('click', function () {
    this.querySelector('.menu-tequilas').classList.toggle('is-active');
    this.classList.toggle('active');
  });

  var _toggleMenu = document.querySelector('.toggle-menu');

  var mainMenu = document.querySelector('.main-menu-mobile'); // console.log(toggleMenu)

  _toggleMenu.addEventListener('click', function () {
    mainMenu.classList.toggle('is-active');
  });

  var menuTequilasLinks = _toConsumableArray((0, _initialVariables.all)('.menu-tequilas__link'));

  menuTequilasLinks.map(function (el) {
    return el.addEventListener('click', function (e) {
      e.preventDefault(); // const href=this.href

      location = this.href;
    });
  });
  var inputSerch = document.querySelector('.input-search-group input');

  if (inputSerch) {
    inputSerch.addEventListener('focus', function (e) {
      e.preventDefault();

      _initialVariables.dd.classList.remove('portrait');
    });
    inputSerch.addEventListener('blur', function (e) {
      _initialVariables.dd.classList.add('portrait');
    });
  } // const storesList =  document.querySelector('.storesList')
  //
  //   const LI = [...storesList.querySelectorAll('li')]
  //   storesList.addEventListener('click', e=>{
  //     if(e.target.nodeName==='LI'){
  //       LI.map(el=>el.style.display="none")
  //     }
  //   })

} else {
  (0, _initialVariables.q)('.toggle-menu').remove();
}

var createModalSlider = function createModalSlider(img, name) {
  var modal = document.createElement('div');
  modal.id = "modal";
  modal.className = "modal slider-modal";
  modal.innerHTML = "\n    <div class=\"modal__close\"></div>\n    <div class=\"modal__container\">\n      <img src=\"".concat(img, "\" alt=\"").concat(name, "\">\n      <p>").concat(name, "</p>\n    </div>\n  ");

  _initialVariables.body.appendChild(modal);

  modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('slider-modal') || e.target.classList.contains('modal__close')) {
      modal.remove();
    }
  });
};

var sliderEl = (0, _initialVariables.id)('tequilaData');

if (sliderEl) {
  sliderEl.addEventListener('click', function (e) {
    var Target = e.target;

    if (Target.nodeName === 'FIGURE' || Target.parentElement.nodeName === 'FIGURE') {
      createModalSlider(Target.dataset.img, Target.dataset.name);
    }
  }); // sliderItems.forEach(el=>el.addEventListener('click', function(){
  //   createModalSlider(this.dataset.img,this.dataset.name)
  // }))
}

var teamLeyenda = (0, _initialVariables.q)('.sectionText');

if (teamLeyenda && (0, _isMobile.verifyMobile)()) {
  var newLeyenda = teamLeyenda.cloneNode(true);
  teamLeyenda.remove();
  (0, _initialVariables.q)('.team').insertAdjacentElement('afterbegin', newLeyenda);
}

var contactForm = (0, _initialVariables.id)('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var Target = e.target;
    console.log(Target.parentElement);
    var data = new FormData(Target);
    var url = Target.action;
    var method = Target.method;
    var button = Target.querySelector('button');

    var input = _toConsumableArray(Target.querySelectorAll('input, textarea'));

    button.innerHTML = '<img src="img/loading-light.svg">';
    var authOptions = {
      method: 'POST',
      url: url,
      data: data,
      headers: {
        'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      json: true
    }; // console.log(data.get("newsletter"))

    (0, _axios["default"])(authOptions).then(function (res) {
      console.log(input);

      if (res.status === 200) {
        button.innerText = "Sent";
        button.setAttribute('disabled', 'disabled');
        input.map(function (el) {
          return el.setAttribute('readonly', 'readonly');
        });
        spop({
          position: 'top-right',
          template: '<h4>Form sent successfully</h4>We will contact you shortly',
          style: 'success',
          autoclose: 7000
        });
      } else {
        button.innerText = "Subscribe";
        spop({
          position: 'top-right',
          template: '<h4>An error occurred.</h4>Please try again later',
          style: 'error',
          autoclose: 7000
        });
      }
    })["catch"](function (error) {
      button.innerText = "Subscribe";
      spop({
        position: 'top-right',
        template: '<h4>An error occurred.</h4>Please try again later',
        style: 'error',
        autoclose: 7000
      });
    });
  });
}

var buyListItems = _toConsumableArray((0, _initialVariables.id)('buy-List').querySelectorAll('li')).length; // const buyListItems = [...buyListItems1.querySelectorAll('li')]
// console.log(buyListItems)


_initialVariables.dd.style.setProperty('--item-stores', buyListItems);

var Buy = (0, _initialVariables.id)('buyOnline');

if ((0, _isMobile.verifyMobile)()) {
  var buyList = (0, _initialVariables.id)('buy-List');
  var newbuyList = buyList.cloneNode(true);
  var closeBtn = null;
  buyList.remove();
  Buy.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(newbuyList);

    var modalStore = _initialVariables.d.createElement('div');

    modalStore.className = "modal-store show";
    modalStore.innerHTML = "\n      <div class=\"modal-store__close\"></div>\n    ";
    modalStore.appendChild(newbuyList);

    _initialVariables.body.appendChild(modalStore);

    closeBtn = (0, _initialVariables.q)('.modal-store__close');
    closeBtn.addEventListener('click', function (e) {
      (0, _initialVariables.id)('toggle').click();
      setTimeout(function () {
        modalStore.remove();
      }, 500);
    });
  });
} else {
  Buy.addEventListener('click', function (e) {
    e.preventDefault();
    e.target.nextElementSibling.classList.toggle('active');
  });
} // if(verifyMobile()){
//   let st = q('.stay-in-touch')
//   console.log(st)
//   let stnew = st.cloneNode(true)
//   st.remove()
//   let stC = document.createElement("div")
//   console.log(stC)
//   stC.className="stC"
//   stC.appendChild(stnew)
//   document.body.appendChild(stC)
//   console.log(stC)
//   stC.addEventListener('click',e=>{
//     if (e.target.classList.contains('stay-in-touch__close')) stC.remove()
//   })
// }