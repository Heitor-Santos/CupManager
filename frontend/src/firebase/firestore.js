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
    await firebase.auth().signInAnonymously().catch(function (error) {
      const _error = error.message
      console.log(_error)
      res.push({ 'Error': _error })
      aux = 0
    });
    var user = firebase.auth().currentUser
    console.log('UID --> ' + user.uid)
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
  cupName = cupName.replace("/", "") //pra que serve esse replace aqui?
  const res = await getCup(cupName)
  if (res) return false;
  await db.collection("/cups").doc(cupName).set({
    name: cupName
  })
  return true
}

export async function getCup(cupName) {
  var result = false;
  await db.collection("/cups").doc(cupName).get()
    .then(cup => {
      if (!cup.exists) console.log(`${cup} não existe`)
      else {
        console.log(cup.data())
        result = true
      }
    })
  return result
}

export async function postMatch(cupName, matchName, matchData) {
  let resp = undefined;
  console.log(matchData)
  await db.collection('cups').doc(cupName).collection('matches').doc(matchName).set(matchData)
    .then((succ) => { resp = `success` })
    .catch((err) => { resp = `error ${err}` })
  return resp;
}

export async function getMatch(cupName, matchName) {
  let resp = undefined;
  await db.collection('cups').doc(cupName).collection('matches').doc(matchName).get()
    .then((match) => {
      if (match.exists && JSON.stringify(match.data()) != '{}') resp = match.data()
    })
    .catch(err => resp = err)
  return resp
}

export async function putMatch(cupName, matchName, matchData) {
  let resp = undefined;
  await db.collection('cups').doc(cupName).collection('matches').doc(matchName).set(matchData)
    .then((succ) => { resp = `success` })
    .catch((err) => { resp = `error ${err}` })
  return resp;
}

export async function postPlayer(cupName, playerName, matchName) {
  let resp = 'already-exists';
  let player = await getPlayer(cupName, playerName, matchName)
  if (player == undefined) {
    await db.collection('cups').doc(cupName).collection('players').doc(playerName).collection('stats')
      .doc(matchName).set({
        "name": playerName,
        "isGoleiro": false,
        "assist": 0,
        "golsFavor": 0,
        "golsContra": 0,
        "golsTomados": 0
      }).then((succ) => { resp = `success` })
      .catch((err) => { resp = `error ${err}` })
  }
  console.log(resp)
  return resp;
}

export async function putDataStat(cupName, infoPlayers) {
  console.log(infoPlayers)
  for (let i = 0; i < infoPlayers.length; i++) {
    for (let player of infoPlayers[i]) {
        let name = player.name
        console.log("Entrou Aqui: "+name)
        let assistInfo = player.assist
        let golsFavorInfo = player.golsFavor
        let golsContraInfo = player.golsContra
        let golsTomadosInfo = player.golsTomados
        await db.collection('/cups/' + cupName + "/players/").doc(name).get().then(async doc =>{
          const res = doc.data()
          if (res == undefined) {
            await db.collection('cups').doc(cupName).collection('players').doc(name).set({
              "assist": assistInfo,
              "golsFavor": golsFavorInfo,
              "golsTomados": golsTomadosInfo,
              "golsContra": golsContraInfo,
              "present": 1
            })
          } else {
            let {assist, golsFavor, golsTomados, golsContra, present} = res
            await db.collection('cups').doc(cupName).collection('players').doc(name).set({
              "assist": assist + assistInfo,
              "golsFavor": golsFavor + golsFavorInfo,
              "golsTomados": golsTomados + golsTomadosInfo,
              "golsContra": golsContra + golsContraInfo,
              "present": present
            })
          }
        })
    }
  }
   
}

export async function putPlayer(cupName, playerName, matchName, playerData) {
  let resp = '';
  await db.collection('cups').doc(cupName).collection('players').doc(playerName).collection('stats').doc(matchName).set({
    "name": playerData.name,
    "isGoleiro": playerData.isGoleiro,
    "assist": playerData.assist,
    "golsFavor": playerData.golsFavor,
    "golsContra": playerData.golsContra,
    "golsTomados": playerData.golsTomados
}).then((succ) => { resp = `success` })
    .catch((err) => { resp = `error ${err}` })
  return resp
}


export async function getPlayer(cupName, playerName, matchName) {
  let resp = undefined;
  if (matchName != undefined) {
    await db.collection('cups').doc(cupName).collection('players').doc(playerName).collection('stats').doc(matchName).get()
      .then((match) => {
        if (match.exists && JSON.stringify(match.data() != '{}')) resp = match.data()
      })
      .catch(err => resp = err)
  }
  else {
    await db.collection('cups').doc(cupName).collection('players').doc(playerName).get().then((player) => {
      if (player.exists) { resp = player.data() }
    })
  }
  return resp
}

export async function getPlayers(cupName, matchName, listPlayers) {
  let resp = [];
  if (listPlayers != undefined && listPlayers != []) {
    console.log(listPlayers)
    for (let player of listPlayers) {
      let infoPlayer = await getPlayer(cupName, player, matchName)
      console.log(infoPlayer)
      if (infoPlayer != undefined) resp.push(infoPlayer)
    }
  }
  console.log(resp)
  return resp;
}

export async function getMatches(keyCup) {
  const list = []
  if (keyCup != "" && keyCup != undefined) {
    keyCup = keyCup.replace("/", "")
    await db.collection("/cups/" + keyCup + "/matches").get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const { currGoleiros, gols, matchName, matchState, matchTime, teamA, teamB } = doc.data()
          list.push({
            currGoleiros,
            gols,
            matchName,
            matchState,
            matchTime,
            teamA,
            teamB
          })
        })
      })
  }
  list.sort((a, b) => parseInt(a.matchName) < parseInt(b.matchName) ? -1 : parseInt(a.matchName)  > parseInt(b.matchName) ? 1 : 0)
  return list
}

export async function getPlayersState(keyCup) {
  let playerStat = []
  await db.collection("/cups/" + keyCup + "/players/").get().then(snapshot=> {
    snapshot.forEach(async doc => {
      console.log("Entrando no playerStat: " + doc.id)
      const data = doc.data()
      console.log(doc.id + ": ")
      console.log(doc.data())
      playerStat.push(await getPlayerStat(data,doc.id))
    })
  })
  return playerStat
}

export async function getPlayerStat(data, docId) {
  let stat = {
    "name": docId
  };
  const {assist, golsContra, golsFavor, golsTomados, present} = data;
  stat["assist"] = assist
  stat["golsContra"] = golsContra
  stat["golsFavor"] = golsFavor
  stat["golsTomados"] = golsTomados
  stat["present"] = present
  return stat
}


export async function deleteMatche(idMatch, keyCup) {
  keyCup = keyCup.replace("/", "")
  idMatch = idMatch.toString()
  console.log(keyCup + " " + idMatch)
  await db.collection("/cups/" + keyCup + "/matches").doc(idMatch).get().then(async doc=>{
    const {teamA, teamB} = doc.data()
    const players = [...teamA,...teamB]
    for (let player of players) {
      await deleteStats(keyCup, player, idMatch)
    }
  })
  await db.collection("/cups/" + keyCup + "/matches").doc(idMatch).delete().then(async function () {
    console.log("Partida apagada!")
  }).catch(function (error) {
    console.log("Error nessa porra: ", error)
  })
}


export async function deleteStats (keyCup, docId, idMatch) {
  await db.collection("/cups/" + keyCup + "/players/" + docId + "/stats/").doc(idMatch).delete().then(()=>{
    console.log("Est apagada")
  })
  await db.collection("/cups/" + keyCup + "/players/").doc(docId).set({
    "name": docId,
    "assist": 0,
    "golsFavor": 0,
    "golsContra": 0,
    "golsTomados": 0,
    "present": 0
  })
}

