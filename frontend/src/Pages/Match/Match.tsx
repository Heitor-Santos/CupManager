import React from 'react'
import { IonSlides, IonSlide } from '@ionic/react';
import Toolbar from '../../components/ToolBar'
import Header from './Header'
import TeamCard from './TeamCard'
import ClockOptions from './ClockOptions'
import Statics from './Statics'
import { getCup, postMatch, getMatch, getPlayer, getPlayers, putMatch, postPlayer } from '../../firebase/firestore'
const slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true
};
interface infoPlayer {
    "name": string,
    "isGoleiro": boolean,
    "assist": number,
    "golsFavor": number,
    "golsContra": number,
    "golsTomados": number
}
interface State {
    infoMatch: MatchData
    infoPlayers: Array<Array<infoPlayer>>
}
interface Props {
    match: {
        params: {
            cupName: string,
            matchName: string
        }
    }
}
interface MatchData {
    teamA: Array<string>,
    teamB: Array<string>,
    matchState: string,
    matchName: string,
    matchTime: undefined | string,
    gols: Array<number>,
    currGoleiros: Array<number>
}

class Match extends React.Component<Props, State> {
    cupName: string;
    matchName: string;
    constructor(props: Props) {
        super(props)
        this.state = {
            infoMatch: {
                teamA: ['Heitor', 'Gilmar', 'Elisson', 'Tiago'], //lista de nomes de jogadores do time A
                teamB: ['Ladislau','Robert','Clara','Késsia'], //lista de nomes de jogadores do time B
                matchState: "NOT-BEGUN", //estado atual da partida, NOT-BEGUN, BEGUN OU FINISHED
                matchName: this.props.match.params.matchName,
                matchTime: undefined,
                gols: [0, 0],
                currGoleiros: [0, 0]
            },
            infoPlayers: [[], []], //lista de informações sobre os jogadores
        }
        this.cupName = this.props.match.params.cupName;
        this.matchName = this.props.match.params.matchName;
    }
    async componentDidMount() {
        let AllInfoPlayers = []
        let match = await getMatch(this.cupName, this.matchName) as MatchData | undefined
        if (typeof match != 'undefined') {
            AllInfoPlayers.push(await getPlayers(this.cupName, undefined, undefined, undefined, match.teamA, this.matchName))
            AllInfoPlayers.push(await getPlayers(this.cupName, undefined, undefined, undefined, match.teamB, this.matchName))
            const infoPlayers = AllInfoPlayers.map(team => { return (team.map(player => player.stats[this.cupName])) })
            this.setState({ infoMatch: match, infoPlayers: infoPlayers })
        }
    }
    async matchStart() {
        postMatch(this.cupName, this.matchName, this.state.infoMatch)
        this.state.infoMatch.teamA.map(async (player) => {let resp = await postPlayer(this.cupName, player) as string;})
        this.state.infoMatch.teamB.map(async (player) => {let resp = await postPlayer(this.cupName, player) as string})
    }
    async whenIsOver(){

    }
    /**
     * 
     * @param {índice do time no qual vc quer add um jogador} currTeam 
     * @param {nome do jogador a ser adicionado} playerName 
     */
    addPlayer(currTeam: "teamA" | "teamB", playerName: string) {
        let infoMatch = this.state.infoMatch
        infoMatch[currTeam].push(playerName)
        this.setState({ infoMatch })
    }
    changePlayer(currTeam: number, indexPlayer: number, opt: keyof infoPlayer) {
        let infoPlayers = this.state.infoPlayers
        let currGoleiros = this.state.infoMatch.currGoleiros;
        let gols = this.state.infoMatch.gols
        if (opt == "isGoleiro") {
            infoPlayers[currTeam][currGoleiros[currTeam]][opt] = false
            infoPlayers[currTeam][indexPlayer][opt] = true
            currGoleiros[currTeam] = indexPlayer
        }
        else {
            infoPlayers[currTeam][indexPlayer][opt]++
            if (opt == "golsFavor") {
                infoPlayers[currTeam == 0 ? 1 : 0][currGoleiros[currTeam == 0 ? 1 : 0]]['golsTomados']++
                gols[currTeam]++
            }
            if (opt == "golsContra") {
                infoPlayers[currTeam][currGoleiros[currTeam]]['golsTomados']++
                gols[currTeam == 0 ? 1 : 0]++
            }
        }
        let infoMatch = this.state.infoMatch
        infoMatch.currGoleiros = currGoleiros;
        infoMatch.gols = gols
        this.setState({ infoPlayers, infoMatch })
    }
    removePlayer(currTeam: "teamA" | "teamB", indexPlayer: number) {
        let infoMatch = this.state.infoMatch
        infoMatch[currTeam].splice(indexPlayer, 1)
        this.setState({ infoMatch })
    }
    render() {
        const matchState = this.state.infoMatch.matchState
        const teams = [this.state.infoMatch.teamA, this.state.infoMatch.teamB]
        //decide se vai mandar só a lista de nome ou as info tbm
        const players = matchState == "NOT-BEGUN" ? teams : this.state.infoPlayers
        //console.log(this.state.matchTime)
        return (
            <div style={{}}>
                <Toolbar title={this.state.infoMatch.matchName} />
                <Header matchTime={this.state.infoMatch.matchTime} gols={this.state.infoMatch.gols} />
                <IonSlides options={slideOpts}>
                    <IonSlide>
                        <TeamCard team="Time A" players={players[0]}
                            addPlayer={(e: any) => this.addPlayer("teamA", e)}
                            changePlayer={(e: any, a: any) => this.changePlayer(0, e, a)}
                            removePlayer={(e: any) => this.removePlayer("teamA", e)}
                            matchState={this.state.infoMatch.matchState} />
                    </IonSlide>
                    <IonSlide>
                        <TeamCard team="Time B" players={players[1]}
                            addPlayer={(e: any) => this.addPlayer("teamB", e)}
                            changePlayer={(e: any, a: any) => this.changePlayer(1, e, a)}
                            removePlayer={(e: any) => this.removePlayer("teamB", e)}
                            matchState={this.state.infoMatch.matchState} />
                    </IonSlide>
                    <IonSlide>
                        <Statics infoPlayers={this.state.infoPlayers} />
                    </IonSlide>
                </IonSlides>
                <ClockOptions setState={(e: any) => this.setState(e)} onStart={() => this.matchStart()}
                    onOver={() => console.log('oi')} infoMatch={this.state.infoMatch} />
            </div>
        )
    }
}
export default Match;