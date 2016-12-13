// TBcustom

// Save/print pipeline - add name, add name and banner to canvas, move route down to accomodate TODO

// Intro sequence TODO

// Libraries
var PIXI = require('pixi.js');
var anime = require('animejs');

document.addEventListener('DOMContentLoaded', function(event) {

// Screen size event
require('/Users/anthonymoles/Documents/TBcustom/js/canvasSizer.js');

// logo or not
if (599 >= window.innerWidth) {
  var logo = document.querySelector('.logo');
  logo.style.opacity = 0;
}

// Load Assets
var loader = PIXI.loader;
loader
    .add('base', '../img/canvas/base-arms.json')
    .add('items', '../img/canvas/items.json')
    .on("progress", loadProgressHandler)
    .load(onAssetsLoaded);

function loadProgressHandler(loader, loadedResource) {
  console.log('Progress:', loader.progress + '%');
}

function onAssetsLoaded() {

  // Initialiser object (module exports new init)
  var init = require('/Users/anthonymoles/Documents/TBcustom/js/init.js');
  init.loadTextures();
  init.populatePalette();
  init.initSlider(window.innerWidth, window.innerHeight);
  init.makeTestFrame();
  init.makeBody();
  init.makeArms();
  init.startFaceAnimate(); // start face update loop
  init.startAnimate(); // start main update and rendering loops
  init.printPipe();


  // Remove loader overlay
  var loader = document.getElementById('busy');
  loader.style.display = 'none';

  var testButton = document.getElementById('share-btn');
  testButton.addEventListener('click', function(event) {
  init.startArmSpiral();
  });

  } // end load init ------------------------------------------------------

}); //
