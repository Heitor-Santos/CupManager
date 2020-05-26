import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

class HandleStorage {
    /**essa função serve pra ver se é a primeira vez que está abrindo o app,
     * that's it.
    */
    async isFirstTime() {
        const { value } = await Storage.get({ key: 'lastCup' });
        if (value == undefined) return true
        return false
    }
    /**
     *Serve pra setar qual foi o último campeonato visualizado, isso é útil pra
     *tela de início (que mostra o último campeonato visualizado) 
     */
    async setLastCup(lastCup) {
        await Storage.set(
            {
                key: 'lastCup',
                value: lastCup
            }
        )
        console.log("oooookkkk")
    }
    //retorna o último campeonato visualizado, pá-pum
    async getLastCup() {
        const { value } = await Storage.get({ key: 'lastCup' });
        return value;
    }
    async pushToRecentCups(lastCup) {
        //Aqui eu vou pegar os campeonatos acessados recentemente
        const { value } = await Storage.get({ key: 'recentCups' });
        let recentCups = []
        //se for indefinido, quer dizer que não tem nenhum
        const today = new Date()
        const date = today.toLocaleDateString()
        const time = today.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit', hour12: false})
        const objCup = {
            "cup": lastCup,
            "date": date,
            "time": time
        }
        if (value == undefined)
            recentCups = [objCup]
        else {
            /**de caso contrário, eu coloco o lastCup na primeira posição, 
            simulando uma pilha, lembra que no value só pode ter String, então
            quando eu tiro um valor de lá eu tenho que converter para JSON, e 
            quando eu coloco eu tenho que converter para String.
            Mais informações: https://capacitor.ionicframework.com/docs/apis/storage/
            */
            recentCups = JSON.parse(value)
            recentCups.unshift(objCup)
        }
        await Storage.set(
            {
                key: 'recentCups',
                value: JSON.stringify(recentCups)
            }
        )
    }
    //Aqui eu só faço mesmo retornar a lista dos campeonatos acessados recentemente
    async getRecentCups() {
        const { value } = await Storage.get({ key: 'recentCups' })
        const recentCups = JSON.parse(value)
        return recentCups;
    }
}

export default HandleStorage;