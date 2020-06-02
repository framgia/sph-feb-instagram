import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_1TFomGkZhJPwufgO5Kv1rZGdNYCDqkw",
  authDomain: "instagram-sun.firebaseapp.com",
  databaseURL: "https://instagram-sun.firebaseio.com",
  projectId: "instagram-sun",
  storageBucket: "instagram-sun.appspot.com",
  messagingSenderId: "876657646325",
  appId: "1:876657646325:web:5e492c8f08174e023203bc",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
