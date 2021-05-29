import {store} from '../store/index.js';
import {
  selectFurniture,
  setFurniturePosition,
  addCanvasElement,
} from '../actions/index.js';
import * as PIXI from 'pixi.js';
import {SVGScene} from '@pixi-essentials/svg';

export function initApplication(sizes, zoom) {
  const app = new PIXI.Application({
    width: sizes.width,
    height: sizes.height,
    backgroundAlpha: 0,
  });
  app.stage.x = app.renderer.width * 0.5;
  app.stage.y = app.renderer.height * 0.5;
  app.stage.scale.x = zoom;
  app.stage.scale.y = zoom;
  return app;
}

export function resizeCanvas(canvasRef, app, sizes) {
  if (canvasRef.current === null) {
    return;
  }
  sizes.width = canvasRef.current.clientWidth;
  sizes.height = canvasRef.current.clientHeight;

  app.renderer.resize(sizes.width, sizes.height);
  app.stage.x = app.renderer.width * 0.5;
  app.stage.y = app.renderer.height * 0.5;
}

export function createWall(app, line) {
  const newLine = new PIXI.Graphics();
  newLine.lineStyle({
    width: 15,
    color: 0x666666,
    alignment: 0.5,
    alpha: 0.5,
    join: 'miter',
    cap: 'butt',
    miterLimit: 100,
  });
  for (let i = 0; i < line.length; i++) {
    if (i === 0) {
      newLine.moveTo(line[i].x, line[i].y);
    } else {
      if (line[i].x === line[0].x && line[i].y === line[0].y) {
        newLine.closePath();
      } else {
        newLine.lineTo(line[i].x, line[i].y);
      }
    }
  }
  app.stage.addChild(newLine);
}

export function createFloor(app, polygon) {
  const newPolygon = new PIXI.Graphics();
  newPolygon.beginFill(0xff00ff);
  newPolygon.drawPolygon(
    ...polygon.map((point) => new PIXI.Point(point.x, point.y))
  );
  newPolygon.endFill();
  app.stage.addChild(newPolygon);
}

export function createBase(app, polygon) {
  const newPolygon = new PIXI.Graphics();
  newPolygon.beginFill(0xffff00);
  newPolygon.drawPolygon(
    ...polygon.map((point) => new PIXI.Point(point.x, point.y))
  );
  newPolygon.endFill();
  app.stage.addChild(newPolygon);
}

export function createBackground(app, tool) {
  const dots = [];
  const background = new PIXI.Graphics();
  background.beginFill(0xffffff, 0.1);
  background.drawRect(-500, -500, 1000, 1000);
  background.endFill();
  background.interactive = true;
  app.stage.addChild(background);

  // create line
  const previewLine = new PIXI.Graphics();
  const dispalyLine = new PIXI.Graphics();
  const drawingLine = [];
  app.stage.addChild(dispalyLine);

  // create polygon
  const previewPolygon = new PIXI.Graphics();
  const displayPolygon = new PIXI.Graphics();
  const drawingPolygon = [];
  app.stage.addChild(displayPolygon);

  background.on('click', handleClickBackground);
  background.on('mousemove', handleMouseMoveBackground);

  function handleClickBackground(event) {
    const position = event.data.getLocalPosition(background);
    switch (tool) {
      case 'frame':
        if (background.isDrawing) {
          dots.push({x: position.x, y: background.startPoint.y});
          dots.push({x: position.x, y: position.y});
          dots.push({x: background.startPoint.x, y: position.y});
          const offsetDots = offsetDotsOfPolygon(dots, 15 / 2);
          dots.push({x: background.startPoint.x, y: background.startPoint.y});
          store.dispatch(addCanvasElement('base', offsetDots));
          store.dispatch(addCanvasElement('wall', dots));
          dots.length = 0;
          background.isDrawing = false;
        } else {
          dots.push({x: position.x, y: position.y});
          background.startPoint = {x: position.x, y: position.y};
          background.isDrawing = true;
        }
        break;
      case 'polygon-frame':
        if (background.isDrawing) {
          if (
            background.startPoint.x === position.x &&
            background.startPoint.y === position.y
          ) {
            const offsetDots = offsetDotsOfPolygon(dots, 15 / 2);
            dots.push(dots[0]);
            store.dispatch(addCanvasElement('base', offsetDots));
            store.dispatch(addCanvasElement('wall', dots));
            dots.length = 0;
            drawingLine.length = 0;
            background.isDrawing = false;
          } else {
            dots.push({x: position.x, y: position.y});
            drawingLine.push({x: position.x, y: position.y});
            background.startPoint = {x: position.x, y: position.y};
          }
        } else {
          dots.push({x: position.x, y: position.y});
          drawingLine.push({x: position.x, y: position.y});
          background.startPoint = {x: position.x, y: position.y};
          background.isDrawing = true;
        }
        break;
      case 'line':
        dots.push({x: position.x, y: position.y});
        if (background.isDrawing) {
          previewLine.clear();
          background.isDrawing = false;
          store.dispatch(addCanvasElement('wall', dots));
          dots.length = 0;
        } else {
          background.isDrawing = true;
        }
        background.startPoint = {x: position.x, y: position.y};
        break;
      case 'polyline':
        dots.push({x: position.x, y: position.y});
        drawingLine.push({x: position.x, y: position.y});
        if (background.isDrawing) {
          if (
            background.startPoint.x === position.x &&
            background.startPoint.y === position.y
          ) {
            previewLine.clear();
            drawingLine.length = 0;
            background.isDrawing = false;
            store.dispatch(addCanvasElement('wall', dots));
            dots.length = 0;
          }
        } else {
          background.isDrawing = true;
        }
        background.startPoint = {x: position.x, y: position.y};
        break;
      case 'filled-rectangle':
        if (background.isDrawing) {
          dots.push({x: background.startPoint.x, y: position.y});
          dots.push({x: position.x, y: position.y});
          dots.push({x: position.x, y: background.startPoint.y});
          store.dispatch(addCanvasElement('floor', dots));
          dots.length = 0;
          background.isDrawing = false;
        } else {
          dots.push({x: position.x, y: position.y});
          background.startPoint = {x: position.x, y: position.y};
          background.isDrawing = true;
        }
        break;
      case 'filled-polygon':
        if (background.isDrawing) {
          if (
            background.startPoint.x === position.x &&
            background.startPoint.y === position.y
          ) {
            store.dispatch(addCanvasElement('floor', dots));
            dots.length = 0;
            drawingPolygon.length = 0;
            background.isDrawing = false;
          } else {
            dots.push({x: position.x, y: position.y});
            background.startPoint = {x: position.x, y: position.y};
            drawingPolygon.push({x: position.x, y: position.y});
          }
        } else {
          dots.push({x: position.x, y: position.y});
          background.startPoint = {x: position.x, y: position.y};
          drawingPolygon.push({x: position.x, y: position.y});
          background.isDrawing = true;
        }
        break;
      case 'rectangle':
        if (background.isDrawing) {
          dots.push({x: background.startPoint.x, y: position.y});
          dots.push({x: position.x, y: position.y});
          dots.push({x: position.x, y: background.startPoint.y});
          store.dispatch(addCanvasElement('base', dots));
          dots.length = 0;
          background.isDrawing = false;
        } else {
          dots.push({x: position.x, y: position.y});
          background.startPoint = {x: position.x, y: position.y};
          background.isDrawing = true;
        }
        break;
      case 'polygon':
        if (background.isDrawing) {
          if (
            background.startPoint.x === position.x &&
            background.startPoint.y === position.y
          ) {
            store.dispatch(addCanvasElement('base', dots));
            dots.length = 0;
            drawingPolygon.length = 0;
            background.isDrawing = false;
          } else {
            dots.push({x: position.x, y: position.y});
            background.startPoint = {x: position.x, y: position.y};
            drawingPolygon.push({x: position.x, y: position.y});
          }
        } else {
          dots.push({x: position.x, y: position.y});
          background.startPoint = {x: position.x, y: position.y};
          drawingPolygon.push({x: position.x, y: position.y});
          background.isDrawing = true;
        }
        break;
      default:
    }
  }

  function handleMouseMoveBackground(event) {
    if (background.isDrawing) {
      const position = event.data.getLocalPosition(background);
      switch (tool) {
        case 'frame':
          previewLine.clear();
          previewLine.lineStyle({
            width: 20,
            color: 0x666666,
            alignment: 0.5,
            alpha: 0.5,
            join: 'miter',
            cap: 'butt',
            miterLimit: 100,
          });
          previewLine
            .moveTo(background.startPoint.x, background.startPoint.y)
            .lineTo(position.x, background.startPoint.y)
            .lineTo(position.x, position.y)
            .lineTo(background.startPoint.x, position.y)
            .closePath();
          app.stage.addChild(previewLine);
          break;
        case 'polygon-frame':
          previewLine.clear();
          previewLine.lineStyle({
            width: 15,
            color: 0x000000,
            alignment: 0.5,
            alpha: 0.5,
            join: 'miter',
            cap: 'butt',
            miterLimit: 100,
          });
          previewLine.moveTo(dots[0].x, dots[0].y);
          for (let i = 1; i < dots.length; i++) {
            previewLine.lineTo(dots[i].x, dots[i].y);
          }
          previewLine.lineTo(position.x, position.y);
          previewLine.closePath();
          app.stage.addChild(previewLine);
          break;
        case 'line':
          previewLine.clear();
          previewLine.lineStyle({
            width: 15,
            color: 0x000000,
            alignment: 0.5,
            alpha: 0.5,
            join: 'miter',
            cap: 'butt',
            miterLimit: 100,
          });
          previewLine.moveTo(background.startPoint.x, background.startPoint.y);
          previewLine.lineTo(position.x, position.y);
          app.stage.addChild(previewLine);
          break;
        case 'polyline':
          previewLine.clear();
          previewLine.lineStyle({
            width: 15,
            color: 0x000000,
            alignment: 0.5,
            alpha: 0.5,
            join: 'miter',
            cap: 'butt',
            miterLimit: 100,
          });
          previewLine.moveTo(dots[0].x, dots[0].y);
          for (let i = 1; i < dots.length; i++) {
            previewLine.lineTo(dots[i].x, dots[i].y);
          }
          previewLine.lineTo(position.x, position.y);
          app.stage.addChild(previewLine);
          break;
        case 'filled-rectangle':
          previewPolygon.clear();
          previewPolygon.beginFill(0xff0000);
          previewPolygon.drawPolygon(
            new PIXI.Point(background.startPoint.x, background.startPoint.y),
            new PIXI.Point(background.startPoint.x, position.y),
            new PIXI.Point(position.x, position.y),
            new PIXI.Point(position.x, background.startPoint.y)
          );
          previewPolygon.endFill();
          app.stage.addChild(previewPolygon);
          break;
        case 'filled-polygon':
          previewPolygon.clear();
          previewPolygon.beginFill(0xff0000);
          previewPolygon.drawPolygon(
            ...drawingPolygon.map((point) => new PIXI.Point(point.x, point.y)),
            new PIXI.Point(position.x, position.y)
          );
          previewPolygon.endFill();
          app.stage.addChild(previewPolygon);
          break;
        case 'rectangle':
          previewPolygon.clear();
          previewPolygon.beginFill(0xff0000);
          previewPolygon.drawPolygon(
            new PIXI.Point(background.startPoint.x, background.startPoint.y),
            new PIXI.Point(background.startPoint.x, position.y),
            new PIXI.Point(position.x, position.y),
            new PIXI.Point(position.x, background.startPoint.y)
          );
          previewPolygon.endFill();
          app.stage.addChild(previewPolygon);
          break;
        case 'polygon':
          previewPolygon.clear();
          previewPolygon.beginFill(0xff0000);
          previewPolygon.drawPolygon(
            ...drawingPolygon.map((point) => new PIXI.Point(point.x, point.y)),
            new PIXI.Point(position.x, position.y)
          );
          previewPolygon.endFill();
          app.stage.addChild(previewPolygon);
          break;
        default:
      }
    }
  }

  function offsetDotsOfPolygon(dots, offset) {
    const new_dots = [];
    const c_dots = [dots[dots.length - 1], ...dots, dots[0]];
    for (let i = 1; i < c_dots.length - 1; i++) {
      const n_width = Math.sqrt(
        Math.pow(c_dots[i + 1].x - c_dots[i].x, 2) +
          Math.pow(c_dots[i + 1].y - c_dots[i].y, 2)
      );
      const p_width = Math.sqrt(
        Math.pow(c_dots[i - 1].x - c_dots[i].x, 2) +
          Math.pow(c_dots[i - 1].y - c_dots[i].y, 2)
      );
      const offset_dot = {
        x:
          c_dots[i].x +
          (offset / n_width) * (c_dots[i].x - c_dots[i + 1].x) +
          (offset / p_width) * (c_dots[i].x - c_dots[i - 1].x),
        y:
          c_dots[i].y +
          (offset / n_width) * (c_dots[i].y - c_dots[i + 1].y) +
          (offset / p_width) * (c_dots[i].y - c_dots[i - 1].y),
      };
      new_dots.push(offset_dot);
    }
    return new_dots;
  }
}

export async function createRoom(app, obj) {
  const svgPath = await import(
    `../../static/images/furniture/${obj.file.svg_path}`
  );

  const texture = PIXI.Texture.from(svgPath.default);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const element = new PIXI.Sprite(texture);
  element.interactive = true;
  element.buttonMode = true;
  element.anchor.set(0.5);
  element.scale.set(1);
  element.id = obj.id;
  element.name = obj.name;
  element.type = obj.type;
  element.file = obj.file;
  element.x = obj.position.x;
  element.y = obj.position.y;
  element.width = obj.dimension.width;
  element.height = obj.dimension.height;
  element.angle = obj.rotation.angle;

  app.stage.addChild(element);
}

export async function createCanvasElement(app, obj) {
  const svgPath = await import(
    `../../static/images/furniture/${obj.file.svg_path}`
  );

  const texture = PIXI.Texture.from(svgPath.default);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const element = new PIXI.Sprite(texture);
  element.interactive = true;
  element.buttonMode = true;
  element.anchor.set(0.5);
  element.scale.set(1);
  element.id = obj.id;
  element.name = obj.name;
  element.type = obj.type;
  element.file = obj.file;
  element.x = obj.position.x;
  element.y = obj.position.y;
  element.width = obj.dimension.width;
  element.height = obj.dimension.height;
  element.angle = obj.rotation.angle;
  element
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
    .on('click', onClick);

  app.stage.addChild(element);

  function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  function onDragEnd() {
    this.data = null;
    this.alpha = 1;
    this.dragging = false;
    store.dispatch(
      setFurniturePosition({id: this.id, position: {x: this.x, y: this.y}})
    );
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }

  function onClick() {
    store.dispatch(
      selectFurniture({
        name: this.name,
        id: this.id,
        type: this.type,
        position: {x: this.x, y: this.y},
        rotation: {angle: this.angle},
        dimension: {width: this.width, height: this.height},
        file: this.file,
      })
    );
  }
}

async function createSVGElement(app) {
  const svgPayload = await fetch(
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/De_Groot_academic_genealogy.svg'
  ).then((data) => data.text());
  const svgDOM = new DOMParser().parseFromString(svgPayload, 'image/svg+xml');
  const svgEl = svgDOM.documentElement;
  const viewport = app.stage.addChild(new PIXI.Container());
  viewport.addChild(new SVGScene(svgEl));
  app.renderer.render(app.stage);
}
