import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBUVobQ91KDm5Fv0wTbAsAy4arysw31Mgs",
    authDomain: "cupmanager-57723.firebaseapp.com",
    databaseURL: "https://cupmanager-57723.firebaseio.com",
    projectId: "cupmanager-57723",
    storageBucket: "cupmanager-57723.appspot.com",
    messagingSenderId: "381757034631",
    appId: "1:381757034631:web:685fd9c9b88951e43b2822",
    measurementId: "G-QLG6ZHPBV2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;