import firebase from 'firebase/app';
import 'firebase/firestore';

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

function getUserId(email) {
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
          resolve(users[0].id);
        } else {
          resolve('');
        }
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  });
}

function getUser(id) {
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

function getProjects(userId) {
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

function getSharedProjects(userId) {
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

function getProject(id) {
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

function postProject(data) {
  const db = firebase.firestore();
  return new Promise((resolve) => {
    db.collection('projects')
      .add({
        name: data.name,
        author_id: data.id,
        shared_id: [],
      })
      .then((docRef) => {
        resolve(docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });
}

function putProject(id, data) {
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

function deleteProject(id) {
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

export {
  initFirebase,
  getUser,
  getUserId,
  getProject,
  getProjects,
  getSharedProjects,
  postProject,
  putProject,
  deleteProject,
};
