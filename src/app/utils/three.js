import * as THREE from 'three';
import {CSG} from 'three-csg-ts';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {setRenderingDataURL} from '../actions/index.js';
import {RGBToHex} from '../utils/general.js';
import {store} from '../store/index.js';

export function scene(color) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(color);
  return scene;
}

export function directionalLight(intensity) {
  return new THREE.DirectionalLight(0xffffff, intensity);
}

export function hemisphereLight(intensity) {
  return new THREE.HemisphereLight(0xffffd5, 0x080820, intensity);
}

export function perspectiveCamera(sizes) {
  return new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 2000);
}

export function webGLRenderer() {
  return new THREE.WebGLRenderer({alpha: true});
}

export function orbitControls(camera, renderer) {
  return new OrbitControls(camera, renderer.domElement);
}

export function resizeRendering(ref, sizes, camera, renderer) {
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

export function loadModel(loader, url) {
  return new Promise((resolve, reject) => {
    loader.load(url, (data) => resolve(data.scene.children), undefined, reject);
  });
}

export async function setFloor(renderer, scene, camera, floor) {
  const polygon = floor.graphic;
  const shape = new THREE.Shape();
  shape.moveTo(polygon[0].x, polygon[0].y);
  for (let i = 1; i < polygon.length; i++) {
    shape.lineTo(polygon[i].x, polygon[i].y);
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
  renderer.render(scene, camera);
}

export async function setCovering(renderer, scene, camera, covering) {
  const polygon = covering.graphic;
  const shape = new THREE.Shape();
  shape.moveTo(polygon[0].x, polygon[0].y);
  for (let i = 1; i < polygon.length; i++) {
    shape.lineTo(polygon[i].x, polygon[i].y);
  }

  const loader = new THREE.TextureLoader();
  const path = await import(`../../static/images/texture/${covering.path}`);
  const texture = loader.load(path.default);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  if (covering.path === 'kanahei.jpeg') {
    texture.repeat.set(-0.005, -0.005);
  } else {
    texture.repeat.set(0.01, 0.01);
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
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  material.map = texture;
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
  mesh.position.y = 1;
  scene.add(mesh);
  renderer.render(scene, camera);
}

export async function setFurniture(renderer, scene, camera, obj) {
  const loader = new GLTFLoader();
  const path = await import(`../../static/models/${obj.file.gltf_path}`);
  const model = await loadModel(loader, path.default);

  const group = new THREE.Group();
  for (const [key, mesh] of Object.entries(model)) {
    // mesh.material = new THREE.MeshStandardMaterial({color: 0xffffff});
    group.add(mesh);
  }
  group.scale.set(1, 1, 1);
  group.position.set(obj.position.x, 0, obj.position.y);
  group.rotation.set(0, -(obj.rotation.angle * Math.PI) / 180, 0);

  scene.add(group);
  renderer.render(scene, camera);
  const url = renderer.domElement.toDataURL();
  store.dispatch(setRenderingDataURL(url));
}

export async function setWall(renderer, scene, camera, wall, openings) {
  const line = wall.graphic;
  const color = RGBToHex(wall.color.r, wall.color.g, wall.color.b);
  const subtractCubes = [];
  for (let i = 0; i < openings.length; i++) {
    if (openings[i].type === 'window' && openings[i].method !== 'delete') {
      const loader = new GLTFLoader();
      const path = await import(
        `../../static/models/${openings[i].file.gltf_path}`
      );
      const model = await loadModel(loader, path.default);

      const group = new THREE.Group();
      for (const [key, mesh] of Object.entries(model)) {
        group.add(mesh);
      }
      group.scale.set(1, 1, 1);
      group.position.set(
        openings[i].position.x,
        openings[i].position.z_index,
        openings[i].position.y
      );
      group.rotation.set(0, (openings[i].rotation.angle * Math.PI) / -180, 0);
      scene.add(group);
    }

    const geometry = new THREE.BoxGeometry(
      openings[i].dimension.width,
      openings[i].dimension.length,
      openings[i].dimension.height
    );
    const material = new THREE.MeshStandardMaterial({color: 0xffff00});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      openings[i].position.x,
      openings[i].position.z_index,
      openings[i].position.y
    );
    cube.rotation.set(0, (openings[i].rotation.angle * Math.PI) / -180, 0);
    cube.updateMatrix();
    subtractCubes.push(cube);
  }
  for (let i = 0; i < (line.length - 1) / 2; i++) {
    const x1 = line[i].x;
    const x2 = line[i + 1].x;
    const y1 = line[i].y;
    const y2 = line[i + 1].y;
    const angleRad = Math.atan((y2 - y1) / (x2 - x1));
    const angleDeg = (angleRad * 180) / Math.PI;
    const lineWid = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)) + 15;

    const geometry = new THREE.BoxGeometry(lineWid, 240, 15);
    const material = new THREE.MeshStandardMaterial({color: color});
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set((x1 + x2) / 2, 120, (y1 + y2) / 2);
    cube.rotation.set(0, (angleDeg * Math.PI) / -180, 0);
    cube.updateMatrix();
    for (let i = 0; i < subtractCubes.length; i++) {
      cube = CSG.subtract(cube, subtractCubes[i]);
    }
    scene.add(cube);
  }
  renderer.render(scene, camera);
}
