class FeaturedCover extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});
    var imgUrl;
    if(this.hasAttribute('src')) {
      imgUrl = this.getAttribute('src');
    }
    var img = document.createElement('img');
    img.setAttribute('class','image');
    img.src = imgUrl;
    var style = document.createElement('style');
    style.textContent = `.image {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }`;
    shadow.appendChild(style);
    shadow.appendChild(img);
  }
}

class ResultImage extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});
    var imgUrl;
    if(this.hasAttribute('src')) {
      imgUrl = this.getAttribute('src');
    }
    var img = document.createElement('img');
    img.src = imgUrl;
    shadow.appendChild(img);
  }
}

customElements.define('featured-cover', FeaturedCover);
customElements.define('result-image', ResultImage);