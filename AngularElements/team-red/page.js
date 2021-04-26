/* eslint-disable no-use-before-define */
/* globals document */
const $app = document.getElementById('app');

// data
const product = {
  name: 'Film',
  variants: [
    {
      sku: 'Aquaman',
      color: 'red',
      name: 'aquaman',
      image: './team-red/images/aquaman.jpg',
      thumb: './team-red/images/aquaman.jpg',
      price: '0,99 €',
    },
    {
      sku: 'Jonh_wick',
      color: 'green',
      name: 'jonh-wick',
      image: './team-red/images/wick.jpg',
      thumb: './team-red/images/wick.jpg',
      price: '0,99 €',
    },
    {
      sku: 'Posaman',
      color: 'blue',
      name: 'jonh-wick',
      image: './team-red/images/posaman.jpg',
      thumb: './team-red/images/posaman.jpg',
      price: '0,99 €',
    },
  ],
};

const state = {
  variant: 'Aquaman',
};

function renderOption(variant) {
  const active = state.variant === variant.sku ? 'active' : '';
  return `
    <button class="${active}" type="button" data-sku="${variant.sku}">
      <img src="${variant.thumb}" alt="${variant.name}" />
    </button>
  `;
}

function renderPage() {
  const variant = product.variants.find(v => state.variant === v.sku);
  $app.innerHTML = `
    <blue-cart id="cart"></blue-cart>
    <div id="image"><div><img src="${variant.image}" alt="${variant.name}" /></div></div>
    <h2 id="name">${product.name} <small>${variant.name}</small></h2>
    <div id="options">${product.variants.map(renderOption).join('')}</div>
    <blue-buy id="buy" sku="${variant.sku}"></blue-buy>
    <green-recos id="reco" sku="${variant.sku}"></green-recos>
  `;
}

function rerender() {
  removeListeners();
  renderPage();
  addListeners();
}

function handleClickOption(e) {
  const sku = e.currentTarget.getAttribute('data-sku');
  state.variant = sku;
  rerender();
}

function addListeners() {
  const $btns = document.querySelectorAll('#options button');
  Array.prototype.forEach.call($btns, $btn => (
    $btn.addEventListener('click', handleClickOption)
  ));
}

function removeListeners() {
  const $btns = document.querySelectorAll('#options button');
  Array.prototype.forEach.call($btns, $btn => (
    $btn.removeEventListener('click', handleClickOption)
  ));
}

renderPage();
addListeners();
