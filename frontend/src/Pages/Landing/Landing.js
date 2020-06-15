import React from 'react';
import { IonSearchbar, IonContent, IonButton, IonImg, IonToast} from '@ionic/react';
import ToolBar from '../../components/ToolBar'
import HandleStorage from '../../util/handleStorage'
import { Redirect } from 'react-router';

const store = new HandleStorage()
class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cupName: "",
            redirect: false,
            showToast: false
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
        if (cupName !== "") {
            cupName = cupName.replace("/", "|")
            const isFirstTime = await store.isFirstTime()
            await store.setLastCup(cupName)
            //onClick()
            store.pushToRecentCups(cupName)
            if (onClick !== undefined) {
                onClick()
            } else {
               this.setState({redirect:true})
               this.setState({redirect:false})
            }
        } else {
            this.setState({showToast:true})
        }
    }

    
    render() {
        const res = this.state.redirect ? <Redirect to = "/tab1"/> :
        <IonContent>
        <IonToast
        isOpen={this.state.showToast}
        color = "danger"
        onDidDismiss={() => this.setState({showToast:false})}
        message="Por favor digite um nome de campeonato válido!"
        duration={2000}
        position = "middle"
        />
        <ToolBar title={this.props.title} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5vh', marginBottom: '5vh' }}>
            <IonImg src={require('../../media/tournament.png')}></IonImg>
        </div>
        <IonSearchbar placeholder="Digite o nome do campeonato"
            showCancelButton="focus"
            onIonChange={(evt) => this.handleChange(evt)} />
        <IonButton expand="block"
            color = "warning"
            onClick={() => this.handleClick(this.state.cupName, this.props.onClick)}>
            Entrar no campeonato
        </IonButton>
        </IonContent>
        return (
           res
        )
    }
}
export default Landing