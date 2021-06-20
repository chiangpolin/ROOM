import firebase from 'firebase/app';
import 'firebase/storage';

export async function putFile(id, url) {
  const now = Date.now();
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(`projects/${id}-${now}.jpg`);
  await imageRef.putString(url, 'data_url');
  const downloadURL = await imageRef.getDownloadURL();
  return downloadURL;
}
