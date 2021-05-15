import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {store} from '../../app/store';
import {updateGroups} from '../../app/actions/index';
import styled from 'styled-components';
import * as PIXI from 'pixi.js';

const ProjectCanvasDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightgrey;
`;

function ProjectCanvas() {
  const ref = useRef(null);
  const groups = useSelector((state) => state.project.groups);

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
    app.stage.scale.x = 0.5;
    app.stage.scale.y = 0.5;
    ref.current.appendChild(app.view);

    for (let i = 0; i < groups.length; i++) {
      createCanvasElement(app, groups[i]);
    }

    // onResize
    window.addEventListener('resize', () => resizeCanvas(ref, sizes, app));

    return () => {
      app.destroy(true, true);
      window.removeEventListener('resize', () => resizeCanvas(ref, sizes, app));
    };
  }, []);

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

async function createCanvasElement(app, obj) {
  const svgPath = await import(
    `../../static/images/furnitures/${obj.file.svgPath}`
  );
  const texture = PIXI.Texture.from(svgPath.default);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  const element = new PIXI.Sprite(texture);
  element.interactive = true;
  element.buttonMode = true;
  element.anchor.set(0.5);
  element.scale.set(1);
  element.id = obj.id;
  element.x = obj.position.x;
  element.y = obj.position.y;
  element
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

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
  store.dispatch(updateGroups({id: this.id, position: {x: this.x, y: this.y}}));
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}

export {ProjectCanvas};
