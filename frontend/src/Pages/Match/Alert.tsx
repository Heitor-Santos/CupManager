import React from 'react'
import {IonAlert} from '@ionic/react';

interface Props{
    onClick?: Function,
    addPlayer: Function,
    showAlert: boolean
}
interface State{
    showAlert: boolean
}
class Alert extends React.Component<Props,State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            showAlert: true
        }
    }
    render() {
        console.log(this.state.showAlert)
        return (
            <IonAlert
                isOpen={this.props.showAlert}
                onDidDismiss={()=>this.props.onClick}
                header={'Adicionar jogador'}
                inputs={[
                    {
                        name: 'playerName',
                        type: 'text',
                        placeholder: 'Escreva o nome do jogador aqui'
                    }]}
                buttons={[
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                    },
                    {
                        text: 'Ok',
                        handler: (alertData) => this.props.addPlayer(alertData.playerName)
                    }
                ]}
            />
        )
    }
}
export default Alert;

