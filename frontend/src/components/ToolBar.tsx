import React, {useState} from 'react';
import { IonButton, IonButtons, IonIcon, IonToolbar, IonHeader, IonTitle, IonPopover, IonList, IonItem } from '@ionic/react';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons'

function ToolBar(props: { title: React.ReactNode; }) {

    const [showPopover, setShowPopover] = useState<{open: boolean, event: Event | undefined}>({
        open: false,
        event: undefined,
      });
    
    
    return (
        <IonHeader>
            <IonToolbar color = "primary">
                <IonButtons slot="primary">
                <IonPopover
                    isOpen={showPopover.open}
                    event={showPopover.event}
                    onDidDismiss={e => setShowPopover({open: false, event: undefined})}
                >
                    <IonList>
                        <IonItem routerLink="/aboutUs" routerDirection = "forward">
                            <IonButton
                            expand = "block" fill = "clear" size = "default" 
                            >
                                <p>Sobre nós</p></IonButton>
                        </IonItem>
                        <IonItem>
                        <IonButton routerLink = "/aboutApp" routerDirection = "forward"
                         expand = "block" fill = "clear" size = "default" >
                             <p>Sobre aplicativo</p>
                        </IonButton>
                        </IonItem>
                    </IonList>
                </IonPopover>
                    <IonButton onClick={(e) => setShowPopover({open: true, event: e.nativeEvent})}>
                        <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
                    </IonButton>
                </IonButtons>
                <IonTitle>{props.title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}
export default ToolBar;