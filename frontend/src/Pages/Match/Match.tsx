import React from 'react'
import { IonSlides, IonSlide } from '@ionic/react';
import Toolbar from '../../components/ToolBar'
import Header from './Header'
import TeamCard from './TeamCard'
import ClockOptions from './ClockOptions'
import Statics from './Statics'

const slideOpts = {
    initialSlide: 2,
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
    matchTime: string|undefined
}
interface Props{

}
class Match extends React.Component<Props,State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            teams: [[], []], //lista de nomes de jogadores
            showAlert: false, //decide se abre a caixa de novo jogador
            infoPlayers: [[], []], //lista de informações sobre os jogadores
            matchState: "", //estado atual da partida, NOT-BEGUN, BEGUN OU FINISHED
            matchTitle: "",
            matchTime: undefined
        }
    }
    componentDidMount() { //apenas jogando valores quaisquer de teste
        const teams = [
            ['Heitor', 'Tiago', 'Gilmar', 'Elisson', 'Felipe'],
            ['João', 'Lucas', 'Marcelo', 'Artur', 'José']
        ]
        const infoPlayers = teams.map((team) => {
            return (team.map((player) => {
                return ({
                    name: player,
                    isGoleiro: false,
                    assist: Math.floor(Math.random() * 10),
                    golsFavor: Math.floor(Math.random() * 10),
                    golsContra: Math.floor(Math.random() * 10),
                    golsTomados: Math.floor(Math.random() * 10)
                })
            }))
        })
        this.setState({
            teams: teams,
            infoPlayers: infoPlayers,
            matchState: "BEGUN",
            matchTitle: "Partida 1"
        })
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
    changePlayer(currTeam:number, indexPlayer:number, opt: keyof infoPlayer) {
        let infoPlayers = this.state.infoPlayers
        if (opt == "isGoleiro")
            infoPlayers[currTeam][indexPlayer][opt] = !infoPlayers[currTeam][indexPlayer][opt]
        else 
            infoPlayers[currTeam][indexPlayer][opt]++
        this.setState({ infoPlayers })
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
                <Header matchTime={this.state.matchTime} />
                <IonSlides options={slideOpts}>
                    <IonSlide>
                        <TeamCard team="Time A" players={players[0]}
                            addPlayer={(e:any) => this.addPlayer(0, e)}
                            changePlayer={(e:any,a:any) => this.changePlayer(0, e,a)} />
                    </IonSlide>
                    <IonSlide>
                        <TeamCard team="Time B" players={players[1]}
                            addPlayer={(e:any) => this.addPlayer(1, e)}
                            changePlayer={(e:any,a:any) => this.changePlayer(1, e,a)} />
                    </IonSlide>
                    <IonSlide>
                        <Statics infoPlayers={this.state.infoPlayers} />
                    </IonSlide>
                </IonSlides>
                <ClockOptions setState={(e:any) => this.setState(e)} />
            </div>
        )
    }
}
export default Match;