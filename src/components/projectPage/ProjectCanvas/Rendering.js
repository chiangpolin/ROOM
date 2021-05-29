import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

function Rendering() {
  const ref = useRef(null);
  const {walls, furnitures, floors, cameras, d_walls, d_floors, d_bases} =
    useSelector((state) => state.project);

  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();

    // Canvas Sizes
    const sizes = {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    };

    // Lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    scene.add(directionalLight);

    const light = new THREE.HemisphereLight(0xffffd5, 0x080820, 1);
    scene.add(light);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(
      cameras[0].position.x,
      cameras[0].position.z_index,
      cameras[0].position.y
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ref.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Loader
    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    setModel(renderer, scene, camera, glftLoader, walls[0]);
    setFloor(renderer, scene, camera, textureLoader, floors[0]);
    for (let i = 0; i < furnitures.length; i++) {
      setModel(renderer, scene, camera, glftLoader, furnitures[i]);
    }

    // walls
    for (let i = 0; i < d_walls.length; i++) {
      for (let j = 0; j < d_walls[i].length - 1; j++) {
        const x1 = d_walls[i][j].x;
        const x2 = d_walls[i][j + 1].x;
        const y1 = d_walls[i][j].y;
        const y2 = d_walls[i][j + 1].y;
        const angleRad = Math.atan((y2 - y1) / (x2 - x1));
        const angleDeg = (angleRad * 180) / Math.PI;
        const lineWid =
          Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)) + 15;

        const geometry = new THREE.BoxGeometry(lineWid, 240, 15);
        const material = new THREE.MeshStandardMaterial({color: 0xbdc0ba});
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set((x1 + x2) / 2, 120, (y1 + y2) / 2);
        cube.rotation.set(0, (angleDeg * Math.PI) / -180, 0);
        scene.add(cube);
      }
    }

    // floors
    for (let i = 0; i < d_floors.length; i++) {
      const shape = new THREE.Shape();
      shape.moveTo(d_floors[i][0].x, d_floors[i][0].y);
      for (let j = 1; j < d_floors[i].length; j++) {
        shape.lineTo(d_floors[i][j].x, d_floors[i][j].y);
      }

      const extrudeSettings = {
        depth: 1,
        bevelEnabled: false,
        bevelSegments: 0,
        steps: 1,
        bevelSize: 0,
        bevelThickness: 0,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshStandardMaterial({color: 0xffff00});
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
      mesh.position.y = 1;
      scene.add(mesh);
    }

    // bases
    for (let i = 0; i < d_bases.length; i++) {
      const shape = new THREE.Shape();
      shape.moveTo(d_bases[i][0].x, d_bases[i][0].y);
      for (let j = 1; j < d_bases[i].length; j++) {
        shape.lineTo(d_bases[i][j].x, d_bases[i][j].y);
      }

      const extrudeSettings = {
        depth: 15,
        bevelEnabled: false,
        bevelSegments: 0,
        steps: 1,
        bevelSize: 0,
        bevelThickness: 0,
      };

      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      const material = new THREE.MeshStandardMaterial({color: 0xffffff});
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
      scene.add(mesh);
    }

    // onResize
    window.addEventListener('resize', () =>
      resizeRendering(ref, sizes, camera, renderer)
    );

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
    const current = ref.current;

    return () => {
      current.removeChild(current.children[0]);
      window.removeEventListener('resize', () =>
        resizeRendering(ref, sizes, camera, renderer)
      );
    };
    // eslint-disable-next-line
  }, [walls, furnitures, floors, cameras]);

  return <RenderingDiv ref={ref} />;
}

function resizeRendering(ref, sizes, camera, renderer) {
  if (ref.current === null) {
    return;
  }
  sizes.width = ref.current.clientWidth;
  sizes.height = ref.current.clientHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function loadModel(loader, url) {
  return new Promise((resolve, reject) => {
    loader.load(url, (data) => resolve(data.scene.children), undefined, reject);
  });
}

async function setFloor(renderer, scene, camera, loader, floor) {
  const texturePath = await import(
    `../../../static/images/texture/${floor.path}`
  );
  const texture = loader.load(texturePath.default);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  const geometry1 = new THREE.BoxGeometry(470, 2, 300);
  const material1 = new THREE.MeshBasicMaterial({color: 0xffffff});
  const mesh1 = new THREE.Mesh(geometry1, material1);
  mesh1.material.map = texture;
  scene.add(mesh1);
  renderer.render(scene, camera);
}

async function setModel(renderer, scene, camera, loader, obj) {
  const modelPath = await import(
    `../../../static/models/${obj.file.gltf_path}`
  );
  const model = await loadModel(loader, modelPath.default);
  const group = new THREE.Group();

  switch (obj.type) {
    case 'wall':
      // eslint-disable-next-line
      for (const [key, mesh] of Object.entries(model)) {
        mesh.material.color = new THREE.Color(
          `rgb(${obj.color.r}, ${obj.color.g}, ${obj.color.b})`
        );
        group.add(mesh);
      }
      break;

    default:
      // eslint-disable-next-line
      for (const [key, mesh] of Object.entries(model)) {
        group.add(mesh);
      }
  }

  group.scale.set(1, 1, 1);
  group.position.set(obj.position.x, 0, obj.position.y);
  group.rotation.set(0, -(obj.rotation.angle * Math.PI) / 180, 0);

  scene.add(group);
  renderer.render(scene, camera);
  // const url = renderer.domElement.toDataURL();
  // console.log(url);
}

const RenderingDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #81c7d4;
`;

export {Rendering};
