import { verifyMobile, setMobileClass } from './modules/isMobile';
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
  cssScrollBarWidth,
} from './modules/initialVariables';
import AOS from 'aos';
import { loading } from './modules/loading';
import { dotsSlider } from './modules/dots-slider';
import { scrollTo } from './modules/scrollSmooth';
import { activeMenu, toggleMenu } from './modules/active-menu';
import { access, accessibilitySide } from './modules/access';
import { getProducts } from './modules/get-products';
import { getStoreList } from './modules/stores';
import $ from 'jquery';

AOS.init({
  easing: 'ease-out-back',
  duration: 850,
  startEvent: 'DOMContentLoaded',
  useClassNames: true,
});

setMobileClass(dd, 'mobile', 'desktop');

activeMenu();
const accessPage = q('.access-page');

const buyButton = q('.buy-container');

if (verifyMobile() && buyButton) {
  const newbuyButton = buyButton.cloneNode(true);
  buyButton.remove();
  id('main-menu').appendChild(newbuyButton);
}
const miStorage = window.sessionStorage;

const loadingEle = document.getElementById('loading');

addEventListener('load', () => {
  if (miStorage.getItem('accsess') !== 'true') {
    if (!body.classList.contains('access-page')) {
      location.href = './access.html';
    } else {
      body.classList.remove('opacity');
    }
  } else {
    body.classList.remove('opacity');
  }
  cssScrollBarWidth();
  if (loadingEle) loading(loadingEle, 500);
});

addEventListener('resize', () => {
  cssScrollBarWidth();
  setMobileClass(dd, 'mobile', 'desktop');
});

addEventListener('DOMContentLoaded', () => {
  window.scrollTo({
    top: 0,
    left: 0,
  });
});

const setCurrentYear = (ele) => {
  ele.innerText = new Date().getFullYear();
};

const currentYearElement = id('currentYear');
if (currentYearElement) setCurrentYear(currentYearElement);

(function () {
  // !accessPage ? scrollTo(".scroll", false, ".main-header") : null;
})();

!accessPage ? toggleMenu(verifyMobile(), '#toggle', '#main-menu') : null;

const accessFunction = (page) => {
  page.querySelector('button').addEventListener('click', (e) => {
    miStorage.setItem('accsess', 'true');
    location.href = './';
  });
};
accessPage ? accessFunction(accessPage) : null;

const dots = [...all('.dots__item')];

dots ? dotsSlider(dots) : null;

const scrollEle = [...all('.scoll-element')];

const screenHeight = w.innerHeight;
const rightmsg = q('.right-msg');
addEventListener('scroll', (e) => {
  if (rightmsg) {
    let scrollY = w.scrollY;
    scrollY >= screenHeight
      ? rightmsg.classList.add('fixed')
      : rightmsg.classList.remove('fixed');
    scrollEle.map((el) => {
      el.style = 'transform: translateY(-100%)';
      el.style = 'transition: all .5';
    });
  }
});

$(document).ready(function () {
  //parallax scroll
  $(window).on('load scroll', function () {
    var parallaxElement = $('.parallax_scroll'),
      parallaxQuantity = parallaxElement.length;
    window.requestAnimationFrame(function () {
      for (var i = 0; i < parallaxQuantity; i++) {
        var currentElement = parallaxElement.eq(i),
          windowTop = $(window).scrollTop(),
          elementTop = currentElement.offset().top,
          elementHeight = currentElement.height(),
          viewPortHeight = window.innerHeight * 0.5 - elementHeight * 0.5,
          scrolled = windowTop - elementTop + viewPortHeight;
        currentElement.css({
          transform: 'translate3d(0,' + scrolled * -0.15 + 'px, 0)',
        });
      }
    });
  });
});

const menuTequilasLink = id('submenu-link');
const menuTequilaEle = id('nav-tequilas');

menuTequilasLink.addEventListener('click', (e) => {
  e.preventDefault();
  menuTequilaEle.classList.toggle('active');
  dd.classList.contains('Home')
    ? dd.classList.toggle('menu-tequila-active')
    : null;
});

const stayInTouch = id('stay-in-touch');
const stayInTouchClose = id('stay-in-touch-close');
const stayInTouchForm = id('stay-in-touch-form');
// console.log(stayInTouch, stayInTouchClose, stayInTouchForm)

const stayInTouchRemove = (el) => {
  el.parentElement.classList.add('hide');
  setTimeout(() => {
    el.parentElement.remove();
  }, 300);
};
stayInTouch.addEventListener('click', (e) => {
  // console.log(e.target)
  if (e.target.classList.contains('stay-in-touch__close')) {
    stayInTouchRemove(stayInTouch);
  }
});

import axios from 'axios';
stayInTouchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const Target = e.target;
  const data = new FormData(Target);
  const url = Target.action;
  const method = Target.method;
  const button = Target.querySelector('button');
  const input = Target.querySelector('input');
  button.innerHTML = '<img src="img/loadin.svg">';
  const authOptions = {
    method: 'POST',
    url: 'php/newsletter1.php',
    data: data,
    headers: {
      Authorization: 'Basic Y2xpZW50OnNlY3JldA==',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  };
  // console.log(data.get("newsletter"))
  axios(authOptions)
    .then((res) => {
      if (res.status === 200) {
        button.innerText = 'Sent';
        button.setAttribute('disabled', 'disabled');
        input.setAttribute('readonly', 'readonly');
        // console.log(res)
        spop({
          position: 'bottom-right',
          template: '<h4>Success</h4>your email has been registered',
          style: 'success',
          autoclose: 3000,
        });
        setTimeout(() => {
          Target.parentElement.parentElement.remove();
        }, 3000);
      } else {
        button.innerText = 'Subscribe';
        spop({
          position: 'bottom-right',
          template: '<h4>An error occurred.</h4>Please try again later',
          style: 'error',
          autoclose: 10000,
        });
      }
    })
    .catch((error) => {
      button.innerText = 'Subscribe';
      spop({
        position: 'bottom-right',
        template: '<h4>An error occurred.</h4>Please try again later',
        style: 'error',
        autoclose: 10000,
      });
    });
});

const accessButton = id('accessButton');

// accessButton.addEventListener('click', e=>access())

const switchs = [...all('.switch')];

const profiles = [...all('.acsb-profile-content')];

if (switchs && profiles) {
  profiles.map((profile) => {
    profile.addEventListener('click', function () {
      this.classList.toggle('selected');
      this.parentElement.querySelector('label').click();
    });
  });
  switchs.map((el) => {
    el.addEventListener('change', (e) => {
      let Target = e.target;
      let parenLi = Target.parentElement.parentElement.parentElement;
      Target.checked
        ? parenLi.querySelector('p').classList.add('is-visible')
        : parenLi.querySelector('p').classList.remove('is-visible');
      Target.checked
        ? parenLi
            .querySelector('.acsb-profile-content')
            .classList.add('selected')
        : parenLi
            .querySelector('.acsb-profile-content')
            .classList.remove('selected');
    });
  });
}
const accessibilityMenu = id('accessibility-menu');
id('accessibility').addEventListener('click', function (e) {
  // // c.log(this)
  accessibilityMenu.classList.toggle('active');
  accessibilityActions(this, accessibilityMenu);
});
const accessibilityActions = (accessibilityButton, accessibilityMenu) => {
  accessibilityMenu
    .querySelector('.icon-times')
    .addEventListener('click', () => accessibilityButton.click());
  accessibilitySide(accessibilityMenu);
  // accessibilitySide()
};

// const $switchs = $('.switch')
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
const question = id('question');
question.addEventListener('click', (e) => {
  q('.ref').classList.toggle('show');
});

q('.ref__close').addEventListener('click', (e) => {
  question.click();
});

if (body.classList.contains('story')) {
  // body.querySelector('main').insertAdjacentHTML('beforeend', '<img class="img-mandal" src="img/mandala_new.png" id="">')
}

if (
  dd.classList.contains('Craftsmanship') ||
  dd.classList.contains('OurTeam') ||
  dd.classList.contains('Distributorsby')
) {
  body.classList.add('story');
}

const getParameterByName = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const param =
  getParameterByName('prod') !== ' '
    ? getParameterByName('prod')
    : 'Tequila-Blanco';

param ? getProducts(param) : null;

body.classList.contains('retailer') ? getStoreList() : null;

const Seizurebutton = id('Seizure');
const Visionbutton = id('Vision');
const Cognitivebutton = id('Cognitive');
const refreshbutton = id('refresh');

Seizurebutton.addEventListener('change', (e) => {
  dd.classList.toggle('Seizure');
});

Visionbutton.addEventListener('change', (e) => {
  dd.classList.toggle('Vision');
});
Cognitivebutton.addEventListener('change', (e) => {
  dd.classList.toggle('Cognitive');
});
refreshbutton.addEventListener('click', (e) => {
  dd.classList.remove('Cognitive');
  dd.classList.remove('Vision');
  dd.classList.remove('Seizure');
});

const hrefLocal = [...all('[href="#"]')];

// c.log(hrefLocal)
hrefLocal.map((el) => el.addEventListener('click', (e) => e.preventDefault()));

// const scrollMoveElement = q('h1.animate__animated')
// addEventListener('scroll', e=>{
//   // c.log(scrollY*.20)
//   scrollMoveElement.style.transform=`translateY(${scrollY}px)`
// })

if (body.classList.contains('products')) {
  const links = [...all('.main-menu__link')];
  links.map((el) => el.classList.remove('active'));
  console.log(links);
  links[1].classList.add('active');
}

if (verifyMobile()) {
  const mainM = id('main-menu');
  // console.log(mainM)
  mainM.classList.remove('main-menu');
  mainM.classList.add('main-menu-mobile');
  const menuTequilas = document.querySelector('.menu-tequilas');
  const tequilasClone = menuTequilas.cloneNode(true);
  q('.nav-tequilas').remove();
  menuTequilas.remove();
  const tequilasLink = id('submenu-link');
  tequilasLink.appendChild(tequilasClone);
  const submenuLink = document.querySelector('#submenu-link');
  submenuLink.addEventListener('click', function () {
    this.querySelector('.menu-tequilas').classList.toggle('is-active');
    this.classList.toggle('active');
  });
  const toggleMenu = document.querySelector('.toggle-menu');
  const mainMenu = document.querySelector('.main-menu-mobile');
  // console.log(toggleMenu)
  toggleMenu.addEventListener('click', function () {
    mainMenu.classList.toggle('is-active');
  });
  const menuTequilasLinks = [...all('.menu-tequilas__link')];
  menuTequilasLinks.map((el) =>
    el.addEventListener('click', function (e) {
      e.preventDefault();
      // const href=this.href
      location = this.href;
    })
  );

  const inputSerch = document.querySelector('.input-search-group input');
  if (inputSerch) {
    inputSerch.addEventListener('focus', (e) => {
      e.preventDefault();
      dd.classList.remove('portrait');
    });
    inputSerch.addEventListener('blur', (e) => {
      dd.classList.add('portrait');
    });
  }

  // const storesList =  document.querySelector('.storesList')
  //
  //   const LI = [...storesList.querySelectorAll('li')]
  //   storesList.addEventListener('click', e=>{
  //     if(e.target.nodeName==='LI'){
  //       LI.map(el=>el.style.display="none")
  //     }
  //   })
} else {
  q('.toggle-menu').remove();
}

const createModalSlider = (img, name, desciption) => {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal slider-modal';
  modal.innerHTML = `
    <div class="modal__close"></div>
    <div class="modal__container">
      <img src="${img}" alt="${name}">
      <h3>${name}</h3>
      <p class="p-description">${desciption}</p>
    </div>
  `;
  body.appendChild(modal);
  modal.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('slider-modal') ||
      e.target.classList.contains('modal__close')
    ) {
      modal.remove();
    }
  });
};

const sliderEl = id('tequilaData');

if (sliderEl) {
  sliderEl.addEventListener('click', (e) => {
    let Target = e.target;
    if (
      Target.nodeName === 'FIGURE' ||
      Target.parentElement.nodeName === 'FIGURE'
    ) {
      createModalSlider(
        Target.dataset.img,
        Target.dataset.name,
        Target.dataset.description
      );
    }
  });
  // sliderItems.forEach(el=>el.addEventListener('click', function(){
  //   createModalSlider(this.dataset.img,this.dataset.name)
  // }))
}

const teamLeyenda = q('.sectionText');

if (teamLeyenda && verifyMobile()) {
  let newLeyenda = teamLeyenda.cloneNode(true);
  teamLeyenda.remove();
  q('.team').insertAdjacentElement('afterbegin', newLeyenda);
}

const contactForm = id('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const Target = e.target;
    console.log(Target.parentElement);
    const data = new FormData(Target);
    const url = Target.action;
    const method = Target.method;
    const button = Target.querySelector('button');
    const input = [...Target.querySelectorAll('input, textarea')];
    button.innerHTML = '<img src="img/loading-light.svg">';
    const authOptions = {
      method: 'POST',
      url: url,
      data: data,
      headers: {
        Authorization: 'Basic Y2xpZW50OnNlY3JldA==',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      json: true,
    };
    // console.log(data.get("newsletter"))
    axios(authOptions)
      .then((res) => {
        console.log(input);
        if (res.status === 200) {
          button.innerText = 'Sent';
          button.setAttribute('disabled', 'disabled');
          input.map((el) => el.setAttribute('readonly', 'readonly'));
          spop({
            position: 'top-right',
            template:
              '<h4>Form sent successfully</h4>We will contact you shortly',
            style: 'success',
            autoclose: 7000,
          });
        } else {
          button.innerText = 'Subscribe';
          spop({
            position: 'top-right',
            template: '<h4>An error occurred.</h4>Please try again later',
            style: 'error',
            autoclose: 7000,
          });
        }
      })
      .catch((error) => {
        button.innerText = 'Subscribe';
        spop({
          position: 'top-right',
          template: '<h4>An error occurred.</h4>Please try again later',
          style: 'error',
          autoclose: 7000,
        });
      });
  });
}

const buyListItems = [...id('buy-List').querySelectorAll('li')].length;
// const buyListItems = [...buyListItems1.querySelectorAll('li')]
// console.log(buyListItems)
dd.style.setProperty('--item-stores', buyListItems);
const Buy = id('buyOnline');

if (verifyMobile()) {
  const buyList = id('buy-List');
  const newbuyList = buyList.cloneNode(true);
  let closeBtn = null;
  buyList.remove();
  Buy.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(newbuyList);
    const modalStore = d.createElement('div');
    modalStore.className = 'modal-store show';
    modalStore.innerHTML = `
      <div class="modal-store__close"></div>
    `;
    modalStore.appendChild(newbuyList);
    body.appendChild(modalStore);
    closeBtn = q('.modal-store__close');
    closeBtn.addEventListener('click', (e) => {
      id('toggle').click();
      setTimeout(() => {
        modalStore.remove();
      }, 500);
    });
  });
} else {
  Buy.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.nextElementSibling.classList.toggle('active');
  });
}

// console.log(location.pathname);

// if (
//   location.pathname === '/products.html' ||
//   location.pathname === '/nuevo/products.html' ||
//   location.pathname === '/limited-edition.html' ||
//   location.pathname === '/nuevo/limited-edition.html'
// ) {
//   const navTequilas = document.querySelector('.nav-tequilas');
//   navTequilas.classList.add('show');
// }

// if(verifyMobile()){
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
