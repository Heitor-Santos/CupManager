import { IonContent, IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle, IonGrid, IonRow, IonCol, IonAvatar, IonImg, IonList, IonItem, IonIcon } from "@ionic/react"
import React, { useState } from "react"
import Collapsible from 'react-collapsible'
import './aboutApp.css'
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons"


const AboutApp: React.FC = () => {
    const [actives, setActives] = useState<Array<number>>([])
    const toggleIcon = (id: number) => {
       let newArray :Array<number>= actives.includes(id)?actives.filter(el=>el!=id):[...actives,id]
       setActives(newArray)
    }
    const questions = [
        <div onClick={() => toggleIcon(0)}><h5>O que é o CupManager?</h5>
        <IonIcon icon={actives.includes(0)?chevronUpOutline:chevronDownOutline} className='questionIcon' />
        </div>,
        <div onClick={() => toggleIcon(1)}><h5>Qualquer um pode visualizar minhas copas?</h5>
        <IonIcon icon={actives.includes(1)?chevronUpOutline:chevronDownOutline} className='questionIcon' />
        </div>,
        <div onClick={() => toggleIcon(2)}><h5>Posso ajudar a melhorar o app?</h5>
        <IonIcon icon={actives.includes(2)?chevronUpOutline:chevronDownOutline} className='questionIcon' />
        </div>
    ]
    return (
        <IonPage>
            <IonContent>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Sobre Aplicativo</IonTitle>
                </IonToolbar>
                <IonList>
                    <IonItem >
                        <Collapsible trigger={questions[0]}>
                            <p>Um aplicativo simples de gerenciamento de campeonatos amadores de futebol.
                            Onde você apenas cadastra sua copa e pode usar rapidamente sem frescuras!
                            Com o intuito de agilizar o processo de adminstração de coisas simples.
                            </p>
                        </Collapsible>
                    </IonItem>
                    <IonItem>
                        <Collapsible trigger={questions[1]}>
                            <p>Sim, a ideia do aplicativo é ser uma grande rede social de copas, onde para começar uma só precisa do nome.
                            E o nome da copa é a coisa mais importante na hora da criação, recomendavél colocar palavras chaves específicas.
                            </p>
                        </Collapsible>
                    </IonItem>
                    <IonItem>
                        <Collapsible trigger={questions[2]}>
                            <p>Qulaquer contribuição/sugestão/crítica é bem vinda! Se tiver achado algum erro ou quiser ajudar
                            no desenvolvimento do app de alguma forma, nos contate pelos canais disponíveis na página "Sobre nós"
                            ou pelo <a href='https://github.com/Heitor-Santos/CupManager'>repositório do CupManager no GitHub</a> 
                            </p>
                        </Collapsible>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default AboutApp