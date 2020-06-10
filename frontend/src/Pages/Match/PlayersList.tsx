import * as React from 'react';
import { IonLabel, IonBadge, IonItem, IonList} from '@ionic/react';
import PlayerOptions from './PlayerOptions'
interface Player{
    name: string,
    assist: number,
    golsContra: number,
    golsFavor: number,
    golsTomados: number,
}
interface Props{
    players: Array<Player|string>,
    changePlayer: Function,
}
 
function PlayersList(props: Props) {
    const team = props.players
    let players = team.map((player,index) => {
        return typeof(player)!=='string'?
            <PlayerOptions player={player} index={index} changePlayer={(e:any,a:any)=>props.changePlayer(e,a)} />
            :
            <IonItem>
                <IonLabel>{player}</IonLabel>
            </IonItem>
        }
    )
    return (<IonList>{players}</IonList>)
}
 
export default PlayersList;