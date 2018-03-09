import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDOZTA0pJihJEUb3ZPhPank86VQkjIEmgA",
    authDomain: "hangtimer-360df.firebaseapp.com",
    databaseURL: "https://hangtimer-360df.firebaseio.com",
    projectId: "hangtimer-360df",
    storageBucket: "hangtimer-360df.appspot.com",
    messagingSenderId: "528679303550"
  };

firebase.initializeApp(config);

const database = firebase.database();

export default database;
