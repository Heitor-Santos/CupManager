import * as React from 'react';
import { IonLabel, IonBadge, IonItem, IonList } from '@ionic/react';
import PlayerOptions from './PlayerOptions'
const uniqid = require('uniqid');
interface Player {
    name: string,
    assist: number,
    golsContra: number,
    golsFavor: number,
    golsTomados: number,
    isGoleiro: boolean
}
interface Props {
    players: Array<Player | string>,
    changePlayer: Function,
    removePlayer: Function,
    matchState:string
}

function PlayersList(props: Props) {
    const team = props.players
    let players = team.map((player, index) => 
        <PlayerOptions key={uniqid()} player={player} removePlayer={(e:any)=>props.removePlayer(e)} 
        index={index} changePlayer={(e: any, a: any) => props.changePlayer(e, a)} 
        matchState={props.matchState}/>
    )
    return (<IonList>{players}</IonList>)
}

export default PlayersList;