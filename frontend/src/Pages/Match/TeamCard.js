import React from 'react'
import {
    IonCard, IonCardHeader, IonBadge, IonCardTitle, IonCardContent,
    IonList, IonItem, IonFab, IonIcon, IonButton, IonLabel, IonFabButton, IonImg, IonContent, IonPage
} from '@ionic/react';
import Alert from './Alert'
import { add } from 'ionicons/icons'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

function PlayersList(props) {
    const team = props.players
    let players = team.map((player) => {
        return typeof (player) === "object" ?
            <IonItem>
                <IonLabel>{player.name}</IonLabel>
                <IonBadge color="primary">{player.golsContra}</IonBadge>
                <IonBadge color="secondary">{player.assist}</IonBadge>
                <IonBadge color="tertiary">{player.golsFavor}</IonBadge>
            </IonItem>
            :
            <IonItem>
                <IonLabel>{player}</IonLabel>
            </IonItem>
        }
    )
    return (<IonList>{players}</IonList>)
}
class TeamCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showAlert: false
        }
    }
    toggleShowAlert() {
        this.setState({ showAlert: !this.state.showAlert })
        console.log(this.state.showAlert)
    }
    render() {
        return (
            <div>
                {this.props.players.length < 6 ?//máximo de jogadores=6
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton onClick={(e) => this.toggleShowAlert(e)}>
                            <IonIcon icon={add}></IonIcon>
                        </IonFabButton>
                    </IonFab> : null
                }
                <IonCard style={{ width: '50vh' }}>
                    <IonCardHeader color="primary">
                        <IonCardTitle>{this.props.team}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <PlayersList players={this.props.players} />
                    </IonCardContent>
                </IonCard>
                {this.state.showAlert ? <Alert showAlert={this.state.showAlert}
                    addPlayer={(e) => this.props.addPlayer(e)} /> : null}
            </div>
        )
    }
}
export default TeamCard;