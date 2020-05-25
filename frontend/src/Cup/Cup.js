import React from 'react';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lista from './Lista'
import Estats from './EstatCup'
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
            listaPlayers:[],
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
            lista: response.lista,
            listaPlayers: response.idPlayers
        })
        let idPlayers = this.state.listaPlayers
        for (let i = 0; i < idPlayers.length; i++) {
            let nomePlayer = this.state.nome + idPlayers[i];
            let nome = idPlayers[i]
            const load = new apiCalls
            const response = await load.handleLoadPlayer(nomePlayer);
            console.log(response)
            if (response.ok == false)
                return({ ok: false })
            else {
                idPlayers[i] = response.estatsPartidas.reduce(function(previousValue, currentValue) {
                    return {
                      golsFavor: previousValue.golsFavor + currentValue.golsFavor,
                      golsContra: previousValue.golsContra + currentValue.golsContra,
                      golsTomados: previousValue.golsTomados + currentValue.golsTomados,
                      assist: previousValue.assist + currentValue.assist
                    }
                });
                idPlayers[i][nome]=nome
            }
        }
        this.setState({listaPlayers:idPlayers})
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
                            <div class="col-sm-8" >
                                <Estats idPlayers={this.state.listaPlayers} nomeCup={this.state.nome} />
                            </div>
                        </div>
                    </div> : <Error />}
            </div>
        )
    }
}
export default Copa;