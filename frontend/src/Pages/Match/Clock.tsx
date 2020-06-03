import React from 'react';
import { IonActionSheet, IonFabButton, IonIcon, IonDatetime} from '@ionic/react';
import { playCircleOutline, alarmOutline, refreshCircleOutline, stopCircleOutline, pauseCircleOutline,calendar } from 'ionicons/icons';

const secondButtonInfo = [{
  "text": "Rolar a bola",
  "icon": playCircleOutline
},
{
  "text": "Pausar",
  "icon": pauseCircleOutline
}]
interface IProps {
}
interface IState {
  showActionSheet: boolean,
  secondButton: number,
  matchTime: string|undefined,
}
class Clock extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {
      showActionSheet: false,
      secondButton: 0,
      matchTime: undefined
    } 
  }
  handleChange(evt: any){
      const time = new Date(evt.target.value)
      const matchTime = time.toLocaleTimeString([],{minute:'2-digit', second:'2-digit', hour12: false})
      this.setState({matchTime:matchTime})
  }
  render() {
    const tida = document.getElementById("tida")
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5vh' }}>
          <IonFabButton onClick={() => this.setState({ showActionSheet: true })}>
            <IonIcon icon={alarmOutline} ></IonIcon>
          </IonFabButton>
        </div>
        <IonActionSheet
          isOpen={this.state.showActionSheet}
          onDidDismiss={() => this.setState({ showActionSheet: false })}
          cssClass='my-custom-class'
          buttons={[{
            text: 'Tempo da partida',
            role: 'destructive',
            icon: calendar,
            handler: () => {
                tida?.click()
            }
          }, {
            text: secondButtonInfo[this.state.secondButton]["text"],
            icon: secondButtonInfo[this.state.secondButton]["icon"],
            handler: () => {
              console.log('Share clicked');
            }
          }, {
            text: 'Reiniciar',
            icon: refreshCircleOutline,
            handler: () => {
              console.log('Play clicked');
            }
          }, {
            text: 'Parar',
            icon: stopCircleOutline,
            handler: () => {
              console.log('Favorite clicked');
            }
          }]}/>
        <IonDatetime pickerFormat="mm:ss" id="tida"  displayFormat=" " 
        onIonChange={(e)=>this.handleChange(e)} cancelText="Cancelar" doneText="OK"/>
      </div>
    );
  }
}
export default Clock