import React from 'react'
import { IonSlides, IonSlide, IonIcon, IonFabButton,IonActionSheet } from '@ionic/react';
import { alarmOutline } from 'ionicons/icons'
import TeamCard from './TeamCard'
import Clock from './Clock'
const slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true
};
//const [showActionSheet, setShowActionSheet] = useState(false);
class Match extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: [[], []], //lista de nomes de jogadores
            showAlert: false, //decide se abre a caixa de novo jogador
            infoPlayers: [[], []], //lista de informações sobre os jogadores
            matchState: null, //estado atual da partida, NOT-BEGUN, BEGUN OU FINISHED
            showActionSheet:false
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
            matchState: "NOT-BEGUN"
        })
    }
    /**
     * 
     * @param {índice do time no qual vc quer add um jogador} currTeam 
     * @param {nome do jogador a ser adicionado} playerName 
     */
    addPlayer(currTeam, playerName) {
        let teams = this.state.teams
        teams[currTeam].push(playerName)
        this.setState({ teams: teams })
    }
    render() {
        console.log(this.state.showActionSheet)
        const matchState = this.state.matchState
        const teams = this.state.teams
        //decide se vai mandar só a lista de nome ou as info tbm
        const players = matchState == "NOT-BEGUN" ? teams : this.state.infoPlayers
        return (
            <div>
                <IonSlides options={slideOpts}>
                    <IonSlide>
                        <TeamCard team="Time A" players={players[0]} addPlayer={(e) => this.addPlayer(0, e)} />
                    </IonSlide>
                    <IonSlide>
                        <TeamCard team="Time B" players={players[1]} addPlayer={(e) => this.addPlayer(1, e)} />
                    </IonSlide>
                </IonSlides>
                <Clock/>
            </div>
        )
    }
}
export default Match;