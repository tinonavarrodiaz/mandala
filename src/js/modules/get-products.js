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
} from './initialVariables';

export const getProducts = (param) => {
  fetch('assets/json/products.json')
    .then((response) => response.json())
    .then((res) => getProduct(param, res));
};
const getProduct = (param, products) => {
  c.log(products);
  let product = products.products.filter((el) => el.slug === param);
  c.log(product[0].slug);
  showProduct(product[0]);
};
const showProduct = (product) => {
  console.log(product);
  id('tequila-name').innerText = product.name;
  id('tequila-description').innerText = product.description;
  id('tequila-color').innerText = product.color;
  id('tequila-aroma').innerText = product.aroma;
  id('tequila-taste').innerText = product.taste;
  let ta = id('tequila-aging');
  product.aging ? (ta.innerText = product.aging) : ta.parentElement.remove();
  id('tequila-img').src = `img/new/bottles/${product.img}`;
  id('left').href = product.prev;
  console.log(id('left'));
  id('right').href = product.next;
};

const limited = () => {
  const tequilaData = id('tequilaData');
  tequilaData.innerHTML = '';
  fetch('assets/json/products.json')
    .then((response) => response.json())
    .then((res) => {
      tequilaData.innerHTML = `

      `;
    });
};
