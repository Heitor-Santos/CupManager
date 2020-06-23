import React from 'react'
import {IonAlert} from '@ionic/react';

interface Props{
    addPlayer: Function,
    showAlert: boolean,
    toggleAlert: Function,
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
    render() {// caixa com a opção de add jogador
        return (
            <IonAlert
                isOpen={this.props.showAlert}
                onDidDismiss={()=>this.props.toggleAlert()}
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
                        //manda como parâmetro pro addPlayer o nome escrito no input
                    }
                ]}
            />
        )
    }
}
export default Alert;

