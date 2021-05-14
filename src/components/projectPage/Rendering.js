import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const RenderingRiv = styled.div`
  width: 100%;
  height: 600px;
  background-color: grey;
`;

function Rendering() {
  const ref = useRef(null);
  const groups = useSelector((state) => state.project.groups);

  useEffect(() => {
    //Scene
    const scene = new THREE.Scene();

    // Canvas Sizes
    const sizes = {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    };

    // Lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(-500, 500, -500);

    // Renderer
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ref.current.appendChild(renderer.domElement);

    // Loader
    const loader = new GLTFLoader();
    for (let i = 0; i < groups.length; i++) {
      setModel(scene, loader, groups[i]);
    }

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // onResize
    window.addEventListener('resize', () => {
      sizes.width = ref.current.clientWidth;
      sizes.height = ref.current.clientHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      ref.current.removeChild(ref.current.children[0]);
    };
  }, [groups]);

  return <RenderingRiv ref={ref} />;
}

function loadModel(loader, url) {
  return new Promise((resolve, reject) => {
    loader.load(url, (data) => resolve(data.scene.children), undefined, reject);
  });
}

async function setModel(scene, loader, obj) {
  const modelPath = await import(`../../models/${obj.file.gltfPath}`);
  const model = await loadModel(loader, modelPath.default);
  const group = new THREE.Group();
  for (const [key, mesh] of Object.entries(model)) {
    group.add(mesh);
  }
  group.scale.set(1, 1, 1);
  group.position.set(obj.position.y, 0, -obj.position.x);
  scene.add(group);
}

export {Rendering};
