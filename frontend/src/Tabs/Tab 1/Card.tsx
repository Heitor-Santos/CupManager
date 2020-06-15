import React, { useState, useEffect, Props } from 'react'
import { IonItem, IonButton, IonLabel, IonList, IonItemSliding, IonItemOption, IonItemOptions, IonIcon, IonAlert, IonLoading, IonFab, IonFabButton, IonText, } from '@ionic/react'
import "./Tab1.css"
import { construct, trash, key, create, chevronBackCircleOutline, chevronBackOutline, add } from 'ionicons/icons'
import { deleteMatche } from '../../firebase/firestore'
import ListIsEmpty from '../Tab 3/listIsEmpty'

interface ListPartida {
  list: any[],
  keyCup: string,
  getUpdate: (keyCup: any) => Promise<boolean>

}

const Card: React.FC<ListPartida> = ({list,keyCup,getUpdate}) => {

  const [showAlert, setShowAlert] = useState(false);
  const [idAlertMatch, setIdAlertMatch] = useState();
  const [ busy, setBusy ] = useState<boolean>(false);
  const [listEmpty, setEmpty] = useState<boolean>(false);
  const url = "/"+keyCup+"/"

  useEffect(()=>{
    if (list.length == 0) {
      setEmpty(true)
    } else {
      setEmpty(false)
    }
  },[list.length])


  const handleClick = async (idMatch : any) => {
    setBusy(true)
    await deleteMatche(idMatch, keyCup)
    const res = await getUpdate(keyCup)
    if (res == true) {
      setBusy(false)
    }
  }

  const createAlert = (idMatch : any) => {
    setShowAlert(true)
    setIdAlertMatch(idMatch)
  }

  const List = listEmpty? <ListIsEmpty /> : list.map((elem)=>(
    <IonItemSliding key = {parseInt(elem.matchName)}>
      <IonItem href = {url+elem.matchName}>
        <IonLabel> 
          Partida {elem.matchName}
          </IonLabel>
          <IonIcon icon={chevronBackOutline} />
          <IonIcon icon={trash} />
      </IonItem>
      <IonItemOptions side = "end">
        <IonItemOption color = "danger" onClick={() => createAlert(elem.matchName)}>
          Apagar Partida?
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
   ))

    return(
      <div>
        <IonLoading message="Apagando Partida..." duration={0} 
        isOpen={busy} />
        {List}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={'Deletar a Partida'}
          message={'Você quer continuar o processo de deletar partida? Saiba que depois de confirmado não é possível retornar ao estado anterior.'}
          buttons={[
            {
              text: 'Cancelar', 
              role: 'cancel'
            },
            {
              text: 'Confirmar',
              handler: () => {
                handleClick(idAlertMatch)
              }
            }
          ]}
        />
      </div>
    ) 
}

export default Card