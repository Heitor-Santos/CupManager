import React from 'react'
import { IonPage, IonContent, IonItem, IonIcon } from '@ionic/react'
import { arrowForwardCircle } from 'ionicons/icons'

function Tab1(props: any) {
    return (
        <IonPage>
            <IonContent>
                <IonIcon icon={arrowForwardCircle} />
                <p>Tab 1 fi da puta</p>
            </IonContent>
        </IonPage>
    )
}
export default Tab1