import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {
  initApplication,
  resizeCanvas,
  createBackground,
  createWall,
  createFloor,
  createBase,
  createRoom,
  createCanvasElement,
} from '../../../app/utils/pixi.js';

function Canvas() {
  const canvasRef = useRef(null);
  const [pixiApp, setPixiApp] = useState('');
  const {
    scale,
    walls,
    furnitures,
    instruction,
    d_walls,
    d_floors,
    d_bases,
    tool,
  } = useSelector((state) => state.project);

  useEffect(() => {
    // Sizes
    const sizes = {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
    };

    // App
    const app = initApplication(sizes, scale);
    setPixiApp(app);

    // Containers
    createBackground(app, tool);
    createRoom(app, walls[0]);
    for (let i = 0; i < furnitures.length; i++) {
      createCanvasElement(app, furnitures[i]);
    }

    for (let i = 0; i < d_bases.length; i++) {
      createBase(app, d_bases[i]);
    }
    for (let i = 0; i < d_floors.length; i++) {
      createFloor(app, d_floors[i]);
    }
    for (let i = 0; i < d_walls.length; i++) {
      createWall(app, d_walls[i]);
    }

    // Ref
    canvasRef.current.appendChild(app.view);

    // onResize
    window.addEventListener('resize', () =>
      resizeCanvas(canvasRef, app, sizes)
    );

    return () => {
      app.destroy(true, true);
      window.removeEventListener('resize', () =>
        resizeCanvas(canvasRef, app, sizes)
      );
    };
    // eslint-disable-next-line
  }, [tool]);

  useEffect(() => {
    if (pixiApp) {
      switch (instruction.type) {
        case 'add':
          createCanvasElement(pixiApp, instruction.furniture);
          break;

        case 'remove':
          for (let i = 0; i < pixiApp.stage.children.length; i++)
            if (pixiApp.stage.children[i].id === instruction.furniture.id) {
              pixiApp.stage.removeChild(pixiApp.stage.children[i]);
            }
          break;

        case 'rotate':
          for (let i = 0; i < pixiApp.stage.children.length; i++)
            if (pixiApp.stage.children[i].id === instruction.furniture.id) {
              pixiApp.stage.children[i].angle =
                instruction.furniture.rotation.angle;
            }
          break;

        default:
      }
    }
    // eslint-disable-next-line
  }, [instruction]);

  useEffect(() => {
    if (pixiApp) {
      createWall(pixiApp, d_walls[d_walls.length - 1]);
    }
  }, [d_walls]);

  useEffect(() => {
    if (pixiApp) {
      createFloor(pixiApp, d_floors[d_floors.length - 1]);
    }
  }, [d_floors]);

  useEffect(() => {
    if (pixiApp) {
      createBase(pixiApp, d_bases[d_bases.length - 1]);
    }
  }, [d_bases]);

  useEffect(() => {
    if (pixiApp) {
      pixiApp.stage.scale.x = scale;
      pixiApp.stage.scale.y = scale;
    }
  }, [scale]);

  return <ProjectCanvasDiv ref={canvasRef} />;
}

const ProjectCanvasDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightgrey;
`;

export {Canvas};
