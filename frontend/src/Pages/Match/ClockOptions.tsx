import React from 'react';
import { IonActionSheet, IonFabButton, IonIcon, IonDatetime } from '@ionic/react';
import { playCircleOutline, alarmOutline, refreshCircleOutline, stopCircleOutline, pauseCircleOutline, calendar } from 'ionicons/icons';
import Clock from '../../util/Clock'
const secondButtonInfo = [{
  "text": "Rolar a bola",
  "icon": playCircleOutline
},
{
  "text": "Pausar",
  "icon": pauseCircleOutline
}]
interface IProps {
  setState: Function,
  onStart: Function,
  onOver: Function,
  infoMatch: {
    teamA: Array<string>,
    teamB: Array<string>,
    matchState: string,
    matchName: string,
    matchTime: undefined | string,
    gols: Array<number>,
    currGoleiros: Array<number>
  }
}
interface IState {
  showActionSheet: boolean,
  secondButton: number,
  running: boolean,
}
class ClockOptions extends React.Component<IProps, IState>{
  cron: any;
  matchTime: any;
  constructor(props: any) {
    super(props)
    this.state = {
      showActionSheet: false,
      secondButton: 0,
      running: false
    }
    this.cron = null;
    this.matchTime = undefined;
  }
  handleChange(evt: any) {
    const time = new Date(evt.target.value)
    this.matchTime = time.toLocaleTimeString([], { minute: '2-digit', second: '2-digit', hour12: false })
    let infoMatch = this.props.infoMatch;
    infoMatch.matchTime = this.matchTime
    this.props.setState({ infoMatch })
    //console.log("sad")
  }
  createClock() {
    //console.log("criei")
    let time = this.matchTime
    let timey = parseInt(time.substring(0, 2)) * 60 + parseInt(time.substring(3, 5))
    this.cron = new Clock(timey)
    this.setState({ running: true })
    if (this.props.infoMatch.matchState == "NOT-BEGUN") {
      this.props.onStart()
    }
    this.cron.start()
    let repetecoID = setInterval(() => {
      let infoMatch = this.props.infoMatch;
      infoMatch.matchTime = this.cron.expecOutput
      this.props.setState({ infoMatch })
      //if (!this.state.running) clearInterval(repetecoID)
      if (this.cron.isOver()) {
        let infoMatch = this.props.infoMatch;
        infoMatch.matchTime = "00:00"
        this.props.setState({ infoMatch })
        this.props.onOver()
        clearInterval(repetecoID)
      }
    }, 1000)
  }
  onStart() {
    this.state.running ? this.cron.start() : this.createClock()
    this.setState({ secondButton: 1 })
    //console.log("bla")
  }
  onPause() {
    if (this.state.running) this.cron.pause()
    this.setState({ secondButton: 0 })
  }
  onStop() {
    if (this.state.running) {
      this.cron.stop()
      this.setState({ running: false, secondButton: 0 })
    }
  }
  onReset() {
    if (this.state.running) {
      this.cron.reset()
    }
  }
  render() {
    const tida = document.getElementById("tida")
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
            handler: this.state.running ? undefined : () => tida?.click()
          }, {
            text: secondButtonInfo[this.state.secondButton]["text"],
            icon: secondButtonInfo[this.state.secondButton]["icon"],
            handler: this.state.secondButton === 0 ? () => this.onStart() : () => this.onPause()
          }, {
            text: 'Reiniciar',
            icon: refreshCircleOutline,
            handler: () => this.onReset()
          }, {
            text: 'Parar',
            icon: stopCircleOutline,
            handler: () => this.onStop()
          }]} />
        <IonDatetime pickerFormat="mm:ss" id="tida" displayFormat=" "
          onIonChange={(e) => this.handleChange(e)} cancelText="Cancelar" doneText="OK" />
      </div>
    );
  }
}
export default ClockOptions