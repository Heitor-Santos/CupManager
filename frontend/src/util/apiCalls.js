import api from './api';

class apiCalls{
    async handlePostCup(nome){
        let resp = {
            nome: null,
            idPartidas: null,
            status: null
        }
        try{
            const response = await api.post('/cup', {
                "nome": nome,
                "idPartidas": ""
            })
            console.log(response)
            resp.nome= response.data.nome
            resp.idPartidas= response.data.idPartidas
            resp.status= 200
        }
        catch (error) {
            console.log(error)
            if (error.response) {
              resp.status = error.response.status
            }
            else if(error.request){
                resp.status = error.request.status
            }
            else resp.status = -1;
        }
        return resp;
    }


    async handleLoadCup(nome) {
        let resp={
            lista: [],
            notFound: null,
            ok:null
        };
        try {
            let response = await api.get(`/cup?nome=${nome}`);
            resp.lista= response.data.idPartidas;
            resp.notFound= false
            resp.ok=true
        }
        catch (error) {
            if (error.response && error.response.status == 404) {
                let response = await this.handlePostCup(nome);
                console.log(response)
                if(response.status==200){
                    resp.lista = response.idPartidas;
                    resp.notFound = false;
                    resp.ok= true;
                }
                else resp.ok = false;
            }
        }
        return resp;
    }

    
    async handleLoadPartida(nome) {
        let resp;
        console.log("oiioi");
        console.log("jnjbjbjbj");
        try {
            const response = await api.get(`/partida?nome=${nome}`);
            let times = []
            times[0] = response.data.idPlayerA;
            times[1] = response.data.idPlayerB;
            console.log(times) 
            resp ={
                vencedor: response.data.vencedor,
                idPlayers: times,
                notFound: false,
                ok: true,
            }
            return resp;
        }
        catch (error) {
            if (error.response && error.response.status == 404) {
                resp ={
                vencedor: null,
                idPlayers: [[],[]],
                notFound: true,
                ok: true,
                }
                return resp;
            }
            else {
                resp ={
                    vencedor: null,
                    idPlayers: [[],[]],
                    notFound: false,
                    ok: true,
                }
                return resp;
            }
        }
    }
}
export default apiCalls;