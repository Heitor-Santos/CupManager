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
        let chartData = this.setupData(this.props.times, this.props.title)
    }
    setupData(times, title){
        let chartData=[["Nome",title]];
        console.log(times)
        console.log(this.props.times)
        let temp=[]
        for(let time in times){
            times[time].map((jogador)=>{
                let aux = jogador.estatsPartida[this.props.opcao]
                temp.push([jogador.nome, aux?aux:0])
            })
        }
        temp.sort().reverse();
        temp.map(el=>chartData.push(el))
        console.log(chartData)
        return chartData
        console.log(chartData)
    }
    render(){
        return(
            <Chart 
                width='1000px'
                height= '800px'
                chartType ='ColumnChart'
                data = {this.state.chartData}
                options = {{
                title: this.props.title,
                is3d: true
            }}/>
        )
    }
    static getDerivedStateFromProps(newProps){
        let chartData=[["Nome",newProps.title]];
        let times = newProps.times;
        let temp = []
        console.log(newProps.times)
        for(let time in times){
            times[time].map((jogador)=>{
                let aux = jogador.estatsPartida[newProps.opcao]
                temp.push([jogador.nome, aux?aux:0])
            })
        }
        temp.sort().reverse();
        temp.map(el=>chartData.push(el))
        console.log(chartData)
        return({
            chartData:chartData
        })
    }
}
function ListaOpcoes(props){
    const opcoes=[
        ["golsFavor","Gols"],
        ["assist","Assistências"],
        ["golsContra","Gols Contras"],
        ["golsTomados","Gols Tomados"]
    ]
    opcoes.map(opcao=>console.log(opcao))
    const lista = opcoes.map(opcao=>
        <a class="dropdown-item" href="#"
            onClick={(evt)=>props.onClick(evt)}
            id={opcao[0]}
            name={opcao[1]}>{opcao[1]}
        </a>
    )
    return lista;
}
class Estats  extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chartData:null,
            show: false,
            title: "Gols",
            opcao: "golsFavor"
        } 
        this.handleClick = this.handleClick.bind(this)
        console.log("AAAAA")
    }
    toggleClass = () => this.setState({ show: !this.state.show })
    handleClick(evt){
        let opcao = evt.target.id
        let title = evt.target.name
        this.setState({opcao:opcao, title:title})
    }
    render(){
        const classMenu = `dropdown-menu${this.state.show ? " show" : ""}`
        console.log("can you hear me?") 
        return(
            <section>
                <div class="dropdown">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button"
                    data-toggle="dropdown" aria-haspopup="false"
                    aria-expanded="false" onClick={this.toggleClass}>Opções</button>
                    <div class={classMenu}>
                        <ListaOpcoes onClick={(evt)=>this.handleClick(evt)} />
                    </div>
                </div>
                <EstatsHelp times = {this.props.times} title={this.state.title} opcao={this.state.opcao} />
            </section>
        )
    }
}
export default Estats;