import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export function initFirebase() {
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

export function login(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential.user.email);
      console.log(userCredential.user.refreshToken);
      console.log(userCredential.user.uid);
    })
    .catch((error) => {
      console.log(error.code, error.message);
    });
}

export function getUserByEmail(email) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({id: doc.id, data: doc.data()});
        });
        if (users.length > 0) {
          resolve(users[0]);
        } else {
          resolve('');
        }
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  });
}

export function getUser(id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('users')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  });
}

export function getProjects(userId) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .where('author_id', '==', userId)
      .get()
      .then((querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({id: doc.id, data: doc.data()});
        });
        resolve(projects);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  });
}

export function getSharedProjects(userId) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .where('share_id', 'array-contains', userId)
      .get()
      .then((querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({id: doc.id, data: doc.data()});
        });
        resolve(projects);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  });
}

export function getProject(id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  });
}

export function postProject(data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .add({
        name: data.name,
        author_id: data.id,
        share_id: [],
      })
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export function putProjectName(id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(id)
      .set(
        {
          name: data.name,
        },
        {merge: true}
      )
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  });
}

export function putProjectShareId(id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(id)
      .set(
        {
          share_id: data.share_id,
        },
        {merge: true}
      )
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  });
}

export function deleteProject(id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(id)
      .delete()
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  });
}

export function getWalls(project_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('walls')
      .get()
      .then((querySnapshot) => {
        const walls = [];
        querySnapshot.forEach((doc) => {
          walls.push({...doc.data(), id: doc.id});
        });
        resolve(walls);
      });
  });
}

export function postWall(project_id, data) {
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

export function putWall(project_id, wall) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('walls')
      .doc(wall.id)
      .set(
        {
          color: wall.color,
        },
        {merge: true}
      )
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  });
}

export function deleteWall(project_id, wall_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('walls')
      .doc(wall_id)
      .delete()
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  });
}

export function getFurnitures(project_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('furnitures')
      .get()
      .then((querySnapshot) => {
        const furnitures = [];
        querySnapshot.forEach((doc) => {
          furnitures.push({...doc.data(), id: doc.id});
        });
        resolve(furnitures);
      });
  });
}

export function postFurniture(project_id, data) {
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

export function putFurniture(project_id, furniture) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('furnitures')
      .doc(furniture.id)
      .set(
        {
          position: furniture.position,
          rotation: furniture.rotation,
        },
        {merge: true}
      )
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  });
}

export function deleteFurniture(project_id, furniture_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('furnitures')
      .doc(furniture_id)
      .delete()
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  });
}

export function getFloors(project_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('floors')
      .get()
      .then((querySnapshot) => {
        const floors = [];
        querySnapshot.forEach((doc) => {
          floors.push({...doc.data(), id: doc.id});
        });
        resolve(floors);
      });
  });
}

export function postFloor(project_id, data) {
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

export function putFloor(project_id, floor) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('floors')
      .doc(floor.id)
      .set(
        {
          path: floor.path,
        },
        {merge: true}
      )
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  });
}

export function deleteFloor(project_id, floor_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('floors')
      .doc(floor_id)
      .delete()
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  });
}

export function getCameras(project_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('cameras')
      .get()
      .then((querySnapshot) => {
        const cameras = [];
        querySnapshot.forEach((doc) => {
          cameras.push({...doc.data(), id: doc.id});
        });
        resolve(cameras);
      });
  });
}

export function postCamera(project_id, data) {
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

export function putCamera(project_id, camera) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('cameras')
      .doc(camera.id)
      .set(
        {
          position: camera.position,
        },
        {merge: true}
      )
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  });
}

export function deleteCamera(project_id, camera_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('cameras')
      .doc(camera_id)
      .delete()
      .then(() => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  });
}

export function getSettingByName(name) {
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

export function postSetting(data) {
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

export function getSettingPaints(settings_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .doc(settings_id)
      .collection('paints')
      .get()
      .then((querySnapshot) => {
        const paints = [];
        querySnapshot.forEach((doc) => {
          paints.push({...doc.data(), id: doc.id});
        });
        resolve(paints);
      });
  });
}

export function postSettingPaint(setting_id, data) {
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

export function getSettingTextures(settings_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .doc(settings_id)
      .collection('textures')
      .get()
      .then((querySnapshot) => {
        const textures = [];
        querySnapshot.forEach((doc) => {
          textures.push({...doc.data(), id: doc.id});
        });
        resolve(textures);
      });
  });
}

export function postSettingFurniture(setting_id, data) {
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

export function getSettingFurnitures(settings_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .doc(settings_id)
      .collection('furnitures')
      .get()
      .then((querySnapshot) => {
        const furnitures = [];
        querySnapshot.forEach((doc) => {
          furnitures.push({...doc.data(), id: doc.id});
        });
        resolve(furnitures);
      });
  });
}

export function postSettingTexture(setting_id, data) {
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
