import React from 'react';
import api from '../util/api';
import Clock from '../util/Clock';
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
        this.handleChange = this.handleChange.bind(this)
        this.state={
            time: "",
            started: false,
            running: false
        }
        this.cron=null
    }
    handleChange(evt){
        let time= evt.target.value
        this.setState({time: time})
    }
    createClock(){
        let time = this.state.time
        time = parseInt(time.substring(0,2)) *60 + parseInt(time.substring(3,5))
        console.log("aaa")
        this.cron = new Clock(time)
        console.log(time)
        console.log("aaaddddd")
        this.setState({running:true})
        console.log("aaassssss")
        if(this.props.estadoPartida=="não-iniciada"){
            this.props.loadTime()
            this.props.postPartida()
        }
        this.cron.start()
        console.log("ggggg")
        let repetecoID= setInterval(()=>{
            this.setState({time: `${this.cron.minutes}:${this.cron.seconds}`})
            if(!this.state.running) clearInterval(repetecoID)
            if(this.cron.isOver()){
                this.props.editPartida()
                console.log("banana")
                clearInterval(repetecoID)
            }
        },1000)
    }
    onStart(){
        this.state.running? this.cron.start() :this.createClock()
    }
    onStop(){
        if(this.state.running) {
            this.setState({running:false})
            this.cron.stop()
        }  
    }
    onReset(){
        if(this.state.running) {
            this.cron.reset()
        }
    }
    render() {
        return (
            <div class="form-group">
                <div class="row">
                    <div class="col"></div>
                    <div class="col" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <input type="text" class="form-control" onChange={(evt)=>this.handleChange(evt)}
                        placeholder="10:00" required
                        style={{fontSize:"20px", textAlign:"center"}}
                        value={this.state.time}/>
                        <Play onClick={()=>this.onStart()}/>
                        <Pause onClick={()=>this.onStop()}/>
                        <Reset onClick={()=>this.onReset()}/>
                    </div>
                    <div class="col"></div>
                </div>
            </div>
        )
    }
}
export default Timer;