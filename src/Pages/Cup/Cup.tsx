import React, { useState, useEffect } from 'react'
import { IonPage, IonContent, IonIcon, IonHeader, IonFab, IonFabButton, IonLabel, IonList, IonLoading, IonSegment, IonSegmentButton, IonCard } from '@ionic/react'
import { add } from 'ionicons/icons'
import {loginUser,getMatches,postCup, getPlayersState} from "../../util/firestore";
import "./Cup.css"
import Card from './Card';
import HandleStorage from '../../util/handleStorage';
import ToolBar from '../../components/ToolBar';
import Est from './Est';

const Cup: React.FC = () => {
      
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
  const [ busy, setBusy ] = useState<boolean>(true);
  const [ cup, setCup ] = useState("");
  const [list, setList] = useState< any []>([])
  const [players, setPlayers] = useState<any []>([])
  const[ulr,setUrl] = useState<string>("")
  const [segmentValue, setSegmentValue] = useState("list")
  
  // variaveis de conteudo
  const cardContent = () => { // qual conteudo vai ser disponivel
    if (firstPage && !busy) {
        return listPartidas
    } else if (!firstPage) {
        return listEst
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
      const resEst = await getPlayersState(keyCup);
      setPlayers(resEst)
      let pointer;
       if (res.length == 0) {
         pointer = 1
       } else {
        pointer = parseInt(res[res.length-1]["matchName"])+1
       }
       setUrl("/"+cup+"/"+ pointer)
       setList(res)
       return true
    }
    return false
  }

  const setSegment = async (value: any) => {
    if (value != undefined) {
      setSegmentValue(value)
    }
  }

  const listPartidas = <Card list={list} keyCup={cup} getUpdate={getUpdate} />
  const listEst = <Est list={players} keyCup = {cup}/>

    return (
      <IonPage>
        <IonLoading message="Carregando Torneio..." duration={0} 
        isOpen={busy} />
        <IonHeader class="ion-no-border" translucent={true}>
          <ToolBar title={cup.toUpperCase()}/>
        </IonHeader>
          <IonContent className = "bg">
          <IonSegment color = "tertiary" value = {segmentValue} onIonChange={e => setSegment(e.detail.value)}>
            <IonSegmentButton value = "list"  onClick={() => setPage(true)}>
              <IonLabel>Lista Partidas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value = "estastics" onClick={() => setPage(false)}>
              <IonLabel>Estatísticas Gerais</IonLabel>
            </IonSegmentButton>
          </IonSegment>
            <IonCard className = "listMatch">
              <IonContent>
                <IonFab vertical = "bottom" horizontal = "center" slot = "fixed">
                  <IonFabButton href = {ulr}  color = "tertiary" size="small">
                      <IonIcon icon = {add}></IonIcon>
                    </IonFabButton>
                </IonFab>
              <IonList inset={true}>
                {cardContent()}
              </IonList>
              </IonContent>
            </IonCard>
            </IonContent>
      </IonPage>
    );
  };
export default Cup
