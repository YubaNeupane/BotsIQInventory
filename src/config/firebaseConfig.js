import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB9HOLCAafwJH6rZXDKiQGMcNeJp8DblTI",
  authDomain: "inventory-system-55e4b.firebaseapp.com",
  databaseURL: "https://inventory-system-55e4b.firebaseio.com",
  projectId: "inventory-system-55e4b",
  storageBucket: "inventory-system-55e4b.appspot.com",
  messagingSenderId: "536330619575",
  appId: "1:536330619575:web:c2dd552bafb12a0ca31b32"
};

firebase.initializeApp(firebaseConfig);

export default firebase 