import React from 'react'
import {
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonList, IonItem, IonFab, IonIcon, IonButton, IonLabel, IonFabButton, IonImg, IonContent, IonPage
} from '@ionic/react';
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
    let players = team.map((player) =>
        <IonItem>
            <IonLabel>{player}</IonLabel>
        </IonItem>
    )
    return (<IonList>{players}</IonList>)
}
class TeamCard extends React.Component {
    render() {
        const team = this.props.team;
        const img = team == "Time A" ? require('../../media/timea.png') : require('../../media/timeb.png')
        return (
            <div>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={this.props.onClick}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
                <IonCard>
                    <IonImg src={img} />
                    <IonCardHeader>
                        <IonCardTitle>{this.props.team}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <PlayersList players={this.props.players} />
                    </IonCardContent>
                </IonCard>
            </div>
        )
    }
}
export default TeamCard;