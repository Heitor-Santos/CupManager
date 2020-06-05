import React from 'react'
import { IonGrid, IonRow, IonCol } from '@ionic/react'

interface IProps {
    matchTime: string | undefined
}
interface IState {
    matchTime: string | undefined
}
class Header extends React.Component<IProps, IState>{
    constructor(props: any) {
        super(props)
        this.state = {
            matchTime: undefined
        }
    }
    componentDidMount() {
        this.setState({ matchTime: this.props.matchTime });
    }
    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return({matchTime: nextProps.matchTime})
    }
    render() {
        const head = this.state.matchTime===undefined?null:
        <IonGrid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <IonRow style={{ width: '50vh' }}>
                    <IonCol style={{ borderRadius: '2px', color: 'white', backgroundColor: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h3>0 X 0</h3></IonCol>
                    <IonCol></IonCol>
                    <IonCol style={{ borderRadius: '2px', color: 'blue', borderStyle: 'solid', borderWidth: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h3>{this.state.matchTime}</h3></IonCol>
                </IonRow>
            </IonGrid>
        return (head)
    }
}
export default Header