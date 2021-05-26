import firebase from 'firebase/app';
import 'firebase/auth';

export function signUp(email, password) {
  return new Promise((resolve) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        resolve(userCredential);
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  });
}

export function signIn(email, password) {
  return new Promise((resolve) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        resolve(userCredential);
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  });
}

export function signOut() {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      console.error(error);
    });
}

export function getAuthState() {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(user);
      } else {
        resolve({uid: '', email: ''});
      }
    });
  });
}

export function getCurrentUser() {
  const user = firebase.auth().currentUser;
  return user;
}

export function sendEmailVerification() {
  const user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(function () {
      console.log('Email sent');
    })
    .catch(function (error) {
      console.log('An error happened');
    });
}

export function sendPasswordResetEmail(email) {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      console.log('Email sent');
    })
    .catch(function (error) {
      console.log('An error happened');
    });
}

export function googleProvider() {
  const provider = new firebase.auth.GoogleAuthProvider();
  //   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //   provider.setCustomParameters({
  //     login_hint: 'user@example.com',
  //   });
  return provider;
}

export function googleSignInPopup(provider) {
  return new Promise((resolve) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result) {
          resolve(result);
        }
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  });
}

export function facebookProvider() {
  const provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('user_birthday');
  //   provider.setCustomParameters({
  //     display: 'popup',
  //   });
  return provider;
}

export function facebookSignInPopup(provider) {
  return new Promise((resolve) => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result) {
          resolve(result);
        }
      })
      .catch((error) => {
        console.log(error.code);
        alert(error.message);
      });
  });
}
