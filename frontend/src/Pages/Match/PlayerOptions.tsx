import * as React from 'react';
import { IonPopover, IonList, IonItem, IonIcon, IonLabel, IonBadge, IonSelect, IonSelectOption, IonAlert } from '@ionic/react';
import { chevronDown } from 'ionicons/icons';

export interface Props {
    player: {
        name: string,
        assist: number,
        golsContra: number,
        golsFavor: number,
        golsTomados: number
    },
    index: number,
    changePlayer:Function
}

export interface State {
    showPopover: boolean
}
interface ActionsProps {
    index: number,
    name: string,
    isOpen: boolean,
    isGoleiro: boolean,
    setState: Function,
    changePlayer:Function
}
function Actions(props: ActionsProps) {
    return (
        <IonAlert
            isOpen={props.isOpen}
            onDidDismiss={()=>props.setState({ showPopover: false })}
            header={props.name}
            inputs={[
                {
                    name: 'gol',
                    type: 'radio',
                    label:'Marcou gol',
                    value: 'golsFavor'
                },
                {
                    name: 'golContra',
                    type: 'radio',
                    label:'Marcou gol contra',
                    value: 'golsContra'
                },
                {
                    name: 'golTomado',
                    type: 'radio',
                    label:'Levou gol',
                    value: 'golsTomados'
                },
                {
                    name: 'assist',
                    type: 'radio',
                    label:'Fez assistência',
                    value: 'assist'
                }]}
                buttons={[
                    {
                      text: 'Cancelar',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: () => {
                        console.log('Confirm Cancel');
                      }
                    },
                    {
                      text: 'OK',
                      handler: ()=> {props.changePlayer(props.index,"ghui");
                      }
                    }
                  ]} />
    )
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
            <div >
                <IonItem onClick={() => this.toggleShowPopover()}>
                    <IonLabel>{player.name}</IonLabel>
                    <Actions name={player.name} isGoleiro={true} 
                    isOpen={this.state.showPopover} setState={(e: any) => this.setState(e)}
                    changePlayer={(e:any)=>this.props.changePlayer(e,e)} index={this.props.index}/>
                    <IonBadge color="danger">{player.golsContra}</IonBadge>
                    <IonBadge color="warning">{player.assist}</IonBadge>
                    <IonBadge color="success">{player.golsFavor}</IonBadge>
                </IonItem>
            </div>
        );
    }
}

export default PlayerOptions;