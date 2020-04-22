import React from 'react';
import api from '../util/api';
import '../estilos/Cup.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Add from '@material-ui/icons/Add.js';
import { Link } from 'react-router-dom'
import Time from './Time'
import apiCalls from '../util/apiCalls';
import Timer from './Timer';
import Estats from './Estats';

class Times extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: this.props.match.params.namePartida,
            vencedor: null,
            idPlayers: [[], []],
            goleiros:[0,0],
            gols:[0,0],
            notFound: false,
            ok: true,
            estadoPartida: "não-iniciada",
            timesReady: false
        }
        //Muito cuidado com idPlayers, qualquer coisa com array dá undefined, multidimensional só piora
        this.changePlayer = this.changePlayer.bind(this);
        /*Só assume q essa última linha tá certa, descobri que é assim que faz pra ligar
        um método a um elemento html, bem útil na função */
    }
    componentDidMount() {
        this.handleLoad();
    }
    async handleLoad() {
        let nomeCup = this.props.match.params.nameCup
        let nomePartida= this.props.match.params.namePartida
        const load = new apiCalls
        const response = await load.handleLoadPartida(`${nomeCup}-${nomePartida}`);
        console.log(response)
        this.setState({
            vencedor: response.vencedor,
            idPlayers: response.idPlayers,
            notFound: response.notFound,
            gols: response.notFound ? [0,0]:response.gols,
            estadoPartida: response.notFound ? "não-iniciada" : response.vencedor!==null ? "encerrada" : "iniciada"
        })
        console.log("booo")
        console.log(this.state.estadoPartida)
        console.log(this.state.idPlayers)
        let temp = this.state.estadoPartida
        if (temp != "não-iniciada") {//isso é pra carregar os jogadores e tals no caso da partida estar rolando ou já tiver acabado
            await this.loadTime();
            this.setState({
                estadoPartida: temp, // essa redundancia pq o loadTime tbm altera o estadoPartida
                ok: response.ok
            })
        } else this.setState({timesReady:true})
        console.log(this.state.idPlayers)
        /*O notFound e o ok servem pra gente carregar uma página especial se acontecer um 404
        ou qualquer outro erro*/
    }
    async changePlayer(pos, e) {
        let nomeCup = this.props.match.params.nameCup;
        console.log("baby")
        console.log(this.state.nome)
        let words =  this.state.nome.toString().split(' ')
        console.log(words)
        let indexPartida = parseInt(words[1])-1
        console.log(indexPartida)
        if (this.state.estadoPartida == "não-iniciada") {
            const newNome = e.target.value;
            const index = e.target.id;
            let times = this.state.idPlayers;
            times[pos][index] = newNome;
            this.setState({ idPlayers: times })
        }
        else{
            let edit = new apiCalls;
            console.log(e.target)
            console.log("im gonna give you my love")
            const field = e.target.name;
            console.log(field)
            const index = e.target.id;
            let times = this.state.idPlayers;
            let goleiros = this.state.goleiros
            let currGoleiro = this.state.goleiros[pos]
            if(field=="goleiro"){ 
                if(currGoleiro!=null)
                    times[pos][currGoleiro].estatsPartida[field]=!times[pos][currGoleiro].estatsPartida[field]
                times[pos][index].estatsPartida[field]=!times[pos][index].estatsPartida[field]
                goleiros[pos]=index;
                this.setState({goleiros:goleiros})
            }
            else times[pos][index].estatsPartida[field]++;
            if(field=="golsFavor"){
                let gols = this.state.gols;
                gols[pos]++;
                let adv = pos?0:1
                times[adv][goleiros[adv]].estatsPartida["golsTomados"]++;
                const response = await edit.handleEditPlayer(nomeCup+times[adv][goleiros[adv]].nome,times[adv][goleiros[adv]].estatsPartida, indexPartida)
                this.setState({gols:gols})
            }
            if(field=="golsContra"){
                let adv = pos?0:1
                let gols = this.state.gols;
                gols[adv]++; 
                times[pos][goleiros[pos]].estatsPartida["golsTomados"]++;
                const response = await edit.handleEditPlayer(nomeCup+times[pos][goleiros[pos]].nome,times[pos][goleiros[pos]].estatsPartida, indexPartida)
                this.setState({gols:gols})
            }
            this.setState({idPlayers:times})
            const response = await edit.handleEditPlayer(nomeCup+times[pos][index].nome,times[pos][index].estatsPartida, indexPartida)
            if(response==false) this.setState({ok:false})
            console.log(this.state.idPlayers)
        }
        /*Aqui é o que eu falei sobre ligar um elemento html a uma função, esse "e.target" é o
        input do nome do jogador, o value é o texto do input e o id é onde eu coloquei o index ,
        o pos é pra eu saber qual o time */
    }  
    async postPartida(){
        let nomeCup = this.props.match.params.nameCup
        let nomePartida= this.props.match.params.namePartida
        let idPlayersA = this.state.idPlayers[0]
        let idPlayersB = this.state.idPlayers[1]
        const post = new apiCalls;
        const response = await post.handlePostPartida(`${nomeCup}-${nomePartida}`,idPlayersA,idPlayersB)
        const resp = await post.handleEditCup(nomeCup, nomePartida)
        if (resp.status!=200)this.setState({ok:false})
        if(response.status!=200)
            this.setState({ok:false})
    }
    async editPartida(){
        let nomeCup = this.props.match.params.nameCup
        let nomePartida= this.props.match.params.namePartida
        let gols = this.state.gols
        let vencedor
        console.log(gols[0])
        console.log(gols[1])
        if(gols[0]!=gols[1])
            vencedor =  gols[0]>gols[1]?0:1 
        else vencedor =null
        const edit = new apiCalls;
        const response = await edit.handleEditPartida(`${nomeCup}-${nomePartida}`,vencedor,gols[0],gols[1])
        console.log("nnnnn")
        if(response.status!=200)
            this.setState({ok:false})
        this.setState({estadoPartida:"encerrada"})    
        console.log(response)
    }
    handleTime(pos) {
        let times = this.state.idPlayers;
        times[pos].push('');
        this.setState({ idPlayers: times })
        /*Toda vez que eu clico no botão de novo jogador eu adiciono um jogador em branco
        naquele time, o que faz renderizar com um input a mais  */
    }
    async loadTime() {
        let nomeCup = this.props.match.params.nameCup;
        let times = this.state.idPlayers;
        const load = new apiCalls
        for (let i = 0; i < times.length; i++) {
            for (let j = 0; j < times[i].length; j++) {
                let nomePlayer = nomeCup + times[i][j];
                let words =  this.state.nome.toString().split(' ')
                console.log(words)
                let indexPartida = parseInt(words[1])-1
                const response = await load.handleLoadPlayer(nomePlayer);
                if (response.ok == false)
                    this.setState({ ok: false })
                else {
                    times[i][j] = {
                        nome: times[i][j],
                        estatsPartida: response.estatsPartidas[indexPartida] ?
                            response.estatsPartidas[indexPartida] :
                            {
                                golsFavor: null, assist: null, golsContra: null, golsContra: null, golsTomados: null,
                                goleiro: null, defesas: null
                            }
                    }
                }
            }
        }
        this.setState({ idPlayers: times, estadoPartida: "iniciada" , timesReady: true})
    }
    render() {
        console.log(this.state.idPlayers)
        return (
            <div>
                {/*Se não houve problema ou o único problema é o 404 a página renderiza */}
                {this.state.ok && this.state.timesReady?
                    <div>
                        <h1 class="display-4" style={{ textAlign: "center" }}>
                            {this.state.nome}
                        </h1>
                        <h2 class="display-4" style={{ textAlign: "center" }}>
                            {this.state.gols[0]}x{this.state.gols[1]}
                        </h2>
                        <div class="row">
                            {/**Sendo row, ele considera que todos os elementos estão na mesma linha,
                             * por isso os dois times ficam do lado um do outro 
                             */}
                            <Time pos={0} notFound={this.state.notFound}
                                idPlayers={this.state.idPlayers[0]} onClick={() => this.handleTime(0)}
                                onChange={(evt) => this.changePlayer(0, evt)}
                                estadoPartida={this.state.estadoPartida} />
                            <Time pos={1} notFound={this.state.notFound}
                                idPlayers={this.state.idPlayers[1]} onClick={() => this.handleTime(1)}
                                onChange={(evt) => this.changePlayer(1, evt)}
                                estadoPartida={this.state.estadoPartida} />
                            {/*Na chamada dos times é interessante notar a forma como passa o
                            o parâmetro da função onClick, como handleTime precisa de parâmetros,
                            precisa colocar o "()=>" antes, pois senão o compilador entende
                            que você está chamando a função e não a referenciando, a msm coisa
                            acontece com a função onChange */}
                        </div>
                        {this.state.estadoPartida!="encerrada"?
                            <Timer loadTime={()=>this.loadTime()}
                            postPartida={()=>this.postPartida()}
                            editPartida = {()=>this.editPartida()}
                            estadoPartida={this.state.estadoPartida}/>:null
                        }
                        {this.state.estadoPartida!="não-iniciada"&&this.state.idPlayers[0][0].estatsPartida?
                            <Estats times={this.state.idPlayers}/>:null
                        }
                    </div> : null
                    //Se houve um problema não carrega nada, mas dps vamos fazer um componente de erro
                }
            </div>
        )
    }
}
export default Times;