import React, { useState, useEffect } from 'react'
import { IonItem,  IonLabel, IonList, IonIcon, IonRow, IonCol, IonChip, IonGrid, IonCard, IonCardTitle, IonCardContent, } from '@ionic/react'
import "./Est.css"
import { football, man, body, sad} from 'ionicons/icons'
import { deleteMatche } from '../../util/firestore'

interface ListPartida {
  list: any[],
  keyCup: string,
  getUpdate: (keyCup: any) => Promise<boolean>
}

const Est: React.FC<ListPartida> = ({list,keyCup,getUpdate}) => {

  const [listEmpty, setEmpty] = useState<boolean>(false);
  const [cardList, setcardList] = useState<any[]>([])
  const [mapList, setMapList] = useState<JSX.Element[]>([])

  useEffect(()=>{
    if (list.length == 0) {
      setEmpty(true)
    } else {
      setEmpty(false)
    }
    setcardList(list)
    setContent(list)
  },[])

  const handClickChip = (value: any)=> {
    console.log(value)
    let res;
    switch(value) {
        case "assist":
            res = cardList.sort((a, b) => a.assist < b.assist ? 1 : a.assist > b.assist ? -1 : 0)
            setContent(res)
            break
        case "golsFeito":
            res = cardList.sort((a, b) => a.golsFavor > b.golsFavor ? -1 : a.golsFavor < b.golsFavor ? 1 : 0)
            setContent(res)
            break
        case "golsSofrido":
            res = cardList.sort((a, b) => a.golsTomados > b.golsTomados ? -1 : a.golsTomados < b.golsTomados ? 1 : 0)
            setContent(res)
            break
        default:
            res = cardList.sort((a, b) => a.golsContra > b.golsContra ? -1 : a.golsContra < b.golsContra ? 1 : 0)
            setContent(res)
            break
    }
  }

  const setContent = (listazinha: any[]) => {
      const res = listazinha.map((elem) => (
        <IonCard color = "dark" key = {elem.name}>
            <IonCardTitle className = "titleCard">{elem.name}</IonCardTitle>
            <IonCardContent className = "col">
                <IonCol>
                    <IonRow>
                        <IonIcon color = "success" icon = {football}></IonIcon>
                        <p>: {elem.golsFavor} gols feitos</p>
                    </IonRow>
                    <IonRow>
                        <IonIcon color = "light" icon = {body}></IonIcon>
                        <p>: {elem.golsTomados} gols sofrido</p>
                    </IonRow>
                    <IonRow>
                        <IonIcon color = "secondary" icon = {man}></IonIcon>
                        <p>: {elem.assist} assistências </p>
                    </IonRow>
                    <IonRow>
                        <IonIcon color = "danger" icon = {sad}></IonIcon>
                        <p>: {elem.golsContra} gols contra</p>
                    </IonRow>
                </IonCol>
            </IonCardContent>    
        </IonCard>
      ))
    setMapList(res)
  }


  

  const List = listEmpty? 
  <IonItem><IonLabel>Sem jogador!Lembre-se que os dados das partidas são adicionados ao campeonato ao final da partida.</IonLabel></IonItem> : mapList
  
    return(
      <IonGrid>
          <IonRow>
            <div className = "chipContent"> 
                <IonChip color= "success" onClick={()=> handClickChip("golsFeito")}>
                    <IonIcon icon={football} color = "dark"/>
                        <IonLabel>Gols Feito</IonLabel>
                </IonChip>
                <IonChip color = "dark" onClick={()=> handClickChip("golsSofrido")}>
                    <IonIcon icon={body} color="dark" />
                        <IonLabel>Gols Sofrido</IonLabel>
                </IonChip>
                <IonChip color = "secondary" onClick={()=> handClickChip("assist")}>
                    <IonIcon icon={man} color="dark" />
                        <IonLabel>Assistência</IonLabel>
                </IonChip>
                <IonChip color = "danger" onClick={()=> handClickChip("golsContra")}>
                    <IonIcon icon={sad} color="dark" />
                        <IonLabel>Gols Contra</IonLabel>
                </IonChip>
            </div> 
          </IonRow>
          <IonList>
            {List}
          </IonList>
    </IonGrid>
    ) 
}

export default Est