import React from 'react';
import api from '../util/api';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Play from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Stop from '@material-ui/icons/Stop';
import Reset from '@material-ui/icons/Replay';
import { Link } from 'react-router-dom'

class Timer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div class="form-group">
                <div class="row">
                    <div class="col"></div>
                    <div class="col" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <input type="text" class="form-control" id="validationTooltip01"
                        placeholder="Digite a duração da partida em minutos" required
                        style={{fontSize:"20px", textAlign:"center"}}/>
                        <Play onClick={()=>console.log("oioi")}/><Pause/><Stop/><Reset/>
                    </div>
                    <div class="col"></div>
                </div>
            </div>
        )
    }
}
export default Timer;