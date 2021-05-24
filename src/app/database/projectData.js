export const project_data = {
  name: 'Demo0',
  author_id: '',
  share_id: [],
};

export const camera_data = {
  name: 'Default-Camera',
  type: 'camera',
  position: {
    x: -300,
    y: 600,
    z_index: 300,
  },
  dimension: {
    width: 0,
    height: 0,
  },
  rotation: {
    angle: 0,
  },
};

export const floor_data = {
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

export const wall_data = {
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

export const furnitures_data = [
  {
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
  },
  {
    name: 'Cabinet',
    type: 'furniture',
    position: {
      x: -100,
      y: -130,
    },
    dimension: {
      width: 45,
      height: 45,
    },
    rotation: {
      angle: 0,
    },
    file: {
      svg_path: 'cabinet-01.svg',
      gltf_path: 'cabinet-01.gltf',
    },
  },
  {
    name: 'Cabinet',
    type: 'furniture',
    position: {
      x: 100,
      y: -130,
    },
    dimension: {
      width: 45,
      height: 45,
    },
    rotation: {
      angle: 0,
    },
    file: {
      svg_path: 'cabinet-01.svg',
      gltf_path: 'cabinet-01.gltf',
    },
  },
  {
    name: 'Desk',
    type: 'furniture',
    position: {
      x: 130,
      y: 130,
    },
    dimension: {
      width: 100,
      height: 40,
    },
    rotation: {
      angle: 0,
    },
    file: {
      svg_path: 'desk-02.svg',
      gltf_path: 'desk-02.gltf',
    },
  },
  {
    name: 'Closet',
    type: 'furniture',
    position: {
      x: -210,
      y: -50,
    },
    dimension: {
      width: 55,
      height: 210,
    },
    rotation: {
      angle: 0,
    },
    file: {
      svg_path: 'closet-01.svg',
      gltf_path: 'closet-01.gltf',
    },
  },
  {
    name: 'Lamp',
    type: 'furniture',
    position: {
      x: 210,
      y: 130,
    },
    dimension: {
      width: 30,
      height: 30,
    },
    rotation: {
      angle: 0,
    },
    file: {
      svg_path: 'lamp-01.svg',
      gltf_path: 'lamp-01.gltf',
    },
  },
  {
    name: 'Plant',
    type: 'furniture',
    position: {
      x: 200,
      y: -110,
    },
    dimension: {
      width: 70,
      height: 50,
    },
    rotation: {
      angle: 0,
    },
    file: {
      svg_path: 'plant-01.svg',
      gltf_path: 'plant-01.gltf',
    },
  },
];
