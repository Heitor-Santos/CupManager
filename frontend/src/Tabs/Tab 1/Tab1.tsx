import React, { Props, Component, useState, useEffect } from 'react'
import { IonPage, IonContent, IonItem, IonIcon, IonHeader, IonToolbar, IonTitle, IonButton, IonFab, IonFabButton, IonLabel, IonList, IonListHeader, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLoading, IonText, } from '@ionic/react'
import { add, list, key } from 'ionicons/icons'
import {loginUser,getMatches,postCup} from "../../firebase/firestore";
import "./Tab1.css"
import Card from './Card';
import HandleStorage from '../../util/handleStorage';

const Tab1: React.FC = () => {
      
  // loja que armazena ultimos dados  
  const store = new HandleStorage()
  
  const checkLastCup = async (store: HandleStorage) => {
    const cupLast = await store.getLastCup()
    if(cupLast != cup && cupLast != null) {
      setCup(cupLast)
    }
  }
  checkLastCup(store)
  
  // variaveis controladores de estado da TAB
  const [ firstPage, setPage ] = useState(true);
  const [ colorFirstPage, setColorButtonFirst] = useState("dark");
  const [ colorSecondPage, setColorButtonSecond ] = useState("light");
  const [ busy, setBusy ] = useState<boolean>(true);
  const [ cup, setCup ] = useState("");
  const [list, setList] = useState< any []>([])
  const[ulr,setUrl] = useState<string>("")

  
  const subtitleCard = firstPage? "Lista de todas partidas da competição"
  : "Dados estatícos sobre os jogadores"
  
  // variaveis de conteudo
  const cardContent = () => { // qual conteudo vai ser disponivel
    if (firstPage && !busy) {
        return listPartidas
    } else if (!firstPage) {
        return <p>estatistica foda</p>
    }
  }


  
  // equivalente ao CompeneuntDeMount
  useEffect(() => {
    setBusy(true)
    initPage()
  },[cup]);

  // inicia os dados essencias da aplicação
  const initPage = async () => {
    const loginResp = await loginUser()
    if(loginResp.length === 0) {
      console.log('-- Usuário está logado com o Firebase --')
      const keyCup = await store.getLastCup()
      if (keyCup !== null) {
       setCup(keyCup) // escreve na card o nome do campeonato
       const res2 = await postCup(keyCup)
       console.log('Cadastrou a copa? ' + res2)
        const res = await getUpdate(keyCup)
        if (res != false) {
          setBusy(false)
        }
      }
    }
  }

  const getUpdate = async (keyCup : any) => { 
    // carrega a lista de partidas para poder ser renderizado
    console.log("Pegando lista de partidas --> " + keyCup)
    const res = await getMatches(keyCup)
    if (res != null) {
       let pointer = res.length + 1
       setUrl("/"+cup+"/"+ pointer)
       setList(res)
       return true
    }
    return false
  }

  const listPartidas = <Card list={list} keyCup={cup} getUpdate={getUpdate} />
    
    const handleClick = (whichButton : boolean) => {
      setPage(whichButton)
      whichButton ? setColorButtonFirst("dark") : setColorButtonFirst("light")
      whichButton ? setColorButtonSecond("light") : setColorButtonSecond("dark")
    }

    return (
      <IonPage>
        <IonContent className="bg">
        <IonFab vertical = "bottom" horizontal = "end" slot = "fixed">
          <IonFabButton href= {ulr} >
              <IonIcon icon = {add}></IonIcon>
            </IonFabButton>
        </IonFab>
        <IonLoading message="Carregando Torneio..." duration={0} 
        isOpen={busy} />
            <IonCard>
            <IonContent>
              <div className = "cardHeader">
              <IonCardHeader>
                <IonCardTitle>{cup.toUpperCase()}</IonCardTitle>
                <IonCardSubtitle>
                  {subtitleCard}
                </IonCardSubtitle>
              </IonCardHeader>
              </div>
              <IonList>
                {cardContent()}
              </IonList>
            </IonContent>  
            </IonCard>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <IonButton className = "botao" shape="round" size = "small" color = {colorFirstPage}
              onClick={() => handleClick(true)} />
              <IonButton className = "botao" shape="round" size = "small" color = {colorSecondPage}
              onClick = {() => handleClick(false)} />
            </div> 
        </IonContent>
      </IonPage>
    );
  };
export default Tab1