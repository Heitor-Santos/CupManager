import React, { useState, useEffect } from 'react'
import { IonItem,  IonLabel, IonList, IonIcon, IonRow, IonCol, IonChip, IonGrid, IonCard, IonCardTitle, IonCardContent, IonButton, } from '@ionic/react'
import "./Est.css"
import { football, man, body, sadOutline, location, key, handLeft, skullOutline, skull} from 'ionicons/icons'
import { writeCsvFile } from './StatCsv';


interface ListPartida {
  list: any[],
  keyCup: string
}

const Est: React.FC<ListPartida> = ({list,keyCup}) => {
  
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
        case "golsContra":
          res = cardList.sort((a, b) => a.golsContra > b.golsContra ? -1 : a.golsContra < b.golsContra ? 1 : 0)  
          setContent(res)
          break
        case "presentLinha":
          res = cardList.sort((a, b) => a.presentLinha > b.presentLinha ? -1 : a.presentLinha < b.presentLinha ? 1 : 0)  
          setContent(res)
          break
        case "cartaoAmarelo":
          res = cardList.sort((a, b) => a.cartaoAmarelo > b.cartaoAmarelo ? -1 : a.cartaoAmarelo < b.cartaoAmarelo ? 1 : 0)  
          setContent(res)
          break
        case "cartaoVermelho":
          res = cardList.sort((a, b) => a.cartaoVermelho > b.cartaoVermelho ? -1 : a.cartaoVermelho < b.cartaoVermelho ? 1 : 0)  
          setContent(res)
          break
        default:
          res = cardList.sort((a, b) => a.presentGoleiro > b.presentGoleiro ? -1 : a.presentGoleiro < b.presentGoleiro ? 1 : 0)  
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
                        <IonIcon color = "primary" icon = {location}></IonIcon>
                        <p>: {elem.presentLinha} jogos linha</p>
                    </IonRow>
                    <IonRow>
                        <IonIcon color = "tertiary" icon = {handLeft}></IonIcon>
                        <p>: {elem.presentGoleiro} jogos goleiro</p>
                    </IonRow>
                    <IonRow>
                        <IonIcon color = "dark" icon = {sadOutline}></IonIcon>
                        <p>: {elem.golsContra} gols contra</p>
                    </IonRow>
                    <IonRow>
                        <IonIcon color = "warning" icon = {skullOutline} ></IonIcon>
                        <p>: {elem.golsContra} Amarelo </p>
                    </IonRow>
                    <IonRow>
                        <IonIcon color = "danger" icon = {skullOutline} ></IonIcon>
                        <p>: {elem.golsContra} Vermelho </p>
                    </IonRow>
                </IonCol>
            </IonCardContent>    
        </IonCard>
      ))
    setMapList(res)
  }

  const handleClick = async () => {
    await writeCsvFile(list,keyCup).then(()=>{
      console.log("Feito o download")
    })
  }

  const List = listEmpty? 
  <IonItem><IonLabel>Sem jogador!Lembre-se que os dados das partidas são adicionados ao campeonato ao final da partida.</IonLabel></IonItem> : mapList
  
    return(
      <IonGrid>
          <IonRow>
            <div className = "chipContent"> 
                <IonButton onClick={()=> handleClick()} expand = "block" color = "warning">Exportar para CSV</IonButton>
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
                    <IonIcon icon={sadOutline} color="light" />
                        <IonLabel>Gols Contra</IonLabel>
                </IonChip>
                <IonChip color = "primary" onClick={()=> handClickChip("presentLinha")}>
                    <IonIcon icon={location} color="dark" />
                        <IonLabel>Partidas Linha</IonLabel>
                </IonChip>
                <IonChip color = "primary" onClick={()=> handClickChip("presentGoleiro")}>
                    <IonIcon icon={handLeft} color="dark" />
                        <IonLabel>Partidas Gol</IonLabel>
                </IonChip>
                <IonChip color = "warning" onClick={()=> handClickChip("cartaoAmarelo")}>
                    <IonIcon icon={skull} color="dark" />
                        <IonLabel>Amarelo</IonLabel>
                </IonChip>
                <IonChip color = "danger" onClick={()=> handClickChip("cartaoVermelho")}>
                    <IonIcon icon={skullOutline} color="dark" />
                        <IonLabel>Vermelho</IonLabel>
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