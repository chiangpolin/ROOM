import firebase from 'firebase/app';
import 'firebase/firestore';

export function getUserByEmail(email) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('users')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({...doc.data(), id: doc.id});
        });
        if (users.length > 0) {
          resolve(users[0]);
        } else {
          resolve({id: ''});
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
          resolve({...doc.data(), id: doc.id});
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  });
}

export function postUser(data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('users')
      .add({
        name: data.name,
        email: data.email,
        friends: [],
        photoURL: '',
      })
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export function putUser(id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('users')
      .doc(id)
      .set(
        {
          name: data.name,
          email: data.email,
          photoURL: data.photoURL,
        },
        {merge: true}
      )
      .then((docRef) => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export function putUserName(id, name) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('users')
      .doc(id)
      .set(
        {
          name: name,
        },
        {merge: true}
      )
      .then((docRef) => {
        resolve('success');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export function getProjects(user_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .where('author_id', '==', user_id)
      .get()
      .then((querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({...doc.data(), id: doc.id, tyep: 'owned'});
        });
        resolve(projects);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  });
}

export function getSharedProjects(user_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .where('share_id', 'array-contains', user_id)
      .get()
      .then((querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({...doc.data(), id: doc.id, type: 'shared'});
        });
        resolve(projects);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  });
}

export function getSearchedProjects(name) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .where('name', '==', name)
      .get()
      .then((querySnapshot) => {
        const projects = [];
        querySnapshot.forEach((doc) => {
          projects.push({...doc.data(), id: doc.id, type: 'searched'});
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

export function putProjectImageURL(id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(id)
      .set(
        {
          imageURL: data.imageURL,
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
          walls.push(doc.data());
        });
        resolve(walls);
      });
  });
}

export function getWallDocId(project_id, uuid) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('walls')
      .where('id', '==', uuid)
      .get()
      .then((querySnapshot) => {
        const ids = [];
        querySnapshot.forEach((doc) => {
          ids.push(doc.id);
        });
        resolve(ids[0]);
      });
  });
}

export function postWall(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('walls')
      .add({...data, method: 'put'})
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export async function putWall(project_id, wall) {
  const db = firebase.firestore();
  const id = await getWallDocId(project_id, wall.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('walls')
      .doc(id)
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

export async function deleteWall(project_id, wall) {
  const db = firebase.firestore();
  const id = await getWallDocId(project_id, wall.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('walls')
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

export function getOpenings(project_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('openings')
      .get()
      .then((querySnapshot) => {
        const openings = [];
        querySnapshot.forEach((doc) => {
          openings.push(doc.data());
        });
        resolve(openings);
      });
  });
}

export function getOpeningDocId(project_id, uuid) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('openings')
      .where('id', '==', uuid)
      .get()
      .then((querySnapshot) => {
        const ids = [];
        querySnapshot.forEach((doc) => {
          ids.push(doc.id);
        });
        resolve(ids[0]);
      });
  });
}

export function postOpening(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('openings')
      .add({...data, method: 'put'})
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export async function putOpening(project_id, opening) {
  const db = firebase.firestore();
  const id = await getOpeningDocId(project_id, opening.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('openings')
      .doc(id)
      .set(
        {
          name: opening.name,
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

export async function deleteOpening(project_id, opening) {
  const db = firebase.firestore();
  const id = await getOpeningDocId(project_id, opening.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('openings')
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

export function getCoverings(project_id) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('coverings')
      .get()
      .then((querySnapshot) => {
        const coverings = [];
        querySnapshot.forEach((doc) => {
          coverings.push(doc.data());
        });
        resolve(coverings);
      });
  });
}

export function getCoveringDocId(project_id, uuid) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('coverings')
      .where('id', '==', uuid)
      .get()
      .then((querySnapshot) => {
        const ids = [];
        querySnapshot.forEach((doc) => {
          ids.push(doc.id);
        });
        resolve(ids[0]);
      });
  });
}

export function postCovering(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('coverings')
      .add({...data, method: 'put'})
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export async function putCovering(project_id, covering) {
  const db = firebase.firestore();
  const id = await getCoveringDocId(project_id, covering.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('coverings')
      .doc(id)
      .set(
        {
          path: covering.path,
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

export async function deleteCovering(project_id, covering) {
  const db = firebase.firestore();
  const id = await getCoveringDocId(project_id, covering.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('coverings')
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
          furnitures.push(doc.data());
        });
        resolve(furnitures);
      });
  });
}

export function getFurnitureDocId(project_id, uuid) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('furnitures')
      .where('id', '==', uuid)
      .get()
      .then((querySnapshot) => {
        const ids = [];
        querySnapshot.forEach((doc) => {
          ids.push(doc.id);
        });
        resolve(ids[0]);
      });
  });
}

export function postFurniture(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('furnitures')
      .add({...data, method: 'put'})
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export async function putFurniture(project_id, furniture) {
  const db = firebase.firestore();
  const id = await getFurnitureDocId(project_id, furniture.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('furnitures')
      .doc(id)
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

export async function deleteFurniture(project_id, furniture) {
  const db = firebase.firestore();
  const id = await getFurnitureDocId(project_id, furniture.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('furnitures')
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
          floors.push(doc.data());
        });
        resolve(floors);
      });
  });
}

export function getFloorDocId(project_id, uuid) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('floors')
      .where('id', '==', uuid)
      .get()
      .then((querySnapshot) => {
        const ids = [];
        querySnapshot.forEach((doc) => {
          ids.push(doc.id);
        });
        resolve(ids[0]);
      });
  });
}

export function postFloor(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('floors')
      .add({...data, method: 'put'})
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export async function putFloor(project_id, floor) {
  const db = firebase.firestore();
  const id = await getFloorDocId(project_id, floor.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('floors')
      .doc(id)
      .set(
        {
          color: floor.color,
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

export async function deleteFloor(project_id, floor) {
  const db = firebase.firestore();
  const id = await getFloorDocId(project_id, floor.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('floors')
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
          cameras.push(doc.data());
        });
        resolve(cameras);
      });
  });
}

export function getCameraDocId(project_id, uuid) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('cameras')
      .where('id', '==', uuid)
      .get()
      .then((querySnapshot) => {
        const ids = [];
        querySnapshot.forEach((doc) => {
          ids.push(doc.id);
        });
        resolve(ids[0]);
      });
  });
}

export function postCamera(project_id, data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('cameras')
      .add({...data, method: 'put'})
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

export async function putCamera(project_id, camera) {
  const db = firebase.firestore();
  const id = await getCameraDocId(project_id, camera.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('cameras')
      .doc(id)
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

export async function deleteCamera(project_id, camera) {
  const db = firebase.firestore();
  const id = await getCameraDocId(project_id, camera.id);
  return new Promise((resolve) => {
    db.collection('projects')
      .doc(project_id)
      .collection('cameras')
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

export function getSettingByName(name) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('settings')
      .where('name', '==', name)
      .get()
      .then((querySnapshot) => {
        const settings = [];
        querySnapshot.forEach((doc) => {
          settings.push({...doc.data(), id: doc.id});
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
