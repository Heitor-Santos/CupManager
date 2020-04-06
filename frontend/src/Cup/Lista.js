import React from 'react';
import api from '../util/api';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '@material-ui/icons/Add.js';
import { Link } from 'react-router-dom'
function Lista(props) {
    const nomeCup = props.nomeCup;
    /**
     * Aqui o que faço é criar um link pra cada partida no campeonato, o link é da forma:
     * "/nomeDoCampeonato/nomeDaPartida", de forma que o nome da partida se torna um segundo parâmetro
     * de props.match.params
     */
    const lista = props.list.map((element) =>
        <Link to={`${nomeCup}/${element}`}
             class="list-group-item list-group-item-action"><p>{element}</p>
        </Link>);
    return (
        <div class="list-group">
            {lista}
            <div>Crie uma nova partida clicando aqui
                <Link to={`${nomeCup}/Partida${lista.length}`}><Add/></Link>
                {/**
                 * Muitas coisas precisam ser notadas aqui: primeiro que o link pra uma nova partida
                 * tem o index de lista.length, o que significa que se uma lista tem 3 partidas, a 
                 * última partida tem index=2 (já que é 0-based), então a nova partida tem index=4.
                 * Minha ideia atual é de salvar e buscar no banco de dados cada partida na forma 
                 * "NomeDoCampeonato-'Partida'Index", isso ia garantir que nunca tivesse conflito, já 
                 * que todos os campeonatos têm que ter nomes diferentes. Isso ainda implicaria em
                 * mais uma alteração: na lista de link a gente ia ter que suprimir a parte do nome
                 * do campeonato pois senão iria redirecionar para 
                 * /nomeDoCampeonato/NomeDoCampeonato-'Partida'Index invés de
                 * /nomeDoCampeonato/'Partida'Index
                 * Última obseração: <Add> é o botãozinho de mais
                 */}
            </div>
        </div>)
}
export default Lista;