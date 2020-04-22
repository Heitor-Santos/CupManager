import React from 'react';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'react-google-charts'
class EstatsHelp extends React.Component{
    constructor(props){
        super(props);
        this.state={chartData: null}
    }
    componentDidMount(){
        console.log("OOOOO")
        this.setupData(this.props.times);
    }
    setupData(times){
        let chartData=[["Nome","Gols"]];
        console.log(times)
        console.log(this.props.times)
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
                width='1000px'
                height= '800px'
                chartType ='PieChart'
                data = {this.state.chartData}
                options = {{
                title: "Pizza Toppings Survey",
                is3d: true
            }}/>
        )
    }
    static getDerivedStateFromProps(newProps){
        let chartData=[["Nome","Gols"]];
        let times = newProps.times;
        console.log(newProps.times)
        for(let time in times){
            times[time].map((jogador)=>{
                chartData.push([jogador.nome, jogador.estatsPartida.golsFavor])
            })
        }
        return({
            chartData:chartData
        })
    }
}
class Estats  extends React.Component{
    constructor(props){
        super(props);
        this.state={chartData:null}
        console.log("AAAAA")
    }
    render(){
        console.log("can you hear me?")
        return(
            <EstatsHelp times = {this.props.times} />
        )
    }
}
export default Estats;