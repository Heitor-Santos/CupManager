import React from 'react'
import { IonGrid, IonRow, IonCol } from '@ionic/react'

interface Props {
    matchTime: string | undefined,
    gols: Array<number>
}
interface State {
    matchTime: string | undefined
}
class Header extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)
        this.state = {
            matchTime: undefined
        }
    }
    componentDidMount() {
        this.setState({ matchTime: this.props.matchTime });
    }
    static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        return({matchTime: nextProps.matchTime})
    }
    render() {
        const gols = this.props.gols
        const head = this.state.matchTime===undefined?null:
        <IonGrid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IonRow style={{ width: '50vh' }}>
                    <IonCol style={{ borderRadius: '2px', color: 'white', backgroundColor: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h3>{gols[0]} X {gols[1]}</h3></IonCol>
                    <IonCol></IonCol>
                    <IonCol style={{ borderRadius: '2px', color: 'blue', borderStyle: 'solid', borderWidth: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h3>{this.state.matchTime}</h3></IonCol>
                </IonRow>
            </IonGrid>
        return (head)
    }
}
export default Header