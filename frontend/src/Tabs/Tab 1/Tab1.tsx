import React, { Props, Component, useState, useEffect } from 'react'
import { IonPage, IonContent, IonItem, IonIcon, IonHeader, IonToolbar, IonTitle, IonButton, IonFab, IonFabButton, IonLabel, IonList, IonListHeader, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLoading, } from '@ionic/react'
import { add } from 'ionicons/icons'
import {login,getPartida,postCup} from "../../firebase/firestore";
import "./Tab1.css"
import Card from './Card';
import HandleStorage from '../../util/handleStorage';

//<IonButton expand = "block" onClick = {aaaa}></IonButton>

//interface Tab1Props {
 // firstPage: true
//}
//{Title,Image,Body})


const Tab1: React.FC = ()=> {
      
  const store = new HandleStorage()

    // variaveis controladores de estado da TAB
    const [ firstPage, setPage ] = useState(true);
    const [ colorFirstPage, setColorButtonFirst] = useState("dark");
    const [ colorSecondPage, setColorButtonSecond ] = useState("light");
    const [ busy, setBusy ] = useState<boolean>(true);
    const [ cup, setCup ] = useState("");
    
    // variaveis de conteudo
    const cardContent = firstPage ? <Card /> : <p>Estatística foda!!</p>

    // inicia os dados essencias da aplicação
    const initPage = async () => {
      const loginResp = await login() // Faz a autenticação do firebase
      //getPartidaResp = await getPartida()
      const keyCup = await store.getLastCup() // pega qual copa foi
      if (keyCup !== null) {
        await postCup(keyCup) // ve se a copa ja esta cadastrada se não cadastra
        setCup(keyCup) // escreve na card o nome do campeonato
      }
     // console.log(loginResp + " "  + getPartidaResp)
      setBusy(false)
    }
    
    // equivalente ao CompeneuntDeMount
    useEffect(() => {
      initPage()
    }, []);
    
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
        <IonLoading message="Carregando Torneio..." duration={10000} 
        isOpen={busy} />
            <IonCard>
            <IonContent>
              <IonCardHeader>
                <IonCardTitle>{cup}</IonCardTitle>
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