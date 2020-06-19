import * as React from 'react';
import { IonPopover, IonList, IonItem, IonIcon, IonLabel, IonBadge, IonSelect, IonSelectOption, IonAlert, AlertInput } from '@ionic/react';
import { chevronDown } from 'ionicons/icons';
import {inputsIsGoleiro, inputsNotIsGoleiro} from '../../util/smallerCode'
export interface Props {
    player: {
        name: string,
        assist: number,
        golsContra: number,
        golsFavor: number,
        golsTomados: number,
        isGoleiro:boolean
    } | string,
    index: number,
    changePlayer: Function,
    removePlayer: Function
}

export interface State {
    showPopover: boolean
}
interface ActionsProps {
    name: string,
    isOpen: boolean,
    isGoleiro?: boolean,
    setState: Function,
    changePlayer?: Function
    removePlayer?: Function
}
function Actions(props: ActionsProps) {
    let alertHelp=<p>:p</p>
    if (props.removePlayer !== undefined) {
        const funcHelp = props.removePlayer;
        alertHelp = <IonAlert
            isOpen={props.isOpen}
            onDidDismiss={() => props.setState({ showPopover: false })}
            header={props.name}
            message={`Deseja remover ${props.name} ?`}
            buttons={[{
                    text: 'Cancelar',
                    role: 'cancel',
                },{
                    text: 'OK',
                    handler: (e) => {funcHelp(e)}
                }]}/>
    }
    else if(props.changePlayer !== undefined) {
        const funcHelp =  props.changePlayer;
        alertHelp = <IonAlert
            isOpen={props.isOpen}
            onDidDismiss={() => (console.log("grr"))}
            header={props.name}
            inputs={props.isGoleiro?inputsIsGoleiro:inputsNotIsGoleiro}
            buttons={[{
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }},{
                    text: 'OK', 
                    handler: (e) => {funcHelp(e)}
                }
            ]} />
    }
    return (alertHelp)
}

class PlayerOptions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { showPopover: false };
    }
    toggleShowPopover() {
        this.setState({ showPopover: !this.state.showPopover });
    }
    render() {
        const player = this.props.player
        //console.log(this.state.showPopover)
        return (
            <div>
                {typeof (player) !== 'string' ?
                    <IonItem onClick={() => this.toggleShowPopover()}>
                        <IonLabel>{player.name}</IonLabel>
                        <Actions name={player.name} isGoleiro={player.isGoleiro}
                            isOpen={this.state.showPopover} setState={(e: any) => this.setState(e)}
                            changePlayer={(e: any) => this.props.changePlayer(this.props.index, e)}/>
                        <IonBadge color="danger">{player.golsContra}</IonBadge>
                        <IonBadge color="warning">{player.assist}</IonBadge>
                        <IonBadge color="success">{player.golsFavor}</IonBadge>
                    </IonItem>
                    :
                    <IonItem onClick={() => this.toggleShowPopover()}>
                        <IonLabel>{player}</IonLabel>
                        <Actions name={player}
                            isOpen={this.state.showPopover} setState={(e: any) => this.setState(e)}
                            removePlayer={(e: any) => this.props.removePlayer(this.props.index, e)} />
                    </IonItem>}
            </div>
        );
    }
}

export default PlayerOptions;