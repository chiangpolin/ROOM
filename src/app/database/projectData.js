function _uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
}

export const project_data = {
  name: 'Sprint 3 demo',
  author_id: '',
  share_id: [],
};

export const cameras_data = [
  {
    name: 'Default-Camera',
    id: _uuid(),
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
  },
];

export const coverings_data = [
  {
    name: 'Bedroom Covering',
    id: _uuid(),
    type: 'covering',
    method: 'put',
    path: 'kitchen-wood.jpg',
    graphic: [
      {x: -235, y: -150},
      {x: 235, y: -150},
      {x: 235, y: 150},
      {x: -235, y: 150},
      {x: -235, y: -150},
    ],
  },
];

export const openings_data = [
  {
    name: 'Default Window',
    id: _uuid(),
    type: 'window',
    method: 'put',
    position: {x: 242.5, y: 0, z_index: 140},
    rotation: {angle: 90},
    dimension: {width: 240, height: 15, length: 120},
    file: {gltf_path: 'window-01.gltf', svg_path: ''},
  },
  {
    name: 'Default Door',
    id: _uuid(),
    type: 'door',
    method: 'put',
    position: {x: -242.5, y: 105, z_index: 100},
    rotation: {angle: 90},
    dimension: {width: 90, height: 15, length: 200},
    file: {gltf_path: '', svg_path: ''},
  },
];

export const floors_data = [
  {
    name: 'Bedroom Floor',
    id: _uuid(),
    type: 'floor',
    method: 'put',
    color: {r: 252, g: 250, b: 242},
    graphic: [
      {x: -250, y: -165},
      {x: 250, y: -165},
      {x: 250, y: 165},
      {x: -250, y: 165},
      {x: -250, y: -165},
    ],
  },
];

export const walls_data = [
  {
    name: 'Bedroom Wall',
    id: _uuid(),
    type: 'wall',
    method: 'put',
    color: {r: 252, g: 250, b: 242},
    thickness: 15,
    graphic: [
      {x: -242.5, y: -157.5},
      {x: 242.5, y: -157.5},
      {x: 242.5, y: 157.5},
      {x: -242.5, y: 157.5},
      {x: -242.5, y: -157.5},
    ],
  },
];

export const furnitures_data = [
  {
    name: 'Bed',
    id: _uuid(),
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
    id: _uuid(),
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
    id: _uuid(),
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
    id: _uuid(),
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
    id: _uuid(),
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
    id: _uuid(),
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
    id: _uuid(),
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
