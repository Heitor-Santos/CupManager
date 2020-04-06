import React from 'react';
import api from '../util/api';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '@material-ui/icons/Add.js';
import { Link } from 'react-router-dom'
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    /**Essa merda do Player foi o que deu mais trabalho pra fazer, principalmente porque a 
     * documentação do bootstrap sobre isso parece meio errado.
     * Basicamente é o seguinte: Se o nome da classe for "dropdown-menu" não aparece nada,
     * se o nome for "dropdown-menu show", ele mostra os elementos do dropdown. Por isso, tem o
     * toggleClass e o show, toda vez que eu clico em "Ações", ele chama toggleClass que muda o
     * estado de show, o que vai fazer renderizar e muda o valor de classMenu
     */
    toggleClass = () => this.setState({ show: !this.state.show })
    render() {
        const classMenu = `dropdown-menu${this.state.show ? " show" : ""}`
        return (
            <span className="block-exampleHalf border border-right">
                <div class="input-group">
                    <input type="text" class="form-control" 
                    aria-label="Text input with dropdown button"
                    id={this.props.index} 
                    value={this.props.jogador}
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
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button"
                            data-toggle="dropdown" aria-haspopup="false"
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
            </span>
        )
    }
}
export default Player;