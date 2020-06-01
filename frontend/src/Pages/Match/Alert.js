import React from 'react'
import { IonSlides, IonSlide, IonAlert, IonButton, IonLoading, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonFab, IonFabButton, IonIcon, IonPage, IonApp, IonInfiniteScroll, IonImg } from '@ionic/react';
import TeamCard from './TeamCard'
import { add, key } from 'ionicons/icons'

class Alert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAlert: true
        }
    }
    render() {
        console.log(this.state.showAlert)
        return (
            <IonAlert
                isOpen={this.state.showAlert}
                onDidDismiss={this.props.onClick}
                header={'Adicionar jogador'}
                inputs={[
                    {
                        name: 'playerName',
                        type: 'text',
                        placeholder: 'Escreva o nome do jogador aqui'
                    }]}
                buttons={[
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                    },
                    {
                        text: 'Ok',
                        handler: (alertData) => this.props.addPlayer(alertData.playerName)
                    }
                ]}
            />
        )
    }
}
export default Alert;

