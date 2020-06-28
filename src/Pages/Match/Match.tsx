import React from 'react'
import { IonFabButton, IonIcon, IonSlides, IonSlide, IonPage, IonContent, IonLoading } from '@ionic/react';
import { alarmOutline } from 'ionicons/icons';
import Toolbar from '../../components/ToolBar'
import Header from './Header'
import TeamCard from './TeamCard'
import Statics from './Statics'
import { postMatch, getMatch, getPlayers, putMatch, postPlayer, putPlayer, putDataStat } from '../../util/firestore'

const slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: false,
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
    busy: boolean,
    showActionSheet: boolean,
    busyStat: boolean
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
            busyStat: false,
            infoMatch: {
                teamA: [], //['Heitor', 'Gilmar', 'Elisson', 'Tiago'], //lista de nomes de jogadores do time A
                teamB: [], //['Ladislau', 'Robert', 'Clara', 'Késsia'], //lista de nomes de jogadores do time B
                matchState: "NOT-BEGUN",//"NOT-BEGUN", //estado atual da partida, NOT-BEGUN, BEGUN OU FINISHED
                matchName: this.props.match.params.matchName,
                matchTime: '00:00',
                gols: [0, 0],
                currGoleiros: [0, 0]
            },
            infoPlayers: [[], []], //lista de informações sobre os jogadores
            busy: true,
            showActionSheet: false,
        }
        this.cupName = this.props.match.params.cupName;
        this.matchName = this.props.match.params.matchName;
    }
    async componentDidMount() {
        let AllInfoPlayers = []
        let match = await getMatch(this.cupName, this.matchName) as MatchData | undefined
        if (typeof match != 'undefined') {
            AllInfoPlayers.push(await getPlayers(this.cupName, this.matchName, match.teamA))
            AllInfoPlayers.push(await getPlayers(this.cupName, this.matchName, match.teamB))
            const infoPlayers = AllInfoPlayers
            this.setState({ infoMatch: match, infoPlayers: infoPlayers })
        }
        this.setState({ busy: false });
    }
    async matchStart() {
        this.setState({busy: true})
        let infoMatch = this.state.infoMatch
        infoMatch.matchState = "BEGUN"
        postMatch(this.cupName, this.matchName, infoMatch)
        let teams = [this.state.infoMatch.teamA, this.state.infoMatch.teamB]
        let infoPlayers: Array<Array<infoPlayer>> = [[], []]
        for (let i = 0; i < teams.length; i++) {
            for (let player of teams[i]) {
                let resp = await postPlayer(this.cupName, player, this.matchName) as string
                infoPlayers[i].push({
                    "name": player,
                    "isGoleiro": false,
                    "assist": 0,
                    "golsFavor": 0,
                    "golsContra": 0,
                    "golsTomados": 0
                })
            }
        }
        this.setState({ busy: false, infoMatch, infoPlayers })
    }
    async whenIsOver() {
        let infoMatch = this.state.infoMatch
        infoMatch.matchState = "FINISHED"
        this.setState({ infoMatch })
        let infoPlayers = this.state.infoPlayers
        if (!this.state.busyStat) {
            console.log("Entrou aqui")
            this.setState({busy:true, busyStat: true})
            await putDataStat(this.cupName, infoPlayers).then(()=> {
                this.setState({busy: false, busyStat: false})
            })
        }
        let editMatch = await putMatch(this.cupName, this.matchName, this.state.infoMatch)
    }
    
    addPlayer(currTeam: "teamA" | "teamB", playerName: string) {
        let infoMatch = this.state.infoMatch
        infoMatch[currTeam].push(playerName)
        this.setState({ infoMatch })
    }
    async changePlayer(currTeam: 0 | 1, indexPlayer: number, opt: keyof infoPlayer) {
        let infoPlayers = this.state.infoPlayers
        let currGoleiros = this.state.infoMatch.currGoleiros;
        let gols = this.state.infoMatch.gols
        let playersToChange: Array<Array<number>> = [[], []]
        if (opt == "isGoleiro") {
            infoPlayers[currTeam][currGoleiros[currTeam]][opt] = false
            playersToChange[currTeam].push(currGoleiros[currTeam])
            infoPlayers[currTeam][indexPlayer][opt] = true
            currGoleiros[currTeam] = indexPlayer
        }
        else {
            infoPlayers[currTeam][indexPlayer][opt]++
            playersToChange[currTeam].push(indexPlayer)
            if (opt == "golsFavor") {
                infoPlayers[currTeam == 0 ? 1 : 0][currGoleiros[currTeam == 0 ? 1 : 0]]['golsTomados']++
                playersToChange[currTeam == 0 ? 1 : 0].push(currGoleiros[currTeam == 0 ? 1 : 0])
                gols[currTeam]++
            }
            if (opt == "golsContra") {
                infoPlayers[currTeam][currGoleiros[currTeam]]['golsTomados']++
                playersToChange[currTeam].push(currGoleiros[currTeam])
                gols[currTeam == 0 ? 1 : 0]++
            }
        }
        let infoMatch = this.state.infoMatch
        infoMatch.currGoleiros = currGoleiros;
        infoMatch.gols = gols
        this.setState({ infoPlayers, infoMatch })
        let editMatch = await putMatch(this.cupName, this.matchName, this.state.infoMatch)
        for (let i = 0; i < playersToChange.length; i++) {
            for (let player of playersToChange[i]) {
                console.log(this.state.infoMatch.matchState)
                let editPlayer = await putPlayer(this.cupName, infoPlayers[i][player].name, this.matchName, infoPlayers[i][player])
            }
        }
    }
    removePlayer(currTeam: "teamA" | "teamB", indexPlayer: number) {
        let infoMatch = this.state.infoMatch
        infoMatch[currTeam].splice(indexPlayer, 1)
        this.setState({ infoMatch })
    }
    toggleActionSheet() {
        this.setState({ showActionSheet: !this.state.showActionSheet });
    }
    render() {
        const matchState = this.state.infoMatch.matchState
        const teams = [this.state.infoMatch.teamA, this.state.infoMatch.teamB]
        //decide se vai mandar só a lista de nome ou as info tbm
        const players = matchState == "NOT-BEGUN" ? teams : this.state.infoPlayers
        return (
            <IonPage>
                <IonContent>
                    <div style={{}}>
                        <IonLoading message='Carregando partida...' duration={0} isOpen={this.state.busy} />
                        <Toolbar title={"Partida " + this.state.infoMatch.matchName} />
                        <Header gols={this.state.infoMatch.gols} onStart={() => this.matchStart()}
                            onOver={() => this.whenIsOver()} infoMatch={this.state.infoMatch}
                            showActionSheet={this.state.showActionSheet}
                            toggleActionSheet={() => this.toggleActionSheet()} />
                        <IonSlides options={slideOpts} pager={true}>
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
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.infoMatch.matchState == 'FINISHED' ? null :
                                <IonFabButton onClick={() => this.setState({ showActionSheet: true })}>
                                    <IonIcon icon={alarmOutline} ></IonIcon>
                                </IonFabButton>}
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}
export default Match;
