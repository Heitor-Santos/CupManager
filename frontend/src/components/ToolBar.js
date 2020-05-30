import React from 'react';
import { IonButton, IonButtons, IonIcon, IonToolbar, IonHeader, IonTitle } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons'
function ToolBar(props) {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="primary">
                    <IonButton>
                        <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}
export default ToolBar;