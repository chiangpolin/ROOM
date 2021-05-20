function initFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBFm5jjCzty19UxMkhaFt2dwklncPg68yc',
    authDomain: 'room-801fb.firebaseapp.com',
    projectId: 'room-801fb',
    storageBucket: 'room-801fb.appspot.com',
    messagingSenderId: '520416433358',
    appId: '1:520416433358:web:31a99b716c162619216c9f',
    measurementId: 'G-SKW8MVZEKL',
  };
  firebase.initializeApp(firebaseConfig);
}

function getSettingsByName(name) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .where('name', '==', name)
      .get()
      .then((querySnapshot) => {
        const settings = [];
        querySnapshot.forEach((doc) => {
          settings.push({id: doc.id, data: doc.data()});
        });
        if (settings.length > 0) {
          resolve(settings[0]);
        } else {
          resolve('');
        }
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  });
}

function postSettings(data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .add({
        name: data.name,
        furniture: data.furniture,
      })
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

async function update() {
  const settings = await getSettingsByName('default');
  console.log(settings);

  const data = {
    name: 'default',
    furniture: [
      {
        name: 'bed',
        id: '',
        type: 'furniture',
        position: {x: 0, y: 0},
        rotation: {angle: 0},
        dimension: {width: 145, height: 195},
        file: {svgPath: 'bed-01.svg', gltfPath: 'bed-01.gltf'},
      },
      {
        name: 'cabinet',
        id: '',
        type: 'furniture',
        position: {x: 0, y: 0},
        rotation: {angle: 0},
        dimension: {width: 45, height: 45},
        file: {svgPath: 'cabinet-01.svg', gltfPath: 'cabinet-01.gltf'},
      },
      {
        name: 'desk',
        id: '',
        type: 'furniture',
        position: {x: 0, y: 0},
        rotation: {angle: 0},
        dimension: {width: 100, height: 40},
        file: {svgPath: 'desk-02.svg', gltfPath: 'desk-02.gltf'},
      },
      {
        name: 'closet',
        id: '',
        type: 'furniture',
        position: {x: 0, y: 0},
        rotation: {angle: 0},
        dimension: {width: 55, height: 210},
        file: {svgPath: 'closet-01.svg', gltfPath: 'closet-01.gltf'},
      },
      {
        name: 'lamp',
        id: '',
        type: 'furniture',
        position: {x: 0, y: 0},
        rotation: {angle: 0},
        dimension: {width: 30, height: 30},
        file: {svgPath: 'lamp-01.svg', gltfPath: 'lamp-01.gltf'},
      },
      {
        name: 'plant',
        id: '',
        type: 'furniture',
        position: {x: 0, y: 0},
        rotation: {angle: 0},
        dimension: {width: 70, height: 50},
        file: {svgPath: 'plant-01.svg', gltfPath: 'plant-01.gltf'},
      },
    ],
  };
  const id = await postSettings(data);
  console.log(id);
}

initFirebase();
// update();
