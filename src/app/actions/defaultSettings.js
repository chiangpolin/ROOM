export const bed = {
  name: 'Bed',
  type: 'furniture',
  position: {
    x: 0,
    y: -50,
  },
  dimension: {
    width: 145,
    height: 195,
  },
  rotation: {
    angle: 0,
  },
  file: {
    gltf_path: 'bed-01.gltf',
    svg_path: 'bed-01.svg',
  },
};

export const wall = {
  name: 'Bedroom',
  type: 'wall',
  position: {
    x: 0,
    y: 0,
  },
  dimension: {
    width: 500,
    height: 330,
  },
  rotation: {
    angle: 0,
  },
  color: {
    r: 252,
    g: 250,
    b: 242,
  },
  file: {
    gltf_path: 'room.gltf',
    svg_path: 'room.svg',
  },
};

export const floor = {
  name: 'Bedroom',
  type: 'floor',
  position: {
    x: 0,
    y: 0,
  },
  dimension: {
    width: 0,
    height: 0,
  },
  rotation: {
    angle: 0,
  },
  path: 'kitchen-wood.jpg',
};

export const camera = {
  name: 'Default-Camera',
  type: 'camera',
  position: {
    x: -300,
    y: 600,
    z_index: 400,
  },
  dimension: {
    width: 0,
    height: 0,
  },
  rotation: {
    angle: 0,
  },
};
