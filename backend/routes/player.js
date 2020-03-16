const {Router} = require('express')
const mongoose = require('mongoose')
const routes = Router()
const Player = require('../models/Player')

routes.get('/playerAll', async (request, response)=>{    
    let resp = await Player.find();
    if(resp!=null)
        return response.json(resp);
    else 
        return response.status(404).send({message: "Esse Jogador não existe"})
});

routes.get('/player', async (request, response)=>{
    nome = request.query.nome;
    let resp = await Player.findOne({nome});
    if(resp!=null) 
        response.json(resp)
    else return(response.status(404).send({message: "Jogador inexistente"}))
});

routes.delete('/player/:playerNome', async (request, response)=>{
    nome = request.params.playerNome;
    resp = await Player.findOne({nome});
    if(resp==null)
        return(response.status(404).send({message: "Jogador não cadastrado"}))
    await Player.deleteOne({nome});
    resp = await Player.findOne({nome});
    console.log(resp);
    if(resp==null)
        return response.json({message:'Jogador deletado!'})
    else 
        return(response.status(500).send({message: "Jogador não deletado"}))
});
routes.post('/player', async (request,response)=>{
    const {nome} = request.body;
    if(await Player.findOne({nome})== null){
        player = await Player.create({
            nome
        })
        return response.json(player)
    }
    return (response.status(400).send({message: "Jogador já cadastrado"}))
})

routes.put('/player/:nomeCamp', async (request, response) => {
    const nomeCamp = request.params.nomeCamp;
    const {nomeNovo, golsFavor, assist, golsContra, golsTomados,goleiro} = request.body;
    let lista=[] ;
    lista = await Player.findOne({nome: nomeCamp});
    const estat = lista[-1];
    if(copa!=null){
        if(golsFavor!='')
            estat.golsFavor= golsFavor;
        if(assist!='')
            estat.assist= assist;
        if(golsTomados!='')
            estat.golsTomados= golsTomados;
        if(goleiro!='')
            estat.goleiro= goleiro;
        lista.pop()
        lista.push(estat)
        if(nomeNovo!='')
            resp = await Player.updateOne( 
                {nome: {$eq: nomeCamp}}, 
                { $set: 
                    {nome: nomeNovo,
                    estatsPartidas: lista
                }})    
        else{
            resp = await Player.updateOne( 
                {nome: {$eq: nomeCamp} }, 
                {$set: {estatsPartidas: lista}})
        }
        return(response.json({message: "Jogador atualizado"}))
    }
    return(response.status(404).send({message: "Jogador não encontrado"}))
});

module.exports = routes;