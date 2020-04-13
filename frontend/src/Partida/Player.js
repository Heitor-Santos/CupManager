import React from 'react';
import api from '../util/api';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '@material-ui/icons/Add.js';
import { Link } from 'react-router-dom'

class ListaOpcoes extends React.Component {
    handleClick(evt){
        this.props.onChange(evt);
        this.props.onClick();
    }
    render(){
        const opcoes=[
            ["golsFavor","Gol"],
            ["assist","Assistência"],
            ["golsContra","Gol Contra"]
        ]
        const lista = opcoes.map(opcao=>
            <a class="dropdown-item" href="#"
                onClick={(evt)=>this.handleClick(evt)}
                id={this.props.index}
                name={opcao[0]}>{opcao[1]}
            </a>
        )
        return lista;
    }
    
}
class ListaEspeciais extends React.Component {
    handleClick(evt){
        this.props.onChange(evt);
        this.props.onClick();
    }
    render(){
        const opcoes=[
            [["goleiro","Marcar como goleiro"]],
            [["goleiro","Desmarcar como goleiro"],["defesas","Defesa"]]
        ]
        const lista = opcoes[this.props.select].map(opcao=>
            <a class="dropdown-item" href="#"
                onClick={(evt)=>this.handleClick(evt)}
                id={this.props.index}
                name={opcao[0]}>{opcao[1]}
            </a>
        )
        return lista;
    }
}
/**Essa merda do Player foi o que deu mais trabalho pra fazer, principalmente porque a 
     * documentação do bootstrap sobre isso parece meio errado.
     * Basicamente é o seguinte: Se o nome da classe for "dropdown-menu" não aparece nada,
     * se o nome for "dropdown-menu show", ele mostra os elementos do dropdown. Por isso, tem o
     * toggleClass e o show, toda vez que eu clico em "Ações", ele chama toggleClass que muda o
     * estado de show, o que vai fazer renderizar e muda o valor de classMenu
     */
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    
    toggleClass = () => this.setState({ show: !this.state.show })
    render() {
        const classMenu = `dropdown-menu${this.state.show ? " show" : ""}`
        //console.log(this.props.estadoPartida)
        return (
            <span className="block-exampleHalf border border-right">
                <div class="input-group">
                    <input type="text" class="form-control" 
                    aria-label="Text input with dropdown button"
                    disabled={this.props.estadoPartida=="não-iniciada"? false : true}
                    id={this.props.index} 
                    value={this.props.estadoPartida=="não-iniciada"?this.props.jogador:this.props.jogador.nome}
                    onChange={(evt)=>this.props.onChange(evt)}/>
                    {/**Esse input é o tal input ligado ao changePlayer, observe que o value e o id
                     * são exatamente o que eu comentei em outro lugar(óbvio).
                     */}
                    <div class="dropdown">
                        {/**Outra coisa importante, essa classe precisa se chamar dropdown,
                         * senão fica bugadão, aparecendo do outro lado da tela, isso é outra coisa
                         * que não tinha na documentação do bootstrap, abençoado seja o StackOverflow.
                         * Também acho que seria interessante depois a gente bloquear esse dropdown
                         * até que a partida comece, pq n faz sentido a gente colocar gols etc. se a
                         * partida não comecou e n quero ngm clicando nessa merda antes da partida
                         * comecar e bugar com a merda toda, quero o "cenário feliz"
                         */}
                        {this.props.estadoPartida=="iniciada"?
                            <div>
                            <button class="btn btn-outline-secondary dropdown-toggle" type="button"
                                data-toggle="dropdown" aria-haspopup="false"
                                aria-expanded="false" onClick={this.toggleClass}>Opções</button>
                            <div class={classMenu}>
                                <ListaOpcoes index={this.props.index} onChange={this.props.onChange}
                                onClick={this.toggleClass}/>
                            <div role="separator" class="dropdown-divider"></div>
                                <ListaEspeciais select={this.props.jogador.estatsPartida.goleiro?1:0}
                                index={this.props.index} onChange={this.props.onChange}
                                onClick={this.toggleClass}/>
                            </div>
                            </div>:null
                        }
                        
                    </div>
                </div>
            </span>
        )
    }
}
export default Player;