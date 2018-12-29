import FlipDown from './flipdown';
import Parallax from './parallax.js';

import 'airbnb-js-shims';

var finish = new Date(2019,0,15,0,0,1).getTime() / 1000;

var flipdown = new FlipDown(finish).start()
      .ifEnded(() => {
        console.log('The countdown has ended!');
      });

let packs = document.querySelectorAll('.packs img'),
    body  = document.querySelector('body');

if(packs){
    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene);
}