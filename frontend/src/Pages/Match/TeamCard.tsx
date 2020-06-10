import React from 'react'
import {
    IonCard, IonCardHeader, IonBadge, IonCardTitle, IonCardContent,
    IonList, IonItem, IonFab, IonIcon, IonLabel, IonFabButton
} from '@ionic/react';
import Alert from './Alert'
import { add } from 'ionicons/icons'
import PlayersList from './PlayersList'
interface Player{
    name: string,
    assist: number,
    golsContra: number,
    golsFavor: number,
    golsTomados: number
}
interface Props{
    players: Array<Player|string>,
    addPlayer: Function,
    changePlayer: Function,
    team: string
}
interface State{
    showAlert: boolean
}
class TeamCard extends React.Component<Props,State> {
    constructor(props:Props) {
        super(props)
        this.state = {
            showAlert: false
        }
    }
    toggleShowAlert() {
        this.setState({ showAlert: !this.state.showAlert })
        //console.log(this.state.showAlert)
    }
    render() {
        return (
            <div>
                {this.props.players.length < 6 ?//máximo de jogadores=6
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton onClick={() => this.toggleShowAlert()}>
                            <IonIcon icon={add}></IonIcon>
                        </IonFabButton>
                    </IonFab> : null
                }
                <IonCard style={{ width: '50vh' }}>
                    <IonCardHeader color="primary">
                        <IonCardTitle>{this.props.team}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <PlayersList players={this.props.players} changePlayer={(e:any)=>this.props.changePlayer(e,e)} />
                    </IonCardContent>
                </IonCard>
                <Alert showAlert={this.state.showAlert} addPlayer={(e:any)=>this.props.addPlayer(e)} />
            </div>
        )
    }
}
export default TeamCard;