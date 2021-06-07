import * as PIXI from 'pixi.js';
import {OutlineFilter} from 'pixi-filters';
import {SVGScene} from '@pixi-essentials/svg';
import {
  setFurniturePosition,
  addCanvasElement,
  selectCanvasElement,
  deselectCanvasElement,
  setInformation,
} from '../actions/index.js';
import * as theme from '../constants/theme.js';
import {store} from '../store/index.js';

export function outlineFilter() {
  return new OutlineFilter(2, 0xffc408);
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

export function initApplication(sizes, scale) {
  const app = new PIXI.Application({
    width: sizes.width,
    height: sizes.height,
    backgroundAlpha: 0,
  });
  app.stage.x = app.renderer.width * 0.5;
  app.stage.y = app.renderer.height * 0.5;
  app.stage.scale.x = scale;
  app.stage.scale.y = scale;
  return app;
}

export function initContainer(app) {
  const container = new PIXI.Container();
  app.stage.addChild(container);
  return container;
}

export async function createFurniture(contanier, obj) {
  const svgPath = await import(
    `../../static/images/furniture/${obj.file.svg_path}`
  );

  const element = new PIXI.Sprite.from(svgPath.default);
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

  contanier.addChild(element);

  function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  function onDragEnd() {
    this.data = null;
    this.alpha = 1;
    this.dragging = false;
    store.dispatch(setFurniturePosition(this.id, {x: this.x, y: this.y}));
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }

  function onClick() {
    const selectedGroup = store.getState().project.selectedGroup;
    if (selectedGroup.id !== this.id) {
      store.dispatch(deselectCanvasElement(selectedGroup));
      this.filters = [outlineFilter()];
    }

    store.dispatch(
      selectCanvasElement({
        name: this.name,
        id: this.id,
        type: 'furniture',
        position: {x: this.x, y: this.y},
        rotation: {angle: this.angle},
        dimension: {width: this.width, height: this.height},
        file: this.file,
      })
    );
  }
}

export function createWall(container, wall) {
  const line = wall.graphic;
  const newWall = new PIXI.Container();
  const newLine = new PIXI.Graphics();
  newLine.lineStyle({
    width: wall.thickness,
    color: 0x000000,
    alignment: 0.5,
    alpha: 1,
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
  for (let i = 0; i < line.length - 1; i++) {
    if (line[i].x === line[i + 1].x && line[i].y === line[i + 1].y) {
    } else {
      const newCircle = new PIXI.Graphics();
      newCircle.beginFill(0x000000);
      newCircle.lineStyle(0);
      newCircle.drawCircle(
        ((line[i].x + line[i + 1].x) / 2 + line[i].x) / 2,
        ((line[i].y + line[i + 1].y) / 2 + line[i].y) / 2,
        wall.thickness / 2
      );
      newCircle.drawCircle(
        (line[i].x + line[i + 1].x) / 2,
        (line[i].y + line[i + 1].y) / 2,
        wall.thickness / 2
      );
      newCircle.drawCircle(
        ((line[i].x + line[i + 1].x) / 2 + line[i + 1].x) / 2,
        ((line[i].y + line[i + 1].y) / 2 + line[i + 1].y) / 2,
        wall.thickness / 2
      );
      newCircle.endFill();
      newWall.addChild(newCircle);
    }
  }

  newWall.addChild(newLine);
  newWall.interactive = true;
  newWall.buttonMode = true;
  newWall.name = wall.name;
  newWall.id = wall.id;
  newWall.color = wall.color;
  newWall.on('click', onClick);
  container.addChild(newWall);

  function onClick() {
    const selectedGroup = store.getState().project.selectedGroup;
    if (selectedGroup.id !== this.id) {
      store.dispatch(deselectCanvasElement(selectedGroup));
      this.filters = [outlineFilter()];
    }
    store.dispatch(
      selectCanvasElement({
        name: this.name,
        id: this.id,
        type: 'wall',
        color: this.color,
        position: {x: this.x, y: this.y},
        rotation: {angle: this.angle},
        dimension: {width: this.width, height: this.height},
        file: 'none',
      })
    );
    store.dispatch(setInformation('paint'));
  }
}

export function createOpening(container, obj) {
  const newWindow = new PIXI.Container();
  const newRect = new PIXI.Graphics();
  newRect.lineStyle(1, 0x000000, 1);
  newRect.beginFill(0xffffff);
  newRect.drawRect(0, 0, obj.dimension.width, obj.dimension.height - 2);
  newRect.endFill();
  newWindow.addChild(newRect);
  newWindow.position.set(obj.position.x, obj.position.y);
  newWindow.pivot.x = obj.dimension.width / 2;
  newWindow.pivot.y = obj.dimension.height / 2;
  newWindow.angle = obj.rotation.angle;
  newWindow.interactive = true;
  newWindow.buttonMode = true;
  newWindow.name = obj.name;
  newWindow.id = obj.id;
  newWindow.type = obj.type;
  newWindow.on('click', onClick);
  container.addChild(newWindow);

  function onClick() {
    const selectedGroup = store.getState().project.selectedGroup;
    if (selectedGroup.id !== this.id) {
      store.dispatch(deselectCanvasElement(selectedGroup));
      this.filters = [outlineFilter()];
    }

    store.dispatch(
      selectCanvasElement({
        name: this.name,
        id: this.id,
        type: this.type,
        position: {x: this.x, y: this.y},
        rotation: {angle: this.angle},
        dimension: {width: this.width, height: this.height},
        file: 'none',
      })
    );
  }
}

export async function createCovering(container, covering) {
  const polygon = covering.graphic;
  const newCovering = new PIXI.Container();
  const newPolygon = new PIXI.Graphics();
  // const jpgPath = await import(`../../static/images/texture/kitchen-wood.jpg`);
  // const texture = PIXI.Texture.from(jpgPath.default);
  // newPolygon.beginTextureFill({
  //   texture: texture,
  //   color: 0xffffff,
  //   alpha: 0.6,
  //   matrix: (1, 0, 0, 1, 0, 0),
  // });
  newPolygon.beginFill(0xfffacd, 1);
  newPolygon.drawPolygon(
    ...polygon.map((point) => new PIXI.Point(point.x, point.y))
  );
  newPolygon.endFill();
  newCovering.addChild(newPolygon);
  newCovering.interactive = true;
  newCovering.buttonMode = true;
  newCovering.name = covering.name;
  newCovering.id = covering.id;
  newCovering.path = covering.path;
  newCovering.on('click', onClick);
  container.addChild(newCovering);

  function onClick() {
    const selectedGroup = store.getState().project.selectedGroup;
    if (selectedGroup.id !== this.id) {
      store.dispatch(deselectCanvasElement(selectedGroup));
      this.filters = [outlineFilter()];
    }

    store.dispatch(
      selectCanvasElement({
        name: this.name,
        id: this.id,
        path: this.path,
        type: 'covering',
        position: {x: this.x, y: this.y},
        rotation: {angle: this.angle},
        dimension: {width: this.width, height: this.height},
        file: 'none',
      })
    );
    store.dispatch(setInformation('texture'));
  }
}

export function createFloor(container, floor) {
  const polygon = floor.graphic;
  const newFloor = new PIXI.Container();
  const newPolygon = new PIXI.Graphics();
  newPolygon.beginFill(0xffffff);
  newPolygon.drawPolygon(
    ...polygon.map((point) => new PIXI.Point(point.x, point.y))
  );
  newPolygon.endFill();
  newFloor.addChild(newPolygon);
  newFloor.interactive = true;
  newFloor.buttonMode = true;
  newFloor.name = floor.name;
  newFloor.id = floor.id;
  newFloor.on('click', onClick);
  container.addChild(newFloor);

  function onClick() {
    const selectedGroup = store.getState().project.selectedGroup;
    if (selectedGroup.id !== this.id) {
      store.dispatch(deselectCanvasElement(selectedGroup));
      this.filters = [outlineFilter()];
    }

    store.dispatch(
      selectCanvasElement({
        name: this.name,
        id: this.id,
        type: 'floor',
        position: {x: this.x, y: this.y},
        rotation: {angle: this.angle},
        dimension: {width: this.width, height: this.height},
        file: 'none',
      })
    );
  }
}

export function createBackground(backgroundContainer, drawingContainer, tool) {
  const dots = [];
  const background = new PIXI.Graphics();
  background.beginFill(0xd3d3d3, 0.6);
  background.drawRect(-1000, -1000, 2000, 2000);
  background.endFill();
  background.interactive = true;
  backgroundContainer.addChild(background);

  for (let i = -1000; i <= 1000; i += 100) {
    const gridLine = new PIXI.Graphics();
    gridLine.lineStyle(2, 0xd3d3d3, 0.7);
    gridLine.moveTo(i, -1000);
    gridLine.lineTo(i, 1000);
    gridLine.endFill();
    backgroundContainer.addChild(gridLine);
  }
  for (let i = -1000; i <= 1000; i += 100) {
    const gridLine = new PIXI.Graphics();
    gridLine.lineStyle(2, 0xd3d3d3, 0.7);
    gridLine.moveTo(-1000, i);
    gridLine.lineTo(1000, i);
    gridLine.endFill();
    backgroundContainer.addChild(gridLine);
  }

  // create line
  const previewLine = new PIXI.Graphics();
  const dispalyLine = new PIXI.Graphics();
  const drawingLine = [];
  background.addChild(dispalyLine);

  // create polygon
  const previewPolygon = new PIXI.Graphics();
  const displayPolygon = new PIXI.Graphics();
  const drawingPolygon = [];
  background.addChild(displayPolygon);

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
          const floorDots = offsetDotsOfPolygon(dots, 15 / 2);
          const coveringDots = offsetDotsOfPolygon(dots, -15 / 2);
          dots.push({x: background.startPoint.x, y: background.startPoint.y});
          store.dispatch(
            addCanvasElement('floor', floorDots, {type: 'add', target: 'floor'})
          );
          store.dispatch(
            addCanvasElement('covering', coveringDots, {
              type: 'add',
              target: 'covering',
            })
          );
          store.dispatch(
            addCanvasElement('wall', dots, {type: 'add', target: 'wall'})
          );
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
            const floorDots = offsetDotsOfPolygon(dots, 15 / 2);
            const coveringDots = offsetDotsOfPolygon(dots, -15 / 2);
            dots.push(dots[0]);
            store.dispatch(
              addCanvasElement('floor', floorDots, {
                type: 'add',
                target: 'floor',
              })
            );
            store.dispatch(
              addCanvasElement('covering', coveringDots, {
                type: 'add',
                target: 'covering',
              })
            );
            store.dispatch(
              addCanvasElement('wall', dots, {type: 'add', target: 'wall'})
            );
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
          store.dispatch(
            addCanvasElement('wall', dots, {type: 'add', target: 'wall'})
          );
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
            store.dispatch(
              addCanvasElement('wall', dots, {type: 'add', target: 'wall'})
            );
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
          store.dispatch(
            addCanvasElement('covering', dots, {
              type: 'add',
              target: 'covering',
            })
          );
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
            store.dispatch(
              addCanvasElement('covering', dots, {
                type: 'add',
                target: 'covering',
              })
            );
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
          store.dispatch(
            addCanvasElement('floor', dots, {type: 'add', target: 'floor'})
          );
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
            store.dispatch(
              addCanvasElement('floor', dots, {type: 'add', target: 'floor'})
            );
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
            color: 0x005caf,
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
          drawingContainer.addChild(previewLine);
          break;
        case 'polygon-frame':
          previewLine.clear();
          previewLine.lineStyle({
            width: 15,
            color: 0x005caf,
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
          drawingContainer.addChild(previewLine);
          break;
        case 'line':
          previewLine.clear();
          previewLine.lineStyle({
            width: 15,
            color: 0x005caf,
            alignment: 0.5,
            alpha: 0.5,
            join: 'miter',
            cap: 'butt',
            miterLimit: 100,
          });
          previewLine.moveTo(background.startPoint.x, background.startPoint.y);
          previewLine.lineTo(position.x, position.y);
          drawingContainer.addChild(previewLine);
          break;
        case 'polyline':
          previewLine.clear();
          previewLine.lineStyle({
            width: 15,
            color: 0x005caf,
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
          drawingContainer.addChild(previewLine);
          break;
        case 'filled-rectangle':
          previewPolygon.clear();
          previewPolygon.beginFill(0x005caf);
          previewPolygon.drawPolygon(
            new PIXI.Point(background.startPoint.x, background.startPoint.y),
            new PIXI.Point(background.startPoint.x, position.y),
            new PIXI.Point(position.x, position.y),
            new PIXI.Point(position.x, background.startPoint.y)
          );
          previewPolygon.endFill();
          drawingContainer.addChild(previewPolygon);
          break;
        case 'filled-polygon':
          previewPolygon.clear();
          previewPolygon.beginFill(0x005caf);
          previewPolygon.drawPolygon(
            ...drawingPolygon.map((point) => new PIXI.Point(point.x, point.y)),
            new PIXI.Point(position.x, position.y)
          );
          previewPolygon.endFill();
          drawingContainer.addChild(previewPolygon);
          break;
        case 'rectangle':
          previewPolygon.clear();
          previewPolygon.beginFill(0x005caf);
          previewPolygon.drawPolygon(
            new PIXI.Point(background.startPoint.x, background.startPoint.y),
            new PIXI.Point(background.startPoint.x, position.y),
            new PIXI.Point(position.x, position.y),
            new PIXI.Point(position.x, background.startPoint.y)
          );
          previewPolygon.endFill();
          drawingContainer.addChild(previewPolygon);
          break;
        case 'polygon':
          previewPolygon.clear();
          previewPolygon.beginFill(0x005caf);
          previewPolygon.drawPolygon(
            ...drawingPolygon.map((point) => new PIXI.Point(point.x, point.y)),
            new PIXI.Point(position.x, position.y)
          );
          previewPolygon.endFill();
          drawingContainer.addChild(previewPolygon);
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

export async function createSVGElement(container) {
  const svgPayload = await fetch(
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/De_Groot_academic_genealogy.svg'
  ).then((data) => data.text());
  const svgDOM = new DOMParser().parseFromString(svgPayload, 'image/svg+xml');
  const svgEl = svgDOM.documentElement;
  container.addChild(new SVGScene(svgEl));
}
