import React from 'react'
import { IonPage, IonContent} from '@ionic/react'
import Landing from '../../Pages/Landing/Landing'

function Tab2(props: any){
    return(
        <IonPage>
            <IonContent>
                <Landing title="CupManager"/>
            </IonContent>
        </IonPage>
    )
}
export default Tab2;