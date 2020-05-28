import React, { useState, useEffect, Props } from 'react'
import { IonItem, IonButton, IonLabel, IonList, IonItemSliding, IonItemOption, IonItemOptions, IonIcon, } from '@ionic/react'
import "./Tab1.css"
import { construct, trash } from 'ionicons/icons'

interface ListPartida {
  list: any[],
}

const Card: React.FC<ListPartida> = ({list}) => {
  
  
  const List = list.map((elem)=>(
    <IonItemSliding key = {elem.idPartida}>
      <IonItem>
        <IonLabel> Partida {elem.idPartida} </IonLabel>
        <IonIcon icon={trash}></IonIcon>
      </IonItem>
      <IonItemOptions side = "end">
        <IonItemOption onClick={() => alert('pressed delete')}>
          Apagar Partida?
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
   ))

    return(
      <div>
        {List}
      </div>
    )
      
}

export default Card