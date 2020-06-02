import firebase from 'firebase';
import { useState } from 'react';
import { key } from 'ionicons/icons';

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
  const userCollection = "users/cCRmcIVZKs0ru6yREORe/Cup/"
  const cupCollection = db.collection(userCollection)

  export async function loginUser() {
    const isUserLogin = await getUserLogin()
    var res = []
    var aux = 1
    if (!isUserLogin) {
      await firebase.auth().signInAnonymously().catch(function(error) {
        const _error = error.message
        console.log(_error)
        res.push({'Error': _error})
        aux = 0
      });
      var user = firebase.auth().currentUser
      console.log('UID --> '+ user.uid)
    }
    return res
  }

  export async function getUserLogin() {
    var user = firebase.auth().currentUser;
    if (user == null) {
      return false
    } else {
      return true
    }
  }

  export async function postCup(cupName) {
    cupName = cupName.replace("/", "")
    const res = await getCup(cupName)
    if (!res) return false;
    await cupCollection.doc(cupName).set({
      idMatches: [],
      idPlayers: [],
      name: cupName
    })
    return true
  }

  export async function getCup(cupName) {
    var result = false;
    await db.collection(userCollection).where("name","==",cupName).get()
        .then(snapshot=> {
          snapshot.forEach(doc => {
            const data = doc.data()
            console.log(data)
            if (data.name == cupName) {
              result = true
            }
          })
        })
    return result
  }

  export async function getMatches(keyCup) {
    const list =[]
    if (keyCup != "" && keyCup != undefined) {
      keyCup = keyCup.replace("/", "")
      await db.collection(userCollection+keyCup+"/Match").orderBy("idMatch", "asc").get()
          .then(snapshot=> {
            snapshot.forEach(doc => {
              const {goalsA,goalsB,idMatch,idPlayersA,idPlayersB,winner} = doc.data()
              list.push({
                goalsB,
                goalsA,
                idMatch,
                idPlayersA,
                idPlayersB,
                winner
              })
            })
      })
    }
    console.log(list)
    return list
  }

  export async function deleteMatche(idMatch, keyCup) {
    keyCup = keyCup.replace("/", "")
    idMatch = idMatch.toString()
    console.log(keyCup + " " + idMatch)
    await db.collection(userCollection+keyCup+"/Match").doc(idMatch).delete().then(function() {
      console.log("Partida apagada!")
    }).catch(function(error) {
      console.log("Error nessa porra: ",error)
    }) 
  }

  