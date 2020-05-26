import React from 'react'
import { IonPage, IonContent, IonItem, IonIcon } from '@ionic/react'
import { arrowForwardCircle, people } from 'ionicons/icons'

function Tab2(props: any){
    return(
        <IonPage>
            <IonContent>
                <IonIcon icon={people}/>
                <p>Tab 2 GOSTOSA</p>
            </IonContent>
        </IonPage>
    )
}
export default Tab2;