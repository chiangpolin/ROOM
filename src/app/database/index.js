import {
  settings_data,
  paints_setting_data,
  furnitures_setting_data,
  textures_setting_data,
} from './settingsData.js';
import {
  project_data,
  camera_data,
  floor_data,
  wall_data,
  furnitures_data,
} from './projectData.js';

// initFirebase();
// updateProject();
// updateSetting();

async function updateProject() {
  const id = await postProject(project_data);
  postFloor(id, floor_data);
  postWall(id, wall_data);
  postCamera(id, camera_data);
  for (let i = 0; i < furnitures_data.length; i++) {
    postFurniture(id, furnitures_data[i]);
  }
}

async function updateSetting() {
  const id = await postSetting(settings_data);
  for (let i = 0; i < paints_setting_data.length; i++) {
    postPaintSetting(id, paints_setting_data[i]);
  }
  for (let i = 0; i < furnitures_setting_data.length; i++) {
    postFurnitureSetting(id, furnitures_setting_data[i]);
  }
  for (let i = 0; i < textures_setting_data.length; i++) {
    postTextureSetting(id, textures_setting_data[i]);
  }
}

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

function postSetting(data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .add(data)
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

function postProject(data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .add(data)
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

function postFloor(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('floors')
      .add(data)
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

function postWall(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('walls')
      .add(data)
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

function postFurniture(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('furnitures')
      .add(data)
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

function postCamera(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('cameras')
      .add(data)
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

function postPaintSetting(setting_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .doc(setting_id)
      .collection('paints')
      .add(data)
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

function postFurnitureSetting(setting_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .doc(setting_id)
      .collection('furnitures')
      .add(data)
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

function postTextureSetting(setting_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .doc(setting_id)
      .collection('textures')
      .add(data)
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}
