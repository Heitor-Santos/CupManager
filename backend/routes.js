const {Router} = require('express')
const mongoose = require('mongoose')
const routes = Router()
const util = require('./util')
const Cup = require('./models/Cup')
routes.get('/users',(request, response)=>{
    console.log(request.query)
    return response.json({message:'Hello World'});
});
routes.post('/cup', async (request,response)=>{
    const {nome, idPartidas} = request.body;
    console.log("funfou")
    const idTreat = idPartidas.split(' ')
    console.log("funfogggggggu")
    id = util
    console.log("funfouddddddddddddddddd")
    cup = await Cup.create({
        id,
        nome,
        idPartidas: idTreat
    })
    return response.json(cup)
})
module.exports = routes