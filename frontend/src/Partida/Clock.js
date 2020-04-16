import React, { useState } from 'react';
import api from '../util/api';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '@material-ui/icons/Add.js';
import { Link } from 'react-router-dom'
import Time from './Time'
import apiCalls from '../util/apiCalls';
import ReactCountdownClock from 'react-countdown-clock'
import TimerMachine from 'react-timer-machine'
import Timer from 'react-compound-timer'
import moment from 'moment';
import momentDurationFormatSetup from "moment-duration-format";
let estado;
async function help(postPartida, loadTime){
    postPartida();
    loadTime();
    estado = "iniciada";
}
function PQPNÂOAGUENTOMAIS(props) {
    console.log(props)
    return (
        <Timer
            direction="backward"
            startImmediately={false}
            onStart={
                estado != "iniciada" ?
                    () => help(props.postPartida, props.loadTime): null
            }
            onStop={
                estado == "iniciada" ?
                    () => props.editPartida() : null
            }
            checkpoints={[{
                time: 0,
                callback:
                    estado == "iniciada" ?
                        () => console.log("buabua"): null
            }]}
            initialTime={props.minutos * 60*1000}
        >
            {({ start, resume, pause, stop, reset, getTimerState, getTime }) => (
                <React.Fragment>
                    <div class="panel panel-default">{/**Pq o bootstrap nunca funfa cmg? ;( */}
                        <div class="panel-heading">
                            <h3 class="panel-title">Tempo restante</h3>
                        </div>
                        <div class="panel-body">
                            <Timer.Minutes /> :<Timer.Seconds />
                        </div>
                    </div>
                    <br />
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" onClick={start}>Começar partida</button>
                        <button type="button" class="btn btn-secondary" onClick={pause}>Pausar partida</button>
                        <button type="button" class="btn btn-secondary" onClick={resume}>Continuar partida</button>
                        <button type="button" class="btn btn-secondary" onClick={stop}>Terminar partida</button>
                        <button type="button" class="btn btn-secondary" onClick={reset}>Reiniciar partida</button>
                    </div>
                </React.Fragment>
            )}
        </Timer>
    )
}
momentDurationFormatSetup(moment);
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            estadoPartida: this.props.estadoPartida,
            minutos: 60,
            clicked: false
        }
    }
    async onChange(e) {
        const newMinutos = parseInt(e.target.value);
        console.log(newMinutos)
        console.log("-----------------")
        await this.setState({ minutos: newMinutos })///why the fuck isso n tá funcionando sem o await???? 
        console.log(this.state.minutos)
        await this.setState({clicked:false})//essas duas linhas mais cagadas q eu já fiz na vida
        await this.setState({clicked:true})
        //this.forceUpdateHandler()
    }
    render() {
        if (this.state.estadoPartida != "encerrada") {
            return (
                <form>
                    <div class="row">
                        <div class="col"></div>
                        <div class="col">
                            <input type="text" class="form-control" onChange={(e) => this.onChange(e)} placeholder="Digite quantos minutos a partida tem" />
                            {this.state.clicked?
                                <PQPNÂOAGUENTOMAIS estadoPartida ={this.state.estadoPartida}
                                minutos ={this.state.minutos} 
                                loadTime={this.props.loadTime}
                                postPartida={this.props.postPartida}
                                editPartida = {this.props.editPartida} />: null
                            }
                        </div>
                        <div class="col"></div>
                    </div>
                </form>
            )
        }
        return (null)
    }
}
export default Clock