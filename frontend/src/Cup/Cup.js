import React from 'react';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lista from './Lista'
import apiCalls from '../util/apiCalls'

function Error(props) {
    return (<p>Não aguento mais</p>)
}
class Copa extends React.Component {
    constructor(props) {
        super(props);
        //this.props.match.params é a maneira de pegarmos os parâmetros da url, ver mais em index.js
        this.state = {
            nome: this.props.match.params.nameCup,
            ok: true,
            notFound: false,
            lista: [],
        }
        this.handleLoad()
    }
    /** Esse atributo notFound não serve mais pra nada depois de algumas alterações que eu fiz.
     * Criei uma classe só pra lidar com as chamadas à api porque achei que tava deixando o código
     * principal muito sujo, dps vc pode dar uma olhada na aiCalls, mas por enquanto assuma que a 
     * função abaixo funciona. Algo interessante é que eu tive que setar o ok como true logo de início
     * porque senão o react renderiza o componente mais rápido do que faz a requisição à API, o
     * que fazia renderizar o componente de erro primeiro
     * 
     */
    async handleLoad() {
        const load = new apiCalls;
        const response = await load.handleLoadCup(this.state.nome)
        console.log(response);
        this.setState({
            ok: response.ok,
            notFound: response.notFound,
            lista: response.lista
        })
    }
    render() {
        return (
            <div>
                {/** Se estiver tudo ok com a página, a gente carrega ela certinho, caso contrário,
                 * carrega um componente de erro
                 */
                }
                {this.state.ok ?
                    <div>
                        <h1 class="display-4" style={{ textAlign: "center" }}>{this.state.nome}</h1>
                        <div class="row">
                            <div class="col-sm-4" style={{ textAlign: "center" }}>
                                {/** Nem me pergunte como funciona a className abaixo, pq tudo que eu
                                 * faço com o css é chutar, mas ela consegue fazer uma borda na laeral
                                 * direita entre os dois elementos
                                 */}
                                <span className="block-example border-right">
                                    <Lista list={this.state.lista} nomeCup={this.state.nome}/>
                                    {/** Aqui, obiamente, temos uma lista de componentes baseados na lista
                                     * de partidas que tem nesse campeonato
                                     */}
                                </span>
                            </div>
                            <div class="col-sm-8" style={{ backgroundColor: "red" }}>
                                AQUI VAI SER AS ESTATÍSTICAS
                                {/**
                                 * A gente tem que aprender a usar o google chart e colocar as estatísticas bem aqui
                                 */}
                            </div>
                        </div>
                    </div> : <Error />}
            </div>
        )
    }
}
export default Copa;