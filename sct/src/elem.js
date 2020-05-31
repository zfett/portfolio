class FeaturedCover extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});
    var wrapper = document.createElement('span');
    wrapper.setAttribute('class','wrapper');
    var image = document.createElement('span');
    image.setAttribute('class', 'image');
    var imgUrl;
    if(this.hasAttribute('src')) {
      imgUrl = this.getAttribute('src');
    }
    var img = document.createElement('img');
    img.src = imgUrl;
    image.appendChild(img);
    shadow.appendChild(wrapper);
    wrapper.appendChild(image);
  }
}

class ResultImage extends HTMLElement {
  constructor() {
    super();
    var shadow = this.attachShadow({mode: 'open'});
    var wrapper = document.createElement('span');
    wrapper.setAttribute('class','wrapper');
    var image = document.createElement('span');
    image.setAttribute('class', 'image');
    var imgUrl;
    if(this.hasAttribute('src')) {
      imgUrl = this.getAttribute('src');
    }
    var img = document.createElement('img');
    img.src = imgUrl;
    image.appendChild(img);
    shadow.appendChild(wrapper);
    wrapper.appendChild(image);
  }
}

customElements.define('result-image', ResultImage);