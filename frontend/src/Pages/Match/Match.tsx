import React from 'react'
import { IonSlides, IonSlide } from '@ionic/react';
import Toolbar from '../../components/ToolBar'
import Header from './Header'
import TeamCard from './TeamCard'
import ClockOptions from './ClockOptions'
import Statics from './Statics'
import { getCup, postMatch, getMatch, getPlayer, getPlayers } from '../../firebase/firestore'
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
    teams: Array<Array<string>>,
    showAlert: boolean,
    infoPlayers: Array<Array<infoPlayer>>
    matchState: string,
    matchTitle: string,
    matchTime: string | undefined,
    gols: Array<number>,
    currGoleiros: Array<number>
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
    matchTime: string,
    gols: Array<number>,
    currGoleiros: Array<number>
}
class Match extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            teams: [[], []], //lista de nomes de jogadores
            showAlert: false, //decide se abre a caixa de novo jogador
            infoPlayers: [[], []], //lista de informações sobre os jogadores
            matchState: "NOT-BEGUN", //estado atual da partida, NOT-BEGUN, BEGUN OU FINISHED
            matchTitle: this.props.match.params.matchName,
            matchTime: undefined,
            gols: [0, 0],
            currGoleiros: [0, 0]
        }
    }
    async componentDidMount() {
        let match: undefined | MatchData;
        const cupName = this.props.match.params.cupName;
        const matchName = this.props.match.params.matchName;
        match = await getMatch(cupName, matchName) as MatchData|undefined
        if (typeof match != 'undefined') {
            const teams = [match.teamA, match.teamB]
            const infoPlayers = await getPlayers(cupName, 'listOfMatches', 'array-contains', matchName)
            this.setState({
                teams: teams,
                infoPlayers: infoPlayers,
                matchState: match.matchState,
                gols: match.gols,
                currGoleiros: match.currGoleiros
            })
        }
    }
    /**
     * 
     * @param {índice do time no qual vc quer add um jogador} currTeam 
     * @param {nome do jogador a ser adicionado} playerName 
     */
    addPlayer(currTeam: number, playerName: string) {
        let teams = this.state.teams
        teams[currTeam].push(playerName)
        this.setState({ teams: teams })
    }
    changePlayer(currTeam: number, indexPlayer: number, opt: keyof infoPlayer) {
        let infoPlayers = this.state.infoPlayers
        let currGoleiros = this.state.currGoleiros;
        let gols = this.state.gols
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
        this.setState({ infoPlayers, currGoleiros, gols })
    }
    removePlayer(currTeam: number, indexPlayer: number) {
        let teams = this.state.teams
        teams[currTeam].splice(indexPlayer, 1)
        this.setState({ teams: teams })
    }
    render() {
        const matchState = this.state.matchState
        const teams = this.state.teams
        //decide se vai mandar só a lista de nome ou as info tbm
        const players = matchState == "NOT-BEGUN" ? teams : this.state.infoPlayers
        //console.log(this.state.matchTime)
        return (
            <div style={{}}>
                <Toolbar title={this.state.matchTitle} />
                <Header matchTime={this.state.matchTime} gols={this.state.gols} />
                <IonSlides options={slideOpts}>
                    <IonSlide>
                        <TeamCard team="Time A" players={players[0]}
                            addPlayer={(e: any) => this.addPlayer(0, e)}
                            changePlayer={(e: any, a: any) => this.changePlayer(0, e, a)}
                            removePlayer={(e: any) => this.removePlayer(0, e)}
                            matchState={this.state.matchState} />
                    </IonSlide>
                    <IonSlide>
                        <TeamCard team="Time B" players={players[1]}
                            addPlayer={(e: any) => this.addPlayer(1, e)}
                            changePlayer={(e: any, a: any) => this.changePlayer(1, e, a)}
                            removePlayer={(e: any) => this.removePlayer(1, e)}
                            matchState={this.state.matchState} />
                    </IonSlide>
                    <IonSlide>
                        <Statics infoPlayers={this.state.infoPlayers} />
                    </IonSlide>
                </IonSlides>
                <ClockOptions setState={(e: any) => this.setState(e)} />
            </div>
        )
    }
}
export default Match;