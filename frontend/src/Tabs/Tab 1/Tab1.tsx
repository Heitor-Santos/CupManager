import React, { Props, Component, useState } from 'react'
import { IonPage, IonContent, IonItem, IonIcon, IonHeader, IonToolbar, IonTitle, IonButton, IonFab, IonFabButton, IonLabel, IonList, IonListHeader, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, } from '@ionic/react'
import { add } from 'ionicons/icons'
import firebase from "../../firebase/firestore";
import "./Tab1.css"
import Card from './Card';

//<IonButton expand = "block" onClick = {aaaa}></IonButton>

//interface Tab1Props {
 // firstPage: true
//}
//{Title,Image,Body})


const Tab1: React.FC = ()=> {
    
    const [ firstPage, setPage ] = useState(true);
    const [ colorFirstPage, setColorButtonFirst] = useState("dark");
    const [ colorSecondPage, setColorButtonSecond ] = useState("light");

    const cardContent = firstPage ? <Card /> : <p>Estatística foda!!</p>

    const handleClick = (whichButton : boolean) => {
      setPage(whichButton)
      whichButton ? setColorButtonFirst("dark") : setColorButtonFirst("light")
      whichButton ? setColorButtonSecond("light") : setColorButtonSecond("dark")
    }


    return (
      <IonPage>
        <IonContent className="bg">
        <IonFab vertical = "bottom" horizontal = "end" slot = "fixed">
              <IonFabButton>
                <IonIcon icon = {add}></IonIcon>
              </IonFabButton>
            </IonFab>
            <IonCard>
            <IonContent>
              <IonCardHeader>
                <IonCardTitle>Campeonato São Raimundo</IonCardTitle>
                <IonCardSubtitle>Lista de todas partidas da competição.</IonCardSubtitle>
              </IonCardHeader>
                {cardContent}
            </IonContent>  
            </IonCard>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <IonButton className = "botao" shape="round" size = "small" color = {colorFirstPage}
              onClick={(e) => handleClick(true)} />
              <IonButton className = "botao" shape="round" size = "small" color = {colorSecondPage}
              onClick = {(e) => handleClick(false)} />
            </div> 
        </IonContent>
      </IonPage>
    );
  };



//function aaaa(props: any) {
   // console.log('oi?')
    //const db = firebase.firestore();
    //db.settings({
    //    timestampsInSnapshots: true
    //});
      //  db.collection('Partida')
      //  .add({
      //  nome: "Ramaonzin"
      //  })
//}

export default Tab1