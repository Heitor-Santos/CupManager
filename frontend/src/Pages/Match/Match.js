import React from 'react'
import { IonSlides, IonSlide,IonAlert, IonButton, IonLoading, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonContent, IonFab, IonFabButton, IonIcon, IonPage, IonApp, IonInfiniteScroll, IonImg } from '@ionic/react';
import TeamCard from './TeamCard'
import { add } from 'ionicons/icons'
import HandleStorge from '../../util/handleStorage'
//import AwesomeSlider from 'react-awesome-slider';
//import 'react-awesome-slider/dist/styles.css';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
const slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoHeight: true
};
const cardContent = <TeamCard />

class Match extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: [
                ['Heitor', 'Tiago', 'Gilmar', 'Elisson', 'Felipe', 'Robert'],
                ['João', 'Lucas', 'Marcelo', 'Artur', 'José', 'Pedro']
            ],
            showAlert: false
        }
    }
    componentDidMount() {
        console.log("oh naooo")
        const teams = [
            ['Heitor', 'Tiago', 'Gilmar', 'Elisson', 'Felipe', 'Robert'],
            ['João', 'Lucas', 'Marcelo', 'Artur', 'José', 'Pedro']
        ]
        console.log("eu aqui")
        this.setState({ teams: teams })
    }
    handleClick() {
        this.setState({showAlert:true})
        console.log('mudei')
    }
    render() {
        return (
            <div>
                <IonSlides options={slideOpts}>
                    <IonSlide>
                        <TeamCard team="Time A" players={this.state.teams[0]} onClick={()=>this.handleClick()} />
                    </IonSlide>
                    <IonSlide>
                        <TeamCard team="Time B" players={this.state.teams[1]} onClick={()=>this.handleClick()}/>
                    </IonSlide>
                </IonSlides>
                <IonAlert
                    isOpen={this.state.showAlert}
                    onDidDismiss={() => this.setState({showAlert:false})}
                    header={'Alert'}
                    subHeader={'Subtitle'}
                    message={'This is an alert message.'}
                    buttons={['OK']}
                />
            </div>
        )
    }
}
export default Match;