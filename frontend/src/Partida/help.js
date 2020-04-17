import apiCalls from '../util/apiCalls';

async function uou(){
    var util = new apiCalls();
let resp= await util.handleLoadPartida("Honey-Honey-Partidafftxcxx")
console.log(resp)
}
uou()