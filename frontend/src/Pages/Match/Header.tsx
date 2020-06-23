import React from 'react'
import { IonGrid, IonRow, IonCol } from '@ionic/react'
import ClockOptions from './ClockOptions'
interface Props {
    gols: Array<number>,
    onStart: Function,
    onOver: Function,
    showActionSheet: boolean,
    toggleActionSheet: Function,
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
interface State {
    matchTime: string | undefined
}
class Header extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)
        this.state = {
            matchTime: '00:00'
        }
    }
    
    render() {
        const gols = this.props.gols==undefined?[0,0]:this.props.gols
        return (
            <div>
                <IonGrid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'0px' }}>
                    <IonRow style={{ width: '50vh', marginBottom:'0px' }}>
                        <IonCol style={{ borderRadius: '2px', color: 'white', backgroundColor: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'0px' }}><h3>{gols[0]} X {gols[1]}</h3></IonCol>
                        <IonCol></IonCol>
                        <IonCol style={{ borderRadius: '2px', color: 'blue', borderStyle: 'solid', borderWidth: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'0px' }}><h3>{this.state.matchTime}</h3></IonCol>
                    </IonRow>
                </IonGrid>
                <ClockOptions setState={(e: any) => this.setState(e)} onStart={() => this.props.onStart()}
                    onOver={() => this.props.onOver()} infoMatch={this.props.infoMatch}
                    toggleActionSheet={() => this.props.toggleActionSheet()}
                    showActionSheet={this.props.showActionSheet} />
            </div>)
    }
}
export default Header