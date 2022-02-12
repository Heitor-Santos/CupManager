import React from 'react'
import { AlertInput, IonAlert } from '@ionic/react';
import { getTeams } from '../../util/firestore';
import HandleStorage from '../../util/handleStorage';
import { alert } from 'ionicons/icons';

interface Props {
    addPlayer: Function,
    showAlert: boolean,
    toggleAlert: Function,
    changeTeam: Function
}
interface State {
    showAlert: boolean,
    teams: any[]
}
class Alert extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showAlert: true,
            teams: []
        }
    }

    async getTeamsStore() {
        const store = new HandleStorage();
        const keyCup = await store.getLastCup()
        const res = await getTeams(keyCup);
        this.setState({ teams: res });
        console.log(res);
    }

    componentDidMount() {
        this.getTeamsStore()
    }

    handleTeams () {
        const alertInput : AlertInput[] = [];

        for (let team of this.state.teams) {
            alertInput.push({
                name: team.name,
                type: 'radio',
                label: team.name,
                value: team.name,
                checked: false
            })
        }

        return alertInput
    }

    render() {// caixa com a opção de add jogador
        return (
            <IonAlert
                isOpen={this.props.showAlert}
                onDidDismiss={() => this.props.toggleAlert()}
                header={'Adicionar Time'}
                inputs={this.handleTeams()}
                buttons={[
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                    },
                    {
                        text: 'Ok',
                        handler: (alertData) => {
                            const team : any = this.state.teams.find(team => team.name === alertData);

                            for (let player of team.players) {
                                this.props.addPlayer(player)
                            }

                            this.props.changeTeam(team.name)
                            return true;
                        }
                        //manda como parâmetro pro addPlayer o nome escrito no input
                    }
                ]}
            />
        )
    }
}
export default Alert;

