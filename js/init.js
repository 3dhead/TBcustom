// init

var PIXI = require('pixi.js');
var anime = require('animejs');
var body = require('/Users/anthonymoles/Documents/TBcustom/js/body.js');
var item = require('/Users/anthonymoles/Documents/TBcustom/js/item.js');
var arm = require('/Users/anthonymoles/Documents/TBcustom/js/arm.js');



var init = function () {

  // init
  this.canvas = document.getElementById('Pcanvas');
  this.renderer = PIXI.autoDetectRenderer(600, 720, { transparent: true, antialias: true });
  this.canvas.appendChild(this.renderer.view);
  this.renderer.view.setAttribute('class', 'canvas-class');

  // arm renderTexture
  this.brt = new PIXI.BaseRenderTexture(200, 80, PIXI.SCALE_MODES.LINEAR, 1);
  this.rt = new PIXI.RenderTexture(this.brt);

  // canvas dimensions
  this.cWidth = this.renderer.width;
  this.cHeight = this.renderer.height;

  // create the root of the scene graph
  this.stage = new PIXI.Container();

  // add centred viewport (just in case going forward)
  this.viewport = new PIXI.Container();
  this.viewport.pivot.x = this.cWidth/2;
  this.viewport.pivot.y = this.cHeight/2;
  this.viewport.position.x = this.cWidth/2;
  this.viewport.position.y = this.cHeight/2;
  this.stage.addChild(this.viewport);

  // Route object for group animation
  this.route = new PIXI.Container();
  this.route.pivot.x = this.cWidth/2;
  this.route.pivot.y = this.cHeight;
  this.route.position.x = this.cWidth/2;
  this.route.position.y = this.cHeight - 40;
  this.route.skew.x = 0;
  this.route.rotation = 0;
  this.route.scale.y = 1;
  this.viewport.addChild(this.route);

  // Clothes layer
  this.clothesLayer = new PIXI.Container();
  this.route.addChild(this.clothesLayer);

  // Accessories layer
  this.accessoriesLayer = new PIXI.Container();
  this.route.addChild(this.accessoriesLayer);

  // Face layer
  this.faceLayer = new PIXI.Container();
  this.route.addChild(this.faceLayer);


  // list of all textures
  this.itemTextures = [];

  // adding items to the scene (extend with clothes(also affects arm object - change arms method), hair and shoes (static, placed in lower layers)) TODO
  var self = this;

  this.onClick = function(event) {
    var id = event.target.id;
    console.log('clicked item ID: ' + id);
    var index = id - 1;
    var image = self.itemTextures[index];
    var type;

    // var routeContainer = self.route;
    // var clothesLayer = self.clothesLayer;
    // var accessoriesLayer = self.accessoriesLayer;
    // var faceLayer = self.faceLayer;


    if ( id == 40 || 30 || 32 || 35 || 45 ) {
      // CLOTHES
      console.log('clothes');

    } else if ( id == 1 || 8 || 18 || 22 || 29 || 37 || 46 || 52 ) {
      // HAIR
      console.log('hair');

    } else if ( id == 2 || 11 || 21 || 25 || 48 || 55 ) {
      // HATS
      console.log('hats');

    } else if ( id == 6 || 10 || 20 || 31 ) {
      // SHOES
      console.log('shoes');

    } else if ( id == 3 || 27 || 33 || 38 || 47 ) {
      // FACELAYER
      console.log('facelayer');

    } else if ( id == 5 || 26 || 28 || 42 || 49 || 54 ) {
      // FACELAYERGLASSES
      console.log('glasses');

    } else if ( id == 39 ) {
      // LOW ACCESSORIES
      console.log('cape');

    } else {
      // ACCESSORIES
      console.log('accessories');
      type = 'Accessories';
      var add = new item(id, image, type);
      self.route.addChild(add);
    }

    // if clothes id then changeArms(id)
    // if hair id, remove anything with hair type TODO

    // ACCESSORIES 4 7 9 12 13 14 15 16 17 19 23 24 34 36 41 43 44 50 51 53 56 57 58 59 60 61
    // LOW ACCESSORIES 39
    // CLOTHES 40 30 32 35 45
    // HAIR 1 8 18 22 29 37 46 52
    // HATS 2 11 21 25 48 55
    // SHOES 6 10 20 31
    // FACELAYER 3 27 33 38 47
    // FACELAYERGLASSES 5 26 28 42 49 54


  };



};





init.prototype.loadTextures = function () {
  var i;

  for (i = 1; i <= 61; i++)
    {
       var texture = PIXI.Texture.fromFrame( i + '.png' );
       this.itemTextures.push(texture);
    }
};

init.prototype.populatePalette = function () {
  var i;

  var icons = document.getElementById('icons');

  for (i = 1; i <= 61; i++) {
    var node = document.createElement("li");
    node.className = 'js_slide sprite-icons icons-' + i;
    node.id = i;
    node.addEventListener( 'click' , this.onClick.bind(this) , false );
    icons.appendChild( node );
  }

};

init.prototype.initSlider = function () {

  var multiSlides = document.querySelector('.slider');

  // different behaviour on wider screens - scroll more slides. if/else statement
  lory(multiSlides, {
      infinite: 0,
      enableMouseEvents: true,
      slidesToScroll: 3,
      rewind: true
  });

  // scroll left and then right to demonstrate TODO


};

init.prototype.makeTestFrame = function () {

  //TESTING frame

  this.graphics = new PIXI.Graphics();
  this.graphics.lineStyle(1, 0xffd900, 1);

  this.graphics.moveTo(0,0);
  this.graphics.lineTo(600, 0);
  this.graphics.lineTo(600, 720);
  this.graphics.lineTo(0, 720);
  this.graphics.lineTo(0, 0);

  this.viewport.addChild(this.graphics);

};

init.prototype.startAnimate = function () {
  // init first render cycle
  requestAnimationFrame(this.animate.bind(this));

};

init.prototype.animate = function () {

  // renderTexture
  this.renderer.render(this.initArm.armCanvas, this.rt);

  // render loop
  requestAnimationFrame(this.animate.bind(this));

  // loop animating toucanoo route TODO

  // arm animations loop TODO

  // render the stage
  this.renderer.render(this.stage);


};

init.prototype.makeBody = function() {
  // add name container banner
  this.banner = new PIXI.Sprite.fromFrame('b1.png');
  this.banner.anchor.x = 0.5;
  this.banner.anchor.y = 0.5;
  this.banner.position.x = this.cWidth / 2;
  this.banner.position.y = 40;
  // Add when exporting - when to add child/toucanoo name? Popup modal? TODO
  // this.viewport.addChild(this.banner);

  // construct base toucanoo
  this.initBody = new body(this.route, this.cWidth, this.cHeight);

};

init.prototype.makeArms = function() {
  // construct toucanoo arms

  // change to mesh sprite TODO

  this.initArm = new arm();
  // arm sprites
  this.armSpriteR = new PIXI.Sprite(this.rt);
  this.armSpriteR.anchor.set(0.85,0.5);
  this.route.addChild(this.armSpriteR);
  this.armSpriteR.rotation = - 0.88;
  this.armSpriteR.position.set(185,395);
  // Rarm pivot visual
  this.visualPivotR = new PIXI.Circle(this.armSpriteR.position.x, this.armSpriteR.position.y, 5);
  this.drawHit = new PIXI.Graphics();
  this.drawHit.beginFill(0xffd900);
  this.drawHit.drawShape(this.visualPivotR);

  this.armSpriteL = new PIXI.Sprite(this.rt);
  this.armSpriteL.anchor.set(0.85,0.5);
  this.armSpriteL.scale.x = -1;
  this.route.addChild(this.armSpriteL);
  this.armSpriteL.rotation = 0.88;
  this.armSpriteL.position.set(416,395);
  // Larm pivot visual
  this.visualPivotR = new PIXI.Circle(this.armSpriteL.position.x, this.armSpriteL.position.y, 5);
  this.drawHit.drawShape(this.visualPivotR);
  this.route.addChild(this.drawHit);


};

init.prototype.changeArms = function(id) {
  // change arms TODO
  // if clothes
};


module.exports = new init();
