import React, { Props, Component, useState, useEffect } from 'react'
import { IonPage, IonContent, IonItem, IonIcon, IonHeader, IonToolbar, IonTitle, IonButton, IonFab, IonFabButton, IonLabel, IonList, IonListHeader, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonLoading, IonText, } from '@ionic/react'
import { add, list, key } from 'ionicons/icons'
import {login,getPartida,postCup} from "../../firebase/firestore";
import "./Tab1.css"
import Card from './Card';
import HandleStorage from '../../util/handleStorage';

const Tab1: React.FC = ()=> {
      
  // loja que armazena ultimos dados  
  const store = new HandleStorage()

  // variaveis controladores de estado da TAB
  
  const [ firstPage, setPage ] = useState(true);
  const [ colorFirstPage, setColorButtonFirst] = useState("dark");
  const [ colorSecondPage, setColorButtonSecond ] = useState("light");
  const [ busy, setBusy ] = useState<boolean>(true);
  const [ cup, setCup ] = useState("");
  const [list, setList] = useState< any []>([])

  // variaveis de conteudo
  const cardContent = () => { // qual conteudo vai ser disponivel
    if (firstPage && busy) {
      return <div></div>
    } else if (firstPage && !busy) {
        return listPartidas
    } else {
        return <p>estatistica foda</p>
    }
  }
  
  const subtitleCard = firstPage? "Lista de todas partidas da competição." 
    : "Dados estatícos sobre os jogadores."
  const listPartidas = busy ? <p></p> : <Card list={list}/>

  // equivalente ao CompeneuntDeMount
  useEffect(() => {
    initPage()
  }, []);

  // inicia os dados essencias da aplicação
  const initPage = async () => {
    const loginResp = await login()
    if(loginResp) {
      //getPartidaResp = await getPartida()
      const keyCup = await store.getLastCup() // pega qual copa foi
      if (keyCup !== null) {
        const res2 = await postCup(keyCup)
        console.log(res2)
        const res = await getUpdate()
        if (res != false) {
          console.log(res)
          setCup(keyCup) // escreve na card o nome do campeonato
          setBusy(false)
        }
      }
    }
  }

  const getUpdate = async () => { // carrega a lista de partidas para poder ser renderizado
    const res = await getPartida()
    if (res != null) {
      setList(res)
      return true
    }
    return false
  }
    
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
        <IonLoading message="Carregando Torneio..." duration={0} 
        isOpen={busy} />
            <IonCard>
            <IonContent>
              <IonCardHeader>
                <IonCardTitle>{cup.toUpperCase()}</IonCardTitle>
                <IonCardSubtitle>{subtitleCard}</IonCardSubtitle>
              </IonCardHeader>
              <IonList>
                {cardContent()}
              </IonList>
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

export default Tab1