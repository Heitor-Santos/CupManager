import React from 'react'
import { IonPage, IonContent} from '@ionic/react'
import ToolBar from '../../components/ToolBar'
import CupList from './CupList'

function Recents(props: any){
    return(
        <IonPage>
            <ToolBar title="Campeonatos Recentes"/>
            <IonContent>
                <CupList />
            </IonContent>
        </IonPage>
    )
}
export default Recents;