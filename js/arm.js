// arm constructor

var arm = function () {

  this.armCanvas = new PIXI.Container();

  this.flipToggle = false;

  // Place base arm container
  this.armCanvas.pivot.x = 200 / 2;
  this.armCanvas.pivot.y = 80 / 2;
  this.armCanvas.position.x = 200 / 2 + 2;
  this.armCanvas.position.y = 80 / 2 + 2;

  this.armBase = new PIXI.Sprite.fromFrame('a1.png');
  this.armCanvas.addChild(this.armBase);
  this.armBase.alpha = 1;

  this.armFlip = new PIXI.Sprite.fromFrame('a2.png');
  this.armCanvas.addChild(this.armFlip);
  this.armFlip.alpha = 0;

  // Tweak positions of clothing items - do we need to redo some textures? TODO

  this.armTshirt = new PIXI.Sprite.fromFrame('a3.png');
  this.armCanvas.addChild(this.armTshirt);
  this.armTshirt.alpha = 0;

  this.armJumper = new PIXI.Sprite.fromFrame('a4.png');
  this.armCanvas.addChild(this.armJumper);
  this.armJumper.alpha = 0;

  this.armPjs = new PIXI.Sprite.fromFrame('a5.png');
  this.armCanvas.addChild(this.armPjs);
  this.armPjs.alpha = 0;

  // test frame for canvas
  this.testFrame = new PIXI.Graphics();
  this.testFrame.lineStyle(1, 0xffd900, 1);
  this.armCanvas.addChild(this.testFrame);

  this.testFrame.moveTo(0,0);
  this.testFrame.lineTo(192, 0);
  this.testFrame.lineTo(192, 78);
  this.testFrame.lineTo(0, 78);
  this.testFrame.lineTo(0, 0);

};

arm.prototype.changeArmClothes = function(id) {
  // expose arm clothes changing API
  if (id === '40') {
    // PJs
    this.armTshirt.alpha = 0;
    this.armJumper.alpha = 0;
    this.armPjs.alpha = 1;

  } else if (id === '35') {
    // Jumper
    this.armTshirt.alpha = 0;
    this.armJumper.alpha = 1;
    this.armPjs.alpha = 0;

  } else if (id === '32') {
    // T-shirt
    this.armTshirt.alpha = 1;
    this.armJumper.alpha = 0;
    this.armPjs.alpha = 0;

  } else if (id === '30') {
    this.armTshirt.alpha = 0;
    this.armJumper.alpha = 0;
    this.armPjs.alpha = 0;
  } else if (id === '45') {
    this.armTshirt.alpha = 0;
    this.armJumper.alpha = 0;
    this.armPjs.alpha = 0;
  }

};

arm.prototype.toggleArmHand = function() {
  // expose arm hand flipping API for animations
  if (!this.flipToggle) {
    this.armFlip.alpha = 1;
    this.armBase.alpha = 0;
    this.flipToggle = true;
    console.log('flipping the arm');
  } else {
    this.armFlip.alpha = 0;
    this.armBase.alpha = 1;
    this.flipToggle = false;
    console.log('flipping the arm back');
  }
};

module.exports = arm;
