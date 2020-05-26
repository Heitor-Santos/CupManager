import React from 'react'
import { IonPage, IonContent, IonItem, IonIcon } from '@ionic/react'
import { arrowForwardCircle, arrowUndo } from 'ionicons/icons'

function Tab3(props: any){
    return(
        <IonPage>
            <IonContent>
                <IonIcon icon={arrowUndo}/>
            </IonContent>
        </IonPage>
    )
}
export default Tab3;