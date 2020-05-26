import React from 'react'
import { IonPage, IonContent} from '@ionic/react'
import ToolBar from './ToolBar'
import CupList from './CupList'

function Tab3(props: any){
    return(
        <IonPage>
            <ToolBar/>
            <IonContent>
                <CupList />
            </IonContent>
        </IonPage>
    )
}
export default Tab3;