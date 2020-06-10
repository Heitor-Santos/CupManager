import * as React from 'react';
import { Bar } from 'react-chartjs-2'

//Acho que todo esse componente é bem direto ao ponto, qualquer dúvida estou a postos
interface Player {
    name: string,
    assist: number,
    golsFavor: number,
    golsContra: number,
    golsTomados: number
}
interface team extends Array<Player> {
    [index: number]: Player
}
export interface Props {
    infoPlayers: Array<team>
}

class Statics extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        const charData = {
            labels: this.props.infoPlayers.flat().map((player) => player.name),
            datasets: [{
                label: 'Gols',
                backgroundColor: '#63a5ff',
                borderColor: 'grey',
                borderWidth: 1,
                hoverBackgroundColor: 'blue',
                hoverBorderColor: 'black',
                data: this.props.infoPlayers.flat().map((player) => player.golsFavor)
            },
            {
                label: 'Assistências',
                hidden: true,
                backgroundColor: '#63a5ff',
                borderColor: 'grey',
                borderWidth: 1,
                hoverBackgroundColor: 'blue',
                hoverBorderColor: 'black',
                data: this.props.infoPlayers.flat().map((player) => player.assist)
            },
            {
                label: 'Gols contra',
                hidden: true,
                backgroundColor: '#63a5ff',
                borderColor: 'grey',
                borderWidth: 1,
                hoverBackgroundColor: 'blue',
                hoverBorderColor: 'black',
                data: this.props.infoPlayers.flat().map((player) => player.golsContra)
            },
            {
                label: 'Gols tomados',
                hidden: true,
                backgroundColor: '#63a5ff',
                borderColor: 'grey',
                borderWidth: 1,
                hoverBackgroundColor: 'blue',
                hoverBorderColor: 'black',
                data: this.props.infoPlayers.flat().map((player) => player.golsTomados)
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