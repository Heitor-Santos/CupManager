import React from 'react';
import api from './util/api';
import './estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '@material-ui/icons/Add.js';
import { Link } from 'react-router-dom'
function Error(props){
    return(<h1>BOHOOOO</h1>)
}
class Player extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show: false
        }
    }
    toggleClass = () => this.setState({show: !this.state.show})
    render(){
        const classMenu = `dropdown-menu${this.state.show?" show":""}`
        console.log(classMenu)
        return (
            <div class="input-group">
                <input type="text" class="form-control" aria-label="Text input with dropdown button" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button"
                     data-toggle="dropdown" aria-haspopup="true" 
                     aria-expanded="false" onClick={this.toggleClass}>Ações</button>
                    <div class={classMenu}>
                        <a class="dropdown-item" href="#">Gol</a>
                        <a class="dropdown-item" href="#">Assistência</a>
                        <a class="dropdown-item" href="#">Gol contra</a>
                        <div role="separator" class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Marcar como goleiro</a>
                    </div>
                </div>
            </div>
        )
    }
}
function Equipe(props){
    const time = props.time.map((jogador=><Player/>));
    return(
        <div>
            <ul>{time}</ul>
            <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick={props.onClick}>
                Novo jogador
            </a>
        </div>
        
    )
}
class Times extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: this.props.match.params.namePartida,
            vencedor: null,
            idPlayerA: [],
            idPlayerB: [],
            notFound: false,
            ok: true
        }
        this.handleLoad();
    }
    async handleLoad() {
        try {
            const response = await api.get(`/partida?nome=${this.state.nome}`);
            this.setState({
                vencedor: response.data.vencedor,
                idPlayerA: response.data.idPlayerA,
                idPlayerB: response.data.idPlayerB,
            })
        }
        catch (error) {
            if (error.response && error.response.status == 404) {
                this.setState({ notFound: true })
            }
            else this.setState({ok:false})
        }
    }
    handleTimeA(){
        let timeA = this.state.idPlayerA;
        timeA.push('');
        this.setState({idPlayerA:timeA})
    }
    handleTimeB(){
        let timeB = this.state.idPlayerB;
        timeB.push('');
        this.setState({idPlayerB:timeB})
    }
    render() {
        return (
            <div>
                {console.log(this.state.idPlayerA)}
                {console.log("bohoo")}
                {this.state.ok?
                    <div>
                        <h1 class="display-4" style={{ textAlign: "center" }}>
                            {this.state.nome}
                        </h1>
                        <div class="row">
                            <div class="col" style={{ textAlign: "center" }}>
                                
                                    <h3>Time A</h3>
                                    {this.state.notFound ?
                                        <p>Comece adicionando jogadores ao seu time:</p> : null}
                                        <Equipe time={this.state.idPlayerA} onClick={()=>this.handleTimeA()} />
                                
                            </div>
                            <div class="col" style={{ textAlign: "center" }}>
                                <h3>Time B</h3>
                                {this.state.notFound ?
                                    <p>Comece adicionando jogadores ao seu time:</p> : null}
                                <Equipe time={this.state.idPlayerB} onClick={()=>this.handleTimeB()} />
                            </div>
                        </div>
                    </div>: null
                }
            </div>
        )
    }
}

export default Times;