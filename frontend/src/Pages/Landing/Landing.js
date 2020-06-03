import React from 'react';
import { IonSearchbar, IonContent, IonButton, IonImg } from '@ionic/react';
import ToolBar from '../../components/ToolBar'
import HandleStorage from '../../util/handleStorage'

const store = new HandleStorage()
class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cupName: ""
        }
    }
    //só faz setar o nome do campeonato escrito na barra de pesquisa
    handleChange(evt) {
        this.setState({ cupName: evt.target.value })
    }
    /**
     * Essa função faz 3 coisas, a função parâmetro, setar o último campeonato acessado, e colocar no histórico
     * @param {o nome do campeonato} cupName 
     * @param {função a ser realizada quando o botão for apertado} onClick 
     */
    async handleClick(cupName, onClick) {
        if (cupName != "") {
            const isFirstTime = await store.isFirstTime()
            if (isFirstTime == true) {
                await store.setLastCup(cupName)
                onClick()
            }
            store.pushToRecentCups(cupName)
        }
        
    }
    render() {
        return (
            <IonContent>
                <ToolBar title={this.props.title}/>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5vh', marginBottom: '5vh' }}>
                    <IonImg src={require('../../media/tournament.png')}></IonImg>
                </div>
                <IonSearchbar placeholder="Digite o nome do campeonato"
                    showCancelButton="focus"
                    onIonChange={(evt) => this.handleChange(evt)} />
                <IonButton expand="block"
                    onClick={() => this.handleClick(this.state.cupName, this.props.onClick)}>
                    Entrar no campeonato
                </IonButton>
            </IonContent>
        )
    }
}
export default Landing