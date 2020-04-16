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
    const idTreatA = idPlayersA == undefined ? [] : idPlayersA
    const idTreatB = idPlayersB == undefined ? [] : idPlayersB
    const vencedor = null;
    if(await Partida.findOne({nome})== null){
        part = await Partida.create({
            nome,
            vencedor,
            idPlayersA: idTreatA,
            idPlayersB: idTreatB
        })
        return response.json(part)
    }
    return (response.status(400).send({message: "Já existe uma partida com esse nome"}))
});

routes.put('/partida/:partidaNome', async (request, response) => {
    const nome = request.params.partidaNome;
    const {nomeNovo, addJogadorA, addJogadorB, rmvJogadorA, rmvJogadorB, vencedor, golsA, golsB} = request.body;
    let listaA=[];
    let listaB=[];
    let vencedorReal;
    const copa = await Partida.findOne({nome: nome});
    let resp;
    if(copa!=null){
        listaA = copa.idPlayersA;
        listaB = copa.idPlayersB;
        if(addJogadorA!= null) {
            if (listaA.some(id => id == addJogadorA)) {
                return response.status(400).send({message:"Jogador A já cadastrado"})
            } else {
                listaA.push(addJogadorA); 
            }
        }
        if(addJogadorB!= null) {
            if (listaB.some(id => id == addJogadorB)) {
                return response.status(400).send({message:"Jogador B já cadastrado"})
            } else {
                listaB.push(addJogadorB); 
            }
        } 
        if(rmvJogadorA != null) {
            if (listaA.some(id => id == rmvJogadorA)) {
                listaA = listaA.filter(id => id!=rmvJogadorA);
            } else {
                return response.status(404).send({message:"Jogador A não existente"})
            } 
            
        }
        if(rmvJogadorB != null) { 
            if (listaB.some(id => id == rmvJogadorB)) {
                listaB = listaB.filter(id => id!=rmvJogadorB);
            } else {
                return response.status(404).send({message:"Jogador B não existente"})
            } 
        }
        if (vencedor != null) {
            vencedorReal = vencedor
        }
        if(golsA!=null & golsB!=null){
            resp = await Partida.updateOne( {nome: {$eq: nome} }, 
                { $set: {golsA, golsB}})
        }
        if (nomeNovo != null) {
            resp = await Partida.updateOne( {nome: {$eq: nome} }, 
                { $set: {nome: nomeNovo,
                idPlayersA: listaA, idPlayersB: listaB, vencedor: vencedorReal}})
        } else {
            resp = await Partida.updateOne( {nome: {$eq: nome} }, 
                { $set: {idPlayersA: listaA, idPlayersB: listaB, vencedor: vencedorReal}})
        }
        return response.json(resp)
    } else {
        return(response.status(404).send({message: "Partida não encontrada"}))
    }
});

module.exports = routes;