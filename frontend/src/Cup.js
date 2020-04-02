import React from 'react';
import api from './util/api';
import './estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '@material-ui/icons/Add.js';
import { Link } from 'react-router-dom'
function Lista(props) {
    const nomeCup = props.nomeCup;
    let partida = 1;
    const lista = props.list.map((element) =>
        <Link to={`${nomeCup}/${element}`}
             class="list-group-item list-group-item-action"><p>{element}</p>
        </Link>);
    return (
        <div class="list-group">
            {lista}
            <div>Crie uma nova partida clicando aqui
                <Link to={`${nomeCup}/Partida${lista.length}`}><Add/></Link>
            </div>
        </div>)
}
function NotFound(props) {
    return (<p>Não achado</p>)
}
function Error(props) {
    return (<p>Não aguento mais</p>)
}
class Copa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ok: false,
            notFound: false,
            lista: [],
        }
        this.handleLoad()
    }
    async handleLoad() {
        try {
            const response = await api.get(`/cup?nome=${this.props.match.params.nameCup}`);
            console.log(response);
            this.setState({
                lista: response.data.idPartidas,
                ok: true,
            })
        }
        catch (error) {
            if (error.response) {
                if (error.response.status == 404) {
                    this.setState({ notFound: true })
                }
            }
        }

    }
    render() {
        return (
            <div>
                {this.state.ok ?
                    <div>
                        <h1 class="display-4" style={{ textAlign: "center" }}>{this.props.match.params.nameCup}</h1>
                        <div class="row">
                            <div class="col-sm-4" style={{ textAlign: "center" }}>
                                <span className="block-example border-right">
                                    <Lista list={this.state.lista} nomeCup={this.props.match.params.nameCup}/>
                                </span>
                            </div>
                            <div class="col-sm-8" style={{ backgroundColor: "red" }}>
                                AQUI VAI SER AS ESTATÍSTICAS
                            </div>
                        </div>
                    </div> : this.state.notFound ? <NotFound /> : <Error />}
            </div>
        )
    }
}
export default Copa;