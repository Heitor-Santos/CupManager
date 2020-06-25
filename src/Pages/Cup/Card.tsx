import React, { useState, useEffect} from 'react'
import { IonItem, IonLabel, IonItemSliding, IonItemOption, IonItemOptions, IonIcon, IonAlert, IonLoading} from '@ionic/react'
import "./Cup.css"
import { trash, chevronBackOutline} from 'ionicons/icons'
import { deleteMatche } from '../../util/firestore.js'

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

  const List = listEmpty? <IonItem><IonLabel><strong>Lista vazia! Aperte no "+" para adicionar partida!</strong></IonLabel></IonItem> : list.map((elem)=>(
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