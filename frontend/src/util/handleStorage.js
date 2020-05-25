import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

class HandleStorage {
    async isFirstTime() {
        const { value } = await Storage.get({ key: 'lastCup' });
        if (value == undefined) return true
        return false
    }
    async setLastCup(lastCup){
        const resp = await Storage.set(
            {
                key: 'lastCup',
                value: lastCup
            }
        )
        console.log("oooookkkk")
    }
}

export default HandleStorage;