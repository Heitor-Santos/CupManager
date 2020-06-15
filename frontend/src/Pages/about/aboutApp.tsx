import { IonContent, IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonGrid, IonRow, IonCol, IonAvatar, IonImg } from "@ionic/react"
import React from "react"
import './aboutApp.css'


const aboutApp: React.FC = () => {

    

    return(
        <IonPage>
            <IonContent>
            <IonToolbar color = "primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle>Sobre Aplicativo</IonTitle>
            </IonToolbar>
            <IonGrid>
                <IonCol className="title">
                    <IonCol size = "auto">
                        <li><strong>O que é CupManager?</strong></li>
                    </IonCol>
                    <IonCol className = "response">
                        <p>Um aplicativo simples de gerenciamento de campeonatos amadores de futebol.
                        Onde você apenas cadastra sua copa e pode usar rapidamente sem frescuras!
                        Com o intuito de agilizar o processo de adminstração de coisas simples.
                        </p>
                    </IonCol>
                </IonCol>
                <IonCol className="title">
                    <IonCol size = "auto">
                        <li><strong>Qualquer um pode visualizar minhas copas?</strong></li>
                    </IonCol>
                    <IonCol className = "response">
                        <p>Sim, a ideia do aplicativo é ser uma grande rede social de copas, onde para começar uma só precisa do nome.
                            E o nome da copa é a coisa mais importante na hora da criação, recomendavél colocar palavras chaves específicas.
                        </p>
                    </IonCol>
                </IonCol>
            </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default aboutApp