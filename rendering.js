import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';
import {GLTFLoader} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// Debug
// const gui = new dat.GUI();

async function init() {
  // Scene
  const scene = new THREE.Scene();

  // Canvas
  const canvas = document.querySelector('#rendering canvas');

  // Canvas Sizes
  const sizes = {
    width: (8 * window.innerWidth) / 10,
    height: (8 * window.innerHeight) / 10,
  };

  window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = (8 * window.innerWidth) / 10;
    sizes.height = (8 * window.innerHeight) / 10;

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

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
  const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Loader
  const loader = new GLTFLoader();
  setModel(scene, loader, obj1);
  setModel(scene, loader, obj2);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // Button
  const button = document.getElementById('render-button');
  button.onclick = () => {
    moveModel(scene);
    renderer.render(scene, camera);
  };

  // Animate
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
}

function loadModel(loader, url) {
  return new Promise((resolve, reject) => {
    loader.load(url, (data) => resolve(data.scene.children), undefined, reject);
  });
}

async function setModel(scene, loader, obj) {
  const model = await loadModel(loader, obj.path);
  const group = new THREE.Group();
  for (const [key, mesh] of Object.entries(model)) {
    group.add(mesh);
  }
  group.scale.set(1, 1, 1);
  group.position.set(obj.y, 0, -obj.x);
  scene.add(group);
  obj.uuid = group.uuid;
}

function moveModel(scene) {
  for (let i = 0; i < scene.children.length; i++) {
    if (scene.children[i].uuid == obj1.uuid) {
      scene.children[i].position.set(obj1.y, 0, -obj1.x);
    }
    if (scene.children[i].uuid == obj2.uuid) {
      scene.children[i].position.set(obj2.y, 0, -obj2.x);
    }
  }
}

init();
