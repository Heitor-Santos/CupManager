const {Router} = require('express')
const mongoose = require('mongoose')
const routes = Router()
const Cup = require('../models/Cup')

routes.get('/cupAll', async (request, response)=>{    
    let resp = await Cup.find();
    if(resp!=null)
        return response.json(resp);
    else 
        return response.status(404).send({message: "essa cup não existe"})
});
routes.get('/cup', async (request, response)=>{
    nome = request.query.nome;
    let cup = await Cup.findOne({nome});
    if (cup!=null)return response.json(cup)
    else return response.status(404).send({message: "Campeonato não encontrado"})
});
routes.delete('/cup/:cupNome', async (request, response)=>{
    nome = request.params.cupNome;
    resp = await Cup.findOne({nome});
    if(resp==null)
        return(response.status(404).send({message: "Campeonato não cadastrado"}))
    await Cup.deleteOne({nome});
    resp = await Cup.findOne({nome});
    console.log(resp);
    if(resp==null)
        return response.json({message:'Campeonato deletado!'})
    else 
        return(response.status(500).send({message: "Campeonato não deletado"}))
});
routes.post('/cup', async (request,response)=>{
    const {nome, idPartidas} = request.body;
    console.log(nome)
    console.log(idPartidas)
    const idTreat = idPartidas == '' ? [] : idPartidas.split(' ')
    console.log(idTreat)
    if(await Cup.findOne({nome})== null){
        cup = await Cup.create({
            nome,
            idPartidas: idTreat
        })
        return response.json(cup)
    } 
    return (response.status(400).send({message: "Já existe uma cup com esse nome"}))
})

routes.put('/cup/:nomeCamp', async (request, response) => {
    const nomeCamp = request.params.nomeCamp;
    const {nomeNovo, addPartida, remvPartida} = request.body;
    let lista=[];
    const copa = await Cup.findOne({nome: nomeCamp});
    let resp;
    if(copa!=null){
        lista = copa.idPartidas;
        if(addPartida != null) {
            if (lista.indexOf(addPartida)!=-1) {
                return(response.status(400).send({message: "Partida já cadastrada!"}))
            } else {
                lista.push(addPartida); 
                console.log("hdbhdhdh")
            }
        } if(remvPartida != null) { 
            if (lista.indexOf(remvPartida)!=-1) {
                lista = lista.filter(id => id!=remvPartida);
            } else {
                return(response.status(400).send({message: "Partida não cadastrada!"}))
            }
            
        } if (nomeNovo != null) {
            resp = await Cup.updateOne( {nome: {$eq: nomeCamp} }, 
                { $set: {nome: nomeNovo,
                idPartidas: lista}})
        } else {
            resp = await Cup.updateOne({nome: {$eq: nomeCamp} }, 
                { $set: {idPartidas: lista}})
        }
        return response.json(resp)
    } else {
        return(response.status(404).send({message: "Campeonato não encontrado"}))
    }
});

module.exports = routes;