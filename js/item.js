// Make items

var item = function (id, image) {
    this.id = id;
    console.log('new item added ID:' + this.id);
    console.log(image);
    PIXI.Sprite.call(this, image);
    this.image = image;
    this.interactive = true;
    this.buttonMode = true;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = 200;
    this.position.y = 400;

    this
  // events for drag start
    .on('mousedown', this.onDragStart.bind(this))
    .on('touchstart', this.onDragStart.bind(this))
    // events for drag end
    .on('mouseup', this.onDragEnd.bind(this))
    .on('mouseupoutside', this.onDragEnd.bind(this))
    .on('touchend', this.onDragEnd.bind(this))
    .on('touchendoutside', this.onDragEnd.bind(this))
    // events for drag move
    .on('mousemove', this.onDragMove.bind(this))
    .on('touchmove', this.onDragMove.bind(this));
  };

  item.prototype = Object.create(PIXI.Sprite.prototype);
  item.prototype.constructor = item;

  // Need to include touch control - handle multitouch
  item.prototype.onDragStart = function(event) {
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      this.data = event.data;
      this.alpha = 0.5;
      this.dragging = true;
      // if not added to body container, (remove from stage and) add to body container
  };

  item.prototype.onDragEnd = function(event) {

      this.alpha = 1;

      this.dragging = false;

      // set the interaction data to null
      this.data = null;
  };

  item.prototype.onDragMove = function(event) {
      if (this.dragging)
      {
          var newPosition = this.data.getLocalPosition(this.parent);
          this.position.x = newPosition.x;
          this.position.y = newPosition.y;
      }
  };

module.exports = item;
