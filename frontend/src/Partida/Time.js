import React from 'react';
import api from '../util/api';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '@material-ui/icons/Add.js';
import { Link } from 'react-router-dom'
import Player from './Player'
function Equipe(props){
    const time = props.time.map(
        (jogador, index)=>
        <Player jogador={jogador} index={index} 
        onChange={props.onChange}
        estadoPartida={props.estadoPartida}/>
        /**O que eu faço aqui é que pra cada elemento do time, eu crio um elemento do tipo Player,
         * essa função map aceita até 3 elementos, o primeiro é o valor de cada posição, o segundo é
         * o index dessa posição e o terceiro pouco me importa
         */
        );
    
    return(
        <div>
            <ul>{time}</ul>
            {props.estadoPartida=="não-iniciada"?
                <a href="#" class="btn btn-primary btn-lg active" role="button" aria-pressed="true" onClick={props.onClick}>
                    Novo jogador
                </a>
            :null}
        </div>  
    )
}
function Time(props) {
    return (
        <div class="col" style={{ textAlign: "center" }}>
            {/*Transforma o 0 em A e o 1 em B*/}
            <h3>Time {String.fromCharCode(props.pos+65)}</h3>
            {props.estadoPartida=="não-iniciada" ?
                <p>Comece adicionando jogadores ao seu time:</p>
                : null
            /**Algo a ser mudado: trocar a condição de ser o notFound pra se o array do time
             * estiver vazio, assim quando você adicionar um jogador, aquele parágrafo some,
             * no atual isso não acontece
             */}
            <Equipe time={props.idPlayers} onClick={props.onClick} onChange={props.onChange}
            estadoPartida={props.estadoPartida}/>
            {/**Algo interessante aqui é como você pode mandar props por multi níveis, aqui eu
             * recebo um prop de Partida e a mando mais pra baixo, pra Equipe
             */}
        </div>
    )
}
export default Time;