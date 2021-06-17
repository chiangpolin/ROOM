import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useDrop} from 'react-dnd';
import styled from 'styled-components';
import {selectCanvasElement} from '../../../app/actions/index.js';
import {ItemTypes} from '../../../app/constants/dragTypes.js';
import * as theme from '../../../app/constants/theme.js';
import * as pixi from '../../../app/utils/pixi.js';

function Canvas() {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const [pixiApp, setApp] = useState('');
  const [pixiOpeningContainer, setOpeningContainer] = useState('');
  const [pixiWallContainer, setWallContainer] = useState('');
  const [pixiFurnitureContainer, setFurnitureContainer] = useState('');
  const [pixiCoveringContainer, setCoveringContainer] = useState('');
  const [pixiFloorContainer, setFloorContainer] = useState('');
  const [, drop] = useDrop(() => ({
    accept: [ItemTypes.ELEMENT],
    drop: (item, monitor) => ({
      name: 'Canvas',
      position: monitor.getSourceClientOffset(),
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const {
    scale,
    instruction,
    selectedGroup,
    tool,
    ortho,
    d_furnitures,
    d_walls,
    d_openings,
    d_coverings,
    d_floors,
  } = useSelector((state) => state.project);

  useEffect(() => {
    // Sizes
    const sizes = {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
    };

    // App
    const app = pixi.initApplication(sizes, scale);
    setApp(app);

    // Containers
    const backgroundContainer = pixi.initContainer(app);

    const floorContainer = pixi.initContainer(app);
    setFloorContainer(floorContainer);
    const coveringContainer = pixi.initContainer(app);
    setCoveringContainer(coveringContainer);
    const wallContainer = pixi.initContainer(app);
    setWallContainer(wallContainer);
    const openingContainer = pixi.initContainer(app);
    setOpeningContainer(openingContainer);
    const furnitureContainer = pixi.initContainer(app);
    setFurnitureContainer(furnitureContainer);

    const drawingContainer = pixi.initContainer(app);

    // Main
    pixi.createBackground(backgroundContainer, drawingContainer, tool, ortho);
    for (let i = 0; i < d_floors.length; i++) {
      if (d_floors[i].method !== 'delete') {
        pixi.createFloor(floorContainer, d_floors[i]);
      }
    }
    for (let i = 0; i < d_coverings.length; i++) {
      if (d_coverings[i].method !== 'delete') {
        pixi.createCovering(coveringContainer, d_coverings[i]);
      }
    }
    for (let i = 0; i < d_furnitures.length; i++) {
      if (d_furnitures[i].method !== 'delete') {
        pixi.createFurniture(furnitureContainer, d_furnitures[i]);
      }
    }
    for (let i = 0; i < d_walls.length; i++) {
      if (d_walls[i].method !== 'delete') {
        pixi.createWall(wallContainer, d_walls[i]);
      }
    }
    for (let i = 0; i < d_openings.length; i++) {
      if (d_openings[i].method !== 'delete') {
        pixi.createOpening(openingContainer, d_openings[i]);
      }
    }

    // Ref
    canvasRef.current.appendChild(app.view);

    // onResize
    window.addEventListener('resize', () =>
      pixi.resizeCanvas(canvasRef, app, sizes)
    );

    return () => {
      app.destroy(true, true);
      window.removeEventListener('resize', () =>
        pixi.resizeCanvas(canvasRef, app, sizes)
      );
    };
    // eslint-disable-next-line
  }, [tool, ortho]);

  useEffect(() => {
    if (pixiApp) {
      switch (instruction.target) {
        case 'furniture':
          switch (instruction.type) {
            case 'add':
              pixi.createFurniture(
                pixiFurnitureContainer,
                d_furnitures[d_furnitures.length - 1]
              );
              break;
            case 'remove':
              for (let i = 0; i < pixiFurnitureContainer.children.length; i++)
                if (
                  pixiFurnitureContainer.children[i].id === selectedGroup.id
                ) {
                  pixiFurnitureContainer.removeChild(
                    pixiFurnitureContainer.children[i]
                  );
                }
              dispatch(selectCanvasElement({}));
              break;
            case 'rotate':
              for (let i = 0; i < pixiFurnitureContainer.children.length; i++)
                if (
                  pixiFurnitureContainer.children[i].id === selectedGroup.id
                ) {
                  pixiFurnitureContainer.children[i].angle =
                    selectedGroup.rotation.angle;
                }
              break;
            case 'deselect':
              for (let i = 0; i < pixiFurnitureContainer.children.length; i++)
                if (
                  pixiFurnitureContainer.children[i].id === selectedGroup.id
                ) {
                  pixiFurnitureContainer.children[i].filters = [];
                }
              break;
            default:
          }
          break;
        case 'floor':
          switch (instruction.type) {
            case 'add':
              pixi.createFloor(
                pixiFloorContainer,
                d_floors[d_floors.length - 1]
              );
              break;
            case 'remove':
              for (let i = 0; i < pixiFloorContainer.children.length; i++) {
                if (pixiFloorContainer.children[i].id === selectedGroup.id) {
                  pixiFloorContainer.removeChild(
                    pixiFloorContainer.children[i]
                  );
                }
              }
              dispatch(selectCanvasElement({}));
              break;
            case 'deselect':
              for (let i = 0; i < pixiFloorContainer.children.length; i++)
                if (pixiFloorContainer.children[i].id === selectedGroup.id) {
                  pixiFloorContainer.children[i].filters = [];
                }
              break;
            default:
          }
          break;
        case 'covering':
          switch (instruction.type) {
            case 'add':
              pixi.createCovering(
                pixiCoveringContainer,
                d_coverings[d_coverings.length - 1]
              );
              break;
            case 'remove':
              for (let i = 0; i < pixiCoveringContainer.children.length; i++) {
                if (pixiCoveringContainer.children[i].id === selectedGroup.id) {
                  pixiCoveringContainer.removeChild(
                    pixiCoveringContainer.children[i]
                  );
                }
              }
              dispatch(selectCanvasElement({}));
              break;
            case 'deselect':
              for (let i = 0; i < pixiCoveringContainer.children.length; i++)
                if (pixiCoveringContainer.children[i].id === selectedGroup.id) {
                  pixiCoveringContainer.children[i].filters = [];
                }
              break;
            default:
          }
          break;
        case 'wall':
          switch (instruction.type) {
            case 'add':
              pixi.createWall(pixiWallContainer, d_walls[d_walls.length - 1]);
              break;
            case 'remove':
              for (let i = 0; i < pixiWallContainer.children.length; i++) {
                if (pixiWallContainer.children[i].id === selectedGroup.id) {
                  pixiWallContainer.removeChild(pixiWallContainer.children[i]);
                }
              }
              dispatch(selectCanvasElement({}));
              break;
            case 'deselect':
              for (let i = 0; i < pixiWallContainer.children.length; i++)
                if (pixiWallContainer.children[i].id === selectedGroup.id) {
                  pixiWallContainer.children[i].filters = [];
                }
              break;
            default:
          }
          break;
        case 'opening':
          switch (instruction.type) {
            case 'add':
              pixi.createOpening(
                pixiOpeningContainer,
                d_openings[d_openings.length - 1]
              );
              break;
            case 'remove':
              for (let i = 0; i < pixiOpeningContainer.children.length; i++) {
                if (pixiOpeningContainer.children[i].id === selectedGroup.id) {
                  pixiOpeningContainer.removeChild(
                    pixiOpeningContainer.children[i]
                  );
                }
              }
              dispatch(selectCanvasElement({}));
              break;
            case 'rotate':
              for (let i = 0; i < pixiOpeningContainer.children.length; i++)
                if (pixiOpeningContainer.children[i].id === selectedGroup.id) {
                  pixiOpeningContainer.children[i].angle =
                    selectedGroup.rotation.angle;
                }
              break;
            case 'deselect':
              for (let i = 0; i < pixiOpeningContainer.children.length; i++)
                if (pixiOpeningContainer.children[i].id === selectedGroup.id) {
                  pixiOpeningContainer.children[i].filters = [];
                }
              break;
            default:
          }
          break;
        default:
      }
    }
    // eslint-disable-next-line
  }, [instruction]);

  useEffect(() => {
    if (pixiApp) {
      pixiApp.stage.scale.x = scale;
      pixiApp.stage.scale.y = scale;
    }
  }, [pixiApp, scale]);

  return (
    <Div ref={drop} role={'Canvas'}>
      <ProjectCanvasDiv ref={canvasRef} />
    </Div>
  );
}

const Div = styled.div`
  width: 100%;
  height: 100%;
`;

const ProjectCanvasDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.WHITE};
`;

export {Canvas};
