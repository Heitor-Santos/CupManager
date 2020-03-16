const {Router} = require('express')
const mongoose = require('mongoose')
const routes = Router()
const Partida = require('../models/Partida')

routes.get('/partidaAll', async (request, response)=>{    
    let resp = await Partida.find();
    return response.json(resp);
});

routes.get('/partida', async (request, response)=>{
    nome = request.query.nome;
    let resp = await Partida.findOne({nome});
    if(resp!=null) 
        response.json(resp)
    else return(response.status(404).send({message: "partida inexistente"}))
});

routes.delete('/partida/:partidaNome', async (request, response)=>{
    nome = request.params.partidaNome;
    resp = await Partida.findOne({nome});
    if(resp==null)
        return(response.status(404).send({message: "Partida não encontrada"}))
    await Partida.deleteOne({nome});
    resp = await Partida.findOne({nome});
    if(resp==null)
        return response.json({message:'A Partida foi deletada!'})
    else 
        return(response.status(500).send({message: "A partida não foi deletada"}))
});

routes.post('/partida', async (request,response)=>{
    const {nome, idPlayersA, idPlayersB} = request.body;
    const idTreatA = idPlayersA.split(' ')
    const idTreatB = idPlayersB.split(' ')
    if(await Partida.findOne({nome})== null){
        part = await Partida.create({
            nome,
            idPlayersA: idTreatA,
            idPlayersB: idTreatB
        })
        return response.json(part)
    }
    return (response.status(400).send({message: "Já existe uma partida com esse nome"}))
});

routes.put('/partida/:partidaNome', async (request, response) => {
    const nome = request.params.partidaNome;
    const {nomeNovo, addJogadorA, addJogadorB, rmvJogadorA, rmvJogadorB} = request.body;
    let listaA=[];
    let listaB=[];
    const copa = await Partida.findOne({nome: nome});
    let resp;
    if(copa!=null){
        listaA = copa.idPlayersA;
        listaB = copa.idPlayersB;
        if(addJogadorA!= '') {
            if (listaA.find(addJogadorA)) {
                return response.status(400).send({message:"Jogador já cadastrado"})
            } else {
                listaA.push(addJogadorA); 
            }
        }
        if(addJogadorB!= '') {
            if (listaB.find(addJogadorB)) {
                return response.status(400).send({message:"Jogador já cadastrado"})
            } else {
                listaB.push(addJogadorB); 
            }
        } 
        if(remvJogadorA != '') {
            if (listaA.find(rmvJogadorA)) {
                listaA = listaA.filter(id => id!=rmvJogadorA);
            } else {
                return response.status(404).send({message:"Jogador não existente"})
            } 
            
        }
        if(remvJogadorB != '') { 
            if (listaB.find(rmvJogadorB)) {
                listaB = listaB.filter(id => id!=rmvJogadorB);
            } else {
                return response.status(404).send({message:"Jogador não existente"})
            } 
        } 
        if (nomeNovo != '') {
            resp = await Partida.updateOne( {nome: {$eq: nome} }, 
                { $set: {nome: nomeNovo,
                idPlayersA: listaA, idPlayersB: listaB}})
        } else {
            resp = await Partida.updateOne( {nome: {$eq: nome} }, 
                { $set: {idPlayersA: listaA, idPlayersB: listaB}})
        }
        return response.json(resp)
    } else {
        return(response.status(404).send({message: "Partida não encontrada"}))
    }
});

module.exports = routes;