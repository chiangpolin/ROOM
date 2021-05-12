// Canvas
const app = new PIXI.Application({transparent: true});
document.getElementById('project').appendChild(app.view);

// Main
createSvgElement('images/furnitures/bed.svg', obj1);
createSvgElement('images/furnitures/bed.svg', obj2);

function createSvgElement(file, obj) {
  const texture = PIXI.Texture.from(file);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST; // Scale mode for pixelation

  const element = new PIXI.Sprite(texture);
  element.interactive = true; // respond to mouse and touch events
  element.buttonMode = true; // hand cursor
  element.anchor.set(0.5); // center anchor point
  element.scale.set(1);

  // setup events for mouse + touch using
  // the pointer events
  element
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
    .on('click', onClick);

  element.x = obj.x + app.screen.width / 2;
  element.y = obj.y + app.screen.height / 2;
  element.id = obj.id;
  console.log(element);

  app.stage.addChild(element);
}

function onClick(event) {
  console.log(event.target.x, event.target.y);
}

function onDragStart(event) {
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;

  const startPosition = this.data.getLocalPosition(this.parent);
  this.startX = startPosition.x;
  this.startY = startPosition.y;
}

function onDragEnd() {
  const endPosition = this.data.getLocalPosition(this.parent);
  this.endX = endPosition.x;
  this.endY = endPosition.y;

  const delta = {x: 0, y: 0};
  delta.x = this.endX - this.startX;
  delta.y = this.endY - this.startY;

  if (this.id === obj1.id) {
    obj1.x = obj1.x + delta.x;
    obj1.y = obj1.y + delta.y;
  }

  if (this.id === obj2.id) {
    obj2.x = obj2.x + delta.x;
    obj2.y = obj2.y + delta.y;
  }

  this.data = null;
  this.alpha = 1;
  this.dragging = false;
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}
