import React from 'react';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-google-charts'

class Estats  extends React.Component{
    constructor(props){
        super(props);
        this.state={chartData:null}
    }
    componentDidMount(){
        this.setupData();
    }
    setupData(){
        let chartData=[["Nome","Gols"]];
        let times = this.props.times;
        console.log(times)
        for(let time in times){
            times[time].map((jogador)=>{
                chartData.push([jogador.nome, jogador.estatsPartida.golsFavor])
            })
        }
        this.setState({chartData:chartData})
        console.log(chartData)
    }
    render(){
        return(
            <Chart 
                width='500px'
                height= '300px'
                chartType ='PieChart'
                data = {this.state.chartData}
                options = {{
                title: "Pizza Toppings Survey",
                is3d: true
            }}/>
        )
    }
}
export default Estats;