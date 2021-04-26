/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */
(function fragments() {
  const prices = {
    Aquaman: '1,99 €',
    Jonh_wick: '0,99 €',
    Posaman: '200,00 €',
  };

  const state = {
    count: 0,
  };

  class BlueCart extends HTMLElement {
    connectedCallback() {
      this.refresh = this.refresh.bind(this);
      this.log('connected');
      this.render();
      window.addEventListener('blue:cart:changed', this.refresh);
    }

    refresh() {
      this.log('event recieved "blue:cart:changed"');
      this.render();
    }

    render() {
      const classname = state.count === 0 ? 'empty' : 'filled';
      this.innerHTML = `
        <div class="${classname}">carrello: ${state.count} film(s)</div>
      `;
    }

    disconnectedCallback() {
      window.removeEventListener('blue:cart:changed', this.refresh);
      this.log('disconnected');
    }

    log(...args) {
      console.log('🛒 blue-cart', ...args);
    }
  }
  window.customElements.define('blue-cart', BlueCart);


  class BlueBuy extends HTMLElement {
    static get observedAttributes() {
      return ['sku'];
    }

    connectedCallback() {
      this.addToCart = this.addToCart.bind(this);
      const sku = this.getAttribute('sku');
      this.log('connected', sku);
      this.render();
      this.firstChild.addEventListener('click', this.addToCart);
    }

    addToCart() {
      state.count += 1;
      this.log('event sent "blue:cart:changed"');
      this.dispatchEvent(new CustomEvent('blue:cart:changed', {
        bubbles: true,
      }));
    }

    render() {
      const sku = this.getAttribute('sku');
      const price = prices[sku];
      this.innerHTML = `<button type="button">Aggiungi al carrello ( ${price} )</button>`;
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      this.log('attributeChanged', attr, oldValue, newValue);
      this.render();
    }

    disconnectedCallback() {
      this.firstChild.removeEventListener('click', this.addToCart);
      const sku = this.getAttribute('sku');
      this.log('disconnected', sku);
    }

    log(...args) {
      console.log('🔘 blue-buy', ...args);
    }
  }
  window.customElements.define('blue-buy', BlueBuy);
}());
