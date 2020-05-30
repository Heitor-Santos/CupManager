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
    handleChange(evt) {
        this.setState({ cupName: evt.target.value })
    }
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