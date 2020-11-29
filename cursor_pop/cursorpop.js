'use strict';

if (typeof module !== 'undefined') module.exports = cursorpop;

function cursorpop(){
    let body = 'body';
    if (!(this instanceof cursorpop)) return new cursorpop();

    this._body = body = typeof body === 'string' ? document.getElementsByTagName(body)[0] : body;

    this._width = body.width;
    this._height = body.height;

    this._max = 1;
    this._data = [];

    console.log("starting this up")
}

cursorpop.prototype = {

    defaultParticleAmount: 15,

    defaultParticleSpeed: 1,

    particleSolidColor: false,

    defaultParticleSize: 10,

    defaultParticleSmoothness: 80,

    displayColor: {r: Math.floor(Math.random() * (255 + 1)) + 0, g: Math.floor(Math.random() * (255 + 1)) + 0, b: Math.floor(Math.random() * (255 + 1)) + 0},

    defaultColors: [
        {r: 255, g: 0, b: 0},
        {r: 0, g: 255, b: 0}
    ],

    gradient: function (grad) {
        // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
        var body = this._createCanvas(),
            ctx = body.getContext('2d'),
            gradient = ctx.createLinearGradient(0, 0, 0, 256);

        body.width = 1;
        body.height = 256;

        for (var i in grad) {
            gradient.addColorStop(+i, grad[i]);
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, 256);

        this._grad = ctx.getImageData(0, 0, 1, 256).data;

        return this;
    },

    draw: function (minOpacity) {
        if (!this._circle) this.radius(this.defaultRadius);
        if (!this._grad) this.gradient(this.defaultGradient);

        var ctx = this._ctx;

        ctx.clearRect(0, 0, this._width, this._height);

        // draw a grayscale heatmap by putting a blurred circle at each data point
        for (var i = 0, len = this._data.length, p; i < len; i++) {
            p = this._data[i];
            ctx.globalAlpha = Math.min(Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity), 1);
            ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
        }

        // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
        var colored = ctx.getImageData(0, 0, this._width, this._height);
        this._colorize(colored.data, this._grad);
        ctx.putImageData(colored, 0, 0);

        return this;
    },

    set: function(amount, size, smoothness, colors, speed){
        this.defaultParticleAmount = amount;
        this.defaultParticleSize = size;
        this.defaultParticleSmoothness = smoothness;
        this.defaultParticleSpeed = speed;
        this.defaultColors = colors;
    },

    pop: function(x, y){
        // this._body.innerHTML = '<h1>hoiiiii</h1>';
        let explosion = document.createElement("div");
        explosion.style.left =  x - this.defaultParticleSize / 2;
        explosion.style.top = y - this.defaultParticleSize / 2;

        for (var i = 0; i < this.defaultParticleAmount; i++) {
            if(!this.particleSolidColor){
              this.generateColor(colorOne, colorTwo)
            }
            
            // positioning x,y of the particle on the circle (little randomized radius)
            var x = (this.defaultParticleSize / 2) + this.rand(80, 150) * Math.cos(2 * Math.PI * i / this.rand(this.defaultParticleAmount - 10, this.defaultParticleAmount + 10)),
              y = (this.defaultParticleSize / 2) + this.rand(80, 150) * Math.sin(2 * Math.PI * i / this.rand(this.defaultParticleAmount - 10, this.defaultParticleAmount + 10)),
              color =  this.displayColor.r + ', ' + this.displayColor.g + ', ' + this.displayColor.b; // randomize the color rgb
                // particle element creation (could be anything other than div)

              let particleElm = document.createElement('div');
              particleElm.className = "particle";
              particleElm.style.backgroundColor = `rgb(${color})`;
              particleElm.style.top = `${y}px`;
              particleElm.style.width = `${this.defaultParticleSize}px`;
              particleElm.style.animation = `pop ${this.defaultParticleSpeed}s reverse forwards`;
              particleElm.style.borderRadius = `${this.defaultParticleSmoothness}%`;
              particleElm.style.height = `${this.defaultParticleSize}px`;
              particleElm.style.left = `${x}px`;
        
            if (i == 0) { // no need to add the listener on all generated elements
              // css3 animation end detection
              particleElm.addEventListener('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                explosion.remove(); // remove this explosion container when animation ended
              });
            }
            explosion.appendChild(particleElm);
          }

        this._body.appendChild(explosion);
        return "pop";
    },

    rand: function(min, max) {
        return Math.floor(Math.random() * (max + 1)) + min;
    },

    generateColor: function(color1, color2){
        let randomRed;
        let randomBlue;
        let randomGreen;
    
        if(!color1 || !colorTwo){
          console.log("NOO")
          return;
        }
    
        if(color1.r >= color2.r){
          randomRed = Math.floor(Math.random() * color1.r) + color2.r;
        }else{
          randomRed = Math.floor(Math.random() * color2.r) + color1.r;
        }
    
        if(color1.g >= color2.g){
          randomGreen = Math.floor(Math.random() * color1.g) + color2.g;
        }else{
          randomGreen = Math.floor(Math.random() * color2.g) + color1.g;
        }
    
        if(color1.b >= color2.b){
          randomBlue = Math.floor(Math.random() * color1.b) + color2.b;
        }else{
          randomBlue = Math.floor(Math.random() * color2.b) + color1.b;
        }
    
        this.displayColor = {r: randomRed, g: randomGreen, b: randomGreen};
      },

    _createCanvas: function () {
        if (typeof document !== 'undefined') {
            return document.createElement('body');
        } else {
            // create a new body instance in node.js
            // the body class needs to have a default constructor without any parameter
            return new this._body.constructor();
        }
    }
};