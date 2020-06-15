import React from 'react'
import HandleStorage from '../../util/handleStorage'
import { IonItem, IonList, IonLabel, IonCard, IonCardHeader, IonImg, IonCardTitle, IonCardContent } from '@ionic/react';

function ListIsEmpty(props){
    return(
        <IonCard>
            <IonImg src={require('../../media/dogo_error.jpg')}/>
            <IonCardHeader>
                <IonCardTitle>Oops...</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                Parece que está lista está vazia, tente criar uma partida, acessar um campeonato ou reniciar o app.
            </IonCardContent>
        </IonCard>
    )
}
export default ListIsEmpty;