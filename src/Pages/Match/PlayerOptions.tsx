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
        isGoleiro:boolean,
        cartaoVermelho: number,
        cartaoAmarelo: number
    } | string,
    index: number,
    changePlayer: Function,
    removePlayer: Function,
    matchState:string
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
    if (props.removePlayer !== undefined) {//A partida ainda não começou e aparece a opção de remover jogador
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
        //a partida já começou e tem as opções de mudar as info do jogador
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
        return (
            <div>
                {typeof (player) !== 'string'?
                    <IonItem onClick={this.props.matchState=='BEGUN' ? () => this.toggleShowPopover():undefined}>
                        <IonLabel>{player.name}</IonLabel>
                        <Actions name={player.name} isGoleiro={player.isGoleiro}
                            isOpen={this.state.showPopover} setState={(e: any) => this.setState(e)}
                            changePlayer={(e: any) => this.props.changePlayer(this.props.index, e)}/>
                        <IonBadge color="success">{player.golsFavor}</IonBadge>
                        <IonBadge color="secondary">{player.assist}</IonBadge>
                        <IonBadge color="dark">{player.golsContra}</IonBadge>
                        <IonBadge color="danger">{player.cartaoVermelho}</IonBadge>
                        <IonBadge color="warning">{player.cartaoAmarelo}</IonBadge>
                    </IonItem>
                    :
                    <IonItem onClick={() => this.toggleShowPopover()}>
                        {/**Se a partida ainda não tiver começado, só vai aparecer a opção de remover */}
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
