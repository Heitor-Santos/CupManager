import React from 'react';
import api from '../util/api';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '@material-ui/icons/Add.js';
import { Link } from 'react-router-dom'
import Time from './Time'
import apiCalls from '../util/apiCalls';
import ReactCountdownClock from 'react-countdown-clock'
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            estadoPartida :this.props.estadoPartida
        }
    }
    render() {
        if(this.state.estadoPartida!="encerrada"){
            return (
                <ReactCountdownClock seconds={60}
                     color="#000"
                     alpha={0.9}
                     size={300}
                     paused="true"
                />

            )
        }
        return(null)
    }
}
export default Clock