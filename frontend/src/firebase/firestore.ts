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
  const db = firebase.firestore();

  export async function login() {
    await firebase.auth().signInAnonymously().catch(function(error) {
      console.log(error.message)
      return false;
    });
    return true;
  }

  export async function postCup(cupName:string) {
    const res = await getCup(cupName)
    if (res) return false;
    await db.collection('Cup').add({
      idPartidas: [],
      idPlayer: [],
      nome: cupName
    })
  }

  export async function getCup(cupName:string) {
    var result = false;
    await db.collection('Cup').get()
        .then(snapshot=> {
          snapshot.forEach(doc => {
            const data = doc.data()
            console.log(data.nome == cupName)
            console.log(data.nome)
            console.log(cupName)
            if (data.nome == cupName) {
              result = true
            }
          })
        })
    return result
  }

  export async function getPartida() {
    var list = []
    await db.collection('Cup').get()
        .then(snapshot=> {
          snapshot.forEach(doc => {
            const data = doc.data()
            console.log(data)
          })
        })
    return true
  }