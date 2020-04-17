import api from './api';

class apiCalls {
    async handlePostCup(nome) {
        let resp = {
            nome: null,
            idPartidas: null,
            status: null
        }
        try {
            const response = await api.post('/cup', {
                "nome": nome,
                "idPartidas": ""
            })
            console.log(response)
            resp.nome = response.data.nome
            resp.idPartidas = response.data.idPartidas
            resp.status = 200
        }
        catch (error) {
            console.log(error)
            if (error.response) {
                resp.status = error.response.status
            }
            else if (error.request) {
                resp.status = error.request.status
            }
            else resp.status = -1;
        }
        return resp;
    }
    async handlePostPartida(nome, idPlayersA, idPlayersB){
        let resp={status:null};
        try{
            resp = await api.post('/partida',{
                nome,
                idPlayersA,
                idPlayersB
            })
            resp.status=200;
        }
        catch(error){
            if (error.response) {
                resp.status = error.response.status
            }
            else if (error.request) {
                resp.status = error.request.status
            }
            else resp.status = -1;
        }
        return resp
    }
    async handleEditPartida(nome,vencedor, golsA, golsB){
        let resp;
        try{
            resp = await api.put(`/partida/${nome}`,{
                vencedor,
                golsA: golsA,
                golsB: golsB
            })
            console.log(resp)
            resp.status=200;
        }
        catch(error){
            if (error.response) {
                resp.status = error.response.status
            }
            else if (error.request) {
                resp.status = error.request.status
            }
            else resp.status = -1;
        }
        return resp
    }
    async handlePostPlayer(nome) {
        let resp = {
            status : null,
            estatsPartidas:[]
        }
        try {
            const response = await api.post('/player', {
                "nome": nome
            })
            console.log(response)
            resp.status = 200
        }
        catch (error) {
            console.log(error)
            if (error.response) {
                resp.status = error.response.status
            }
            else if (error.request) {
                resp.status = error.request.status
            }
            else resp.status = -1;
        }
        return resp;
    }
    async handleLoadPlayer(nome) {
        let resp = {
            estatsPartidas : [],
            notFound : null,
            ok :null
        }
        try {
            let response = await api.get(`/player?nome=${nome}`);
            resp.estatsPartidas = response.data.estatsPartidas;
            resp.notFound = false
            resp.ok = true
        }
        catch (error) {
            if (error.response && error.response.status == 404) {
                let response = await this.handlePostPlayer(nome);
                console.log(response)
                if (response.status == 200) {
                    resp.estatsPartidas = []
                    resp.notFound = false
                    resp.ok = true
                }
                else resp.ok = false;
            }
        }
        return resp;
    }
    async handleEditPlayer(nome, estatsPartidas){
        let response;
        try{
            response = await api.put(`/player/${nome}`,{
                golsFavor: estatsPartidas.golsFavor,
                assist: estatsPartidas.assist,
                golsContra: estatsPartidas.golsContra,
                golsTomados: estatsPartidas.golsTomados,
                goleiro: estatsPartidas.goleiro,
                defesas: estatsPartidas.defesas,
            })
            console.log(response)
        }
        catch(error){
            response = false;
        }
        console.log(response)
        return response;
    }
    async handleLoadCup(nome) {
        let resp = {
            lista: [],
            notFound: null,
            ok: null
        };
        try {
            let response = await api.get(`/cup?nome=${nome}`);
            resp.lista = response.data.idPartidas;
            resp.notFound = false
            resp.ok = true
        }
        catch (error) {
            if (error.response && error.response.status == 404) {
                let response = await this.handlePostCup(nome);
                console.log(response)
                if (response.status == 200) {
                    resp.lista = response.idPartidas;
                    resp.notFound = false;
                    resp.ok = true;
                }
                else resp.ok = false;
            }
        }
        return resp;
    }
    async handleEditCup(nomeCup, nomePartida){
        let resp
        try{
            resp = await api.put(`/cup/${nomeCup}`,{
                addPartida: nomePartida
            })
        }
        catch(error){
            resp={status:-1}
        }
        console.log(resp)
        return resp;
    }
    async handleLoadPartida(nome) {
        let resp;
        console.log("oiioi");
        console.log("jnjbjbjbj");
        try {
            const response = await api.get(`/partida?nome=${nome}`);
            console.log(response)
            let times = []
            times[0] = response.data.idPlayersA;
            times[1] = response.data.idPlayersB;
            let golsA = response.data.golsA;
            let golsB = response.data.golsB;
            console.log(times)
            resp = {
                vencedor: response.data.vencedor,
                idPlayers: times,
                notFound: false,
                ok: true,
                gols:[golsA,golsB]
            }
            return resp;
        }
        catch (error) {
            if (error.response && error.response.status == 404) {
                resp = {
                    vencedor: null,
                    idPlayers: [[], []],
                    notFound: true,
                    ok: true,
                }
                return resp;
            }
            else {
                resp = {
                    vencedor: null,
                    idPlayers: [[], []],
                    notFound: false,
                    ok: true,
                }
                return resp;
            }
        }
    }
}
export default apiCalls;