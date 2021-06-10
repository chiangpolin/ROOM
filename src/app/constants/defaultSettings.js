import {_uuid} from '../utils/general.js';

export const newProject = {
  cameras: [
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
  ],
  furnitures: [],
  walls: [],
  openings: [],
  coverings: [],
  floors: [],
};

export const classic = {
  cameras: [
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
  ],
  furnitures: [
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
  ],
  walls: [
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
  ],
  openings: [
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
  ],
  coverings: [
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
  ],
  floors: [
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
  ],
};

export const ownersSuite = {
  cameras: [
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
  ],
  furnitures: [
    {
      name: 'Chair 06',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 107,
        y: -63,
      },
      dimension: {
        width: 55,
        height: 55,
      },
      rotation: {
        angle: 90,
      },
      file: {
        svg_path: 'chair-06.svg',
        gltf_path: 'chair-06.gltf',
      },
    },
    {
      name: 'Plant 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 247,
        y: -96.5,
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
    {
      name: 'Shelf 03',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 58,
        y: -175,
      },
      dimension: {
        width: 40,
        height: 40,
      },
      rotation: {
        angle: 0,
      },
      file: {
        svg_path: 'shelf-03.svg',
        gltf_path: 'shelf-03.gltf',
      },
    },
    {
      name: 'Chair 06',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 152,
        y: 20,
      },
      dimension: {
        width: 55,
        height: 55,
      },
      rotation: {
        angle: 0,
      },
      file: {
        svg_path: 'chair-06.svg',
        gltf_path: 'chair-06.gltf',
      },
    },
    {
      name: 'Lamp 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 256,
        y: -170,
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
      name: 'Chair 02',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 237,
        y: 130,
      },
      dimension: {
        width: 42,
        height: 46,
      },
      rotation: {
        angle: 0,
      },
      file: {
        svg_path: 'chair-02.svg',
        gltf_path: 'chair-02.gltf',
      },
    },
    {
      name: 'TV 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -62,
        y: 166,
      },
      dimension: {
        width: 180,
        height: 60,
      },
      rotation: {
        angle: 180,
      },
      file: {
        svg_path: 'tv-01.svg',
        gltf_path: 'tv-01.gltf',
      },
    },
    {
      name: 'Chair 02',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 137,
        y: 111,
      },
      dimension: {
        width: 42,
        height: 46,
      },
      rotation: {
        angle: 0,
      },
      file: {
        svg_path: 'chair-02.svg',
        gltf_path: 'chair-02.gltf',
      },
    },
    {
      name: 'Desk 02',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 232,
        y: 180,
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
      name: 'Lamp 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -176,
        y: -180,
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
      name: 'Table 06',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 169,
        y: -43,
      },
      dimension: {
        width: 75,
        height: 75,
      },
      rotation: {
        angle: 0,
      },
      file: {
        svg_path: 'table-06.svg',
        gltf_path: 'table-06.gltf',
      },
    },
    {
      name: 'Desk 02',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 128,
        y: 180,
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
      name: 'Closet 02',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -252,
        y: -136,
      },
      dimension: {
        width: 120,
        height: 52,
      },
      rotation: {
        angle: 270,
      },
      file: {
        svg_path: 'closet-02.svg',
        gltf_path: 'closet-02.gltf',
      },
    },
    {
      name: 'Closet 02',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -252,
        y: -8,
      },
      dimension: {
        width: 120,
        height: 52,
      },
      rotation: {
        angle: 270,
      },
      file: {
        svg_path: 'closet-02.svg',
        gltf_path: 'closet-02.gltf',
      },
    },
    {
      name: 'Bed 05',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -64,
        y: -86,
      },
      dimension: {
        width: 190,
        height: 220,
      },
      rotation: {
        angle: 0,
      },
      file: {
        svg_path: 'bed-05.svg',
        gltf_path: 'bed-05.gltf',
      },
    },
  ],
  walls: [
    {
      name: 'Bedroom Wall',
      id: _uuid(),
      type: 'wall',
      method: 'put',
      color: {r: 252, g: 250, b: 242},
      thickness: 15,
      graphic: [
        {x: -292.5, y: -207.5},
        {x: 292.5, y: -207.5},
        {x: 292.5, y: 207.5},
        {x: -292.5, y: 207.5},
        {x: -292.5, y: -207.5},
      ],
    },
  ],
  openings: [
    {
      name: 'Default Window',
      id: _uuid(),
      type: 'window',
      method: 'put',
      position: {x: 150, y: -207.5, z_index: 140},
      rotation: {angle: 0},
      dimension: {width: 240, height: 15, length: 120},
      file: {gltf_path: 'window-01.gltf', svg_path: ''},
    },
    {
      name: 'Default Window',
      id: _uuid(),
      type: 'window',
      method: 'put',
      position: {x: 292.5, y: 0, z_index: 140},
      rotation: {angle: 90},
      dimension: {width: 240, height: 15, length: 120},
      file: {gltf_path: 'window-01.gltf', svg_path: ''},
    },
    {
      name: 'Default Door',
      id: _uuid(),
      type: 'door',
      method: 'put',
      position: {x: -292.5, y: 155, z_index: 100},
      rotation: {angle: 90},
      dimension: {width: 90, height: 15, length: 200},
      file: {gltf_path: '', svg_path: ''},
    },
  ],
  coverings: [
    {
      name: 'Bedroom Covering',
      id: _uuid(),
      type: 'covering',
      method: 'put',
      path: 'grained-wood.jpg',
      graphic: [
        {x: -285, y: -200},
        {x: 285, y: -200},
        {x: 285, y: 200},
        {x: -285, y: 200},
        {x: -285, y: -200},
      ],
    },
  ],
  floors: [
    {
      name: 'Bedroom Floor',
      id: _uuid(),
      type: 'floor',
      method: 'put',
      color: {r: 252, g: 250, b: 242},
      graphic: [
        {x: -300, y: -215},
        {x: 300, y: -215},
        {x: 300, y: 215},
        {x: -300, y: 215},
        {x: -300, y: -215},
      ],
    },
  ],
};

export const jungle = {
  cameras: [
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
  ],
  furnitures: [
    {
      name: 'Plant 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 60,
        y: 130,
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
    {
      name: 'Plant 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 135,
        y: 130,
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
    {
      name: 'Plant 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 210,
        y: 130,
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
    {
      name: 'Plant 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 60,
        y: -130,
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
    {
      name: 'Plant 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 135,
        y: -130,
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
    {
      name: 'Plant 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 210,
        y: -130,
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
    {
      name: 'Chair 02',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -170,
        y: 10,
      },
      dimension: {
        width: 42,
        height: 46,
      },
      rotation: {
        angle: 90,
      },
      file: {
        svg_path: 'chair-02.svg',
        gltf_path: 'chair-02.gltf',
      },
    },
    {
      name: 'Closet 02',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -170,
        y: -120,
      },
      dimension: {
        width: 120,
        height: 52,
      },
      rotation: {
        angle: 0,
      },
      file: {
        svg_path: 'closet-02.svg',
        gltf_path: 'closet-02.gltf',
      },
    },
    {
      name: 'Bed 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 135,
        y: 0,
      },
      dimension: {
        width: 145,
        height: 195,
      },
      rotation: {
        angle: 90,
      },
      file: {
        svg_path: 'bed-01.svg',
        gltf_path: 'bed-01.gltf',
      },
    },
    {
      name: 'Desk 02',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -215,
        y: 10,
      },
      dimension: {
        width: 100,
        height: 40,
      },
      rotation: {
        angle: 90,
      },
      file: {
        svg_path: 'desk-02.svg',
        gltf_path: 'desk-02.gltf',
      },
    },
  ],
  walls: [
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
  ],
  openings: [
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
  ],
  coverings: [
    {
      name: 'Bedroom Covering',
      id: _uuid(),
      type: 'covering',
      method: 'put',
      path: 'rock.jpg',
      graphic: [
        {x: -235, y: -150},
        {x: 235, y: -150},
        {x: 235, y: 150},
        {x: -235, y: 150},
        {x: -235, y: -150},
      ],
    },
  ],
  floors: [
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
  ],
};

export const livingRoom = {
  cameras: [
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
  ],
  furnitures: [
    {
      name: 'Lamp 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -128,
        y: 154,
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
      name: 'Chair 06',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 166,
        y: -55,
      },
      dimension: {
        width: 55,
        height: 55,
      },
      rotation: {
        angle: 180,
      },
      file: {
        svg_path: 'chair-06.svg',
        gltf_path: 'chair-06.gltf',
      },
    },
    {
      name: 'Table 08',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -10,
        y: 10,
      },
      dimension: {
        width: 250,
        height: 100,
      },
      rotation: {
        angle: 0,
      },
      file: {
        svg_path: 'table-08.svg',
        gltf_path: 'table-08.gltf',
      },
    },
    {
      name: 'Plant 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -200,
        y: -145,
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
    {
      name: 'Chair 06',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 185,
        y: 20,
      },
      dimension: {
        width: 55,
        height: 55,
      },
      rotation: {
        angle: 270,
      },
      file: {
        svg_path: 'chair-06.svg',
        gltf_path: 'chair-06.gltf',
      },
    },
    {
      name: 'Lamp 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 112,
        y: 156,
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
      name: 'Couch 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -10,
        y: -135,
      },
      dimension: {
        width: 215,
        height: 65,
      },
      rotation: {
        angle: 0,
      },
      file: {
        svg_path: 'couch-01.svg',
        gltf_path: 'couch-01.gltf',
      },
    },
    {
      name: 'TV 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: -5,
        y: 145,
      },
      dimension: {
        width: 180,
        height: 60,
      },
      rotation: {
        angle: 180,
      },
      file: {
        svg_path: 'tv-01.svg',
        gltf_path: 'tv-01.gltf',
      },
    },
    {
      name: 'Plant 01',
      id: _uuid(),
      type: 'furniture',
      position: {
        x: 200,
        y: -148,
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
  ],
  walls: [
    {
      name: 'Living Room Wall',
      id: _uuid(),
      type: 'wall',
      method: 'put',
      color: {r: 252, g: 250, b: 242},
      thickness: 15,
      graphic: [
        {x: -242.5, y: -182.5},
        {x: 242.5, y: -182.5},
        {x: 242.5, y: 182.5},
        {x: -242.5, y: 182.5},
        {x: -242.5, y: -182.5},
      ],
    },
  ],
  openings: [
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
      position: {x: -242.5, y: 130, z_index: 100},
      rotation: {angle: 90},
      dimension: {width: 90, height: 15, length: 200},
      file: {gltf_path: '', svg_path: ''},
    },
  ],
  coverings: [
    {
      name: 'Living Room Covering',
      id: _uuid(),
      type: 'covering',
      method: 'put',
      path: 'beach.jpg',
      graphic: [
        {x: -235, y: -175},
        {x: 235, y: -175},
        {x: 235, y: 175},
        {x: -235, y: 175},
        {x: -235, y: -175},
      ],
    },
  ],
  floors: [
    {
      name: 'Living Room Floor',
      id: _uuid(),
      type: 'floor',
      method: 'put',
      color: {r: 252, g: 250, b: 242},
      graphic: [
        {x: -250, y: -190},
        {x: 250, y: -190},
        {x: 250, y: 190},
        {x: -250, y: 190},
        {x: -250, y: -190},
      ],
    },
  ],
};
