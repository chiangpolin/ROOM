import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import * as three from '../../../app/utils/three.js';

function Rendering() {
  const renderingRef = useRef(null);
  const {
    d_walls,
    d_openings,
    d_furnitures,
    d_coverings,
    d_floors,
    d_cameras,
    sceneBackgroundColor,
    sceneDirectionalLight,
    sceneHemisphereLight,
  } = useSelector((state) => state.project);

  useEffect(() => {
    // Scene
    const scene = three.scene(sceneBackgroundColor);

    // Canvas Sizes
    const sizes = {
      width: renderingRef.current.clientWidth,
      height: renderingRef.current.clientHeight,
    };

    // Lights
    const directionalLight = three.directionalLight(sceneDirectionalLight);
    scene.add(directionalLight);
    const light = three.hemisphereLight(sceneHemisphereLight);
    scene.add(light);

    // Camera
    const camera = three.perspectiveCamera(sizes);
    camera.position.set(
      d_cameras[0].position.x,
      d_cameras[0].position.z_index,
      d_cameras[0].position.y
    );

    // Renderer
    const renderer = three.webGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderingRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = three.orbitControls(camera, renderer);
    controls.update();

    // Loader
    for (let i = 0; i < d_floors.length; i++) {
      if (d_floors[i].method !== 'delete') {
        three.setFloor(renderer, scene, camera, d_floors[i]);
      }
    }
    for (let i = 0; i < d_coverings.length; i++) {
      if (d_coverings[i].method !== 'delete') {
        three.setCovering(renderer, scene, camera, d_coverings[i]);
      }
    }
    for (let i = 0; i < d_furnitures.length; i++) {
      if (d_furnitures[i].method !== 'delete') {
        three.setFurniture(renderer, scene, camera, d_furnitures[i]);
      }
    }
    for (let i = 0; i < d_walls.length; i++) {
      if (d_walls[i].method !== 'delete') {
        three.setWall(renderer, scene, camera, d_walls[i], d_openings);
      }
    }

    // onResize
    window.addEventListener('resize', () =>
      three.resizeRendering(renderingRef, sizes, camera, renderer)
    );

    // Animate
    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Current
    const current = renderingRef.current;

    return () => {
      current.removeChild(current.children[0]);
      window.removeEventListener('resize', () =>
        three.resizeRendering(renderingRef, sizes, camera, renderer)
      );
    };
    // eslint-disable-next-line
  }, [d_walls, d_coverings, d_floors, d_cameras]);

  return <RenderingDiv ref={renderingRef} />;
}

const RenderingDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export {Rendering};
