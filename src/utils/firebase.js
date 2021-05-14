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

export {initFirebase, getUser, getProjects, getProject};
