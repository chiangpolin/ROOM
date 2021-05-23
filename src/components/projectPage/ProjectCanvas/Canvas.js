import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {store} from '../../../app/store/index.js';
import {selectGroup, setGroupPosition} from '../../../app/actions/index.js';
import * as PIXI from 'pixi.js';
// import {SVGScene} from '@pixi-essentials/svg';

function Canvas() {
  const [DOMapp, setDOMapp] = useState('');
  const ref = useRef(null);
  const {groups, room, instruction} = useSelector((state) => state.project);

  useEffect(() => {
    // Sizes
    const sizes = {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    };

    // Canvas
    const app = new PIXI.Application({
      width: sizes.width,
      height: sizes.height,
      backgroundAlpha: 0,
    });

    app.stage.x = app.renderer.width * 0.5;
    app.stage.y = app.renderer.height * 0.5;
    app.stage.scale.x = 1;
    app.stage.scale.y = 1;
    ref.current.appendChild(app.view);

    createRoom(app, room);
    for (let i = 0; i < groups.length; i++) {
      createCanvasElement(app, groups[i]);
    }

    setDOMapp(app);

    // onResize
    window.addEventListener('resize', () => resizeCanvas(ref, sizes, app));

    return () => {
      app.destroy(true, true);
      window.removeEventListener('resize', () => resizeCanvas(ref, sizes, app));
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (DOMapp) {
      switch (instruction.type) {
        case 'add':
          createCanvasElement(DOMapp, instruction.group);
          break;

        case 'remove':
          for (let i = 0; i < DOMapp.stage.children.length; i++)
            if (DOMapp.stage.children[i].id === instruction.group.id) {
              DOMapp.stage.removeChild(DOMapp.stage.children[i]);
            }
          break;

        case 'rotate':
          for (let i = 0; i < DOMapp.stage.children.length; i++)
            if (DOMapp.stage.children[i].id === instruction.group.id) {
              DOMapp.stage.children[i].angle = instruction.group.rotation.angle;
            }
          break;

        default:
          console.log('Instruction type is not defined');
      }
    }
    // eslint-disable-next-line
  }, [instruction]);

  return <ProjectCanvasDiv ref={ref} />;
}

function resizeCanvas(ref, sizes, app) {
  if (ref.current === null) {
    return;
  }
  sizes.width = ref.current.clientWidth;
  sizes.height = ref.current.clientHeight;

  app.renderer.resize(sizes.width, sizes.height);
  app.stage.x = app.renderer.width * 0.5;
  app.stage.y = app.renderer.height * 0.5;
}

async function createRoom(app, obj) {
  const svgPath = await import(
    `../../../static/images/furniture/${obj.file.svgPath}`
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

async function createCanvasElement(app, obj) {
  const svgPath = await import(
    `../../../static/images/furniture/${obj.file.svgPath}`
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
}

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
    setGroupPosition({id: this.id, position: {x: this.x, y: this.y}})
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
    selectGroup({
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

// async function test(app) {
//   const svgPayload = await fetch(
//     'https://upload.wikimedia.org/wikipedia/commons/f/fa/De_Groot_academic_genealogy.svg'
//   ).then((data) => data.text());
//   const svgDOM = new DOMParser().parseFromString(svgPayload, 'image/svg+xml');
//   const svgEl = svgDOM.documentElement;
//   const viewport = app.stage.addChild(new PIXI.Container());
//   viewport.addChild(new SVGScene(svgEl));
//   app.renderer.render(app.stage);
// }

const ProjectCanvasDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightgrey;
`;

export {Canvas};
