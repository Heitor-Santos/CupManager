import * as React from 'react';
import { Bar } from 'react-chartjs-2'
interface Player {
    name: string,
    assist: number,
    golsFavor: number,
    golsContra: number,
    golsTomados: number
}
interface infoPlayers extends Array<Player> {
    [index: number]: Player
}
export interface Props {
    infoPlayers: infoPlayers
}

export interface State {

}

class Statics extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        //this.state = { : };
    }
    render() {
        const charData = {
            labels: this.props.infoPlayers.map((player) => player.name),
            datasets: [{
                label: 'Gols',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: this.props.infoPlayers.map((player) => player.golsFavor)
            }]
        }
        return (
            <Bar
                data={charData}
                height={300}
                options={{scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }}}
            />
        );
    }
}

export default Statics;