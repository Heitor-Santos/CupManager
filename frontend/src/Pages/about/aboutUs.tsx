import { IonContent, IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonGrid, IonRow, IonCol, IonAvatar, IonImg } from "@ionic/react"
import React from "react"
import "./aboutUs.css"
import antonio from "../../media/antonio.jpg"
import heitor from "../../media/heitor.jpeg"


const aboutUs: React.FC = () => {

    let infoDevs = [
        {
            "about": "Antônio Netto, 20 anos",
            "description": "Atualmente cursando ciência da computação, amante da tecnologia e filmes trash, se considera um sonhador.",
            "contact": "absn2@cin.ufpe.br"
        },
        {
            "about": "Heitor Santos, 20 anos",
            "description": "Atualmente cursando ciência da computação, amante de uma boa música no fim da tarde, se considera um estudioso da vida.",
            "contact": "hss2@cin.ufpe.br"
        }
    ]

    return(
        <IonPage>
            <IonContent>
            <IonToolbar color = "primary">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle>Sobre Nós</IonTitle>
            </IonToolbar>
            <IonGrid>
                <IonCol>
                    <IonRow>
                        <IonCol size="auto">
                           <img src= {antonio} className = "avatar"></img>
                            </IonCol>
                        <IonCol>
                            <strong><p>{infoDevs[0].about}</p></strong>

                            <p>{infoDevs[0].description}</p>
                            <p>Contato: <em>{infoDevs[0].contact}</em></p>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="auto">
                            <img src= {heitor} className = "avatar"></img>
                        </IonCol>
                        <IonCol>
                        <strong><p>{infoDevs[1].about}</p></strong>

                        <p>{infoDevs[1].description}</p>
                        <p>Contato: <em>{infoDevs[1].contact}</em></p>
                        </IonCol>
                    </IonRow>
                </IonCol>
            </IonGrid>
            </IonContent>
        </IonPage>
    )
}

export default aboutUs