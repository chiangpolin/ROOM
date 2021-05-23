import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

function Rendering() {
  const ref = useRef(null);
  const {groups, room, floor} = useSelector((state) => state.project);
  const defaultCamera = useSelector((state) => state.project.camera);

  useEffect(() => {
    //Scene
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
      10000
    );
    camera.position.set(
      defaultCamera.position.x,
      defaultCamera.position.z_index,
      defaultCamera.position.y
    );

    // Renderer
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ref.current.appendChild(renderer.domElement);

    // Loader
    const glftLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    setModel(scene, glftLoader, room);
    setFloor(scene, textureLoader, floor);
    for (let i = 0; i < groups.length; i++) {
      setModel(scene, glftLoader, groups[i]);
    }

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

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

    return () => {
      // ref.current.removeChild(ref.current.children[0]);
      window.removeEventListener('resize', () =>
        resizeRendering(ref, sizes, camera, renderer)
      );
    };
    // eslint-disable-next-line
  }, [groups]);

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

async function setFloor(scene, loader, floor) {
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
}

async function setModel(scene, loader, obj) {
  const modelPath = await import(`../../../static/models/${obj.file.gltfPath}`);
  const model = await loadModel(loader, modelPath.default);
  const group = new THREE.Group();

  switch (obj.type) {
    case 'room':
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
}

const RenderingDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #81c7d4;
`;

export {Rendering};
