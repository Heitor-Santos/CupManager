import React from 'react'
import HandleStorage from '../../util/handleStorage'
import { IonItem, IonList, IonLabel } from '@ionic/react';
import ListIsEmpty from './listIsEmpty'
import "./CupList.css"
import { Redirect } from 'react-router';
const store = new HandleStorage();

class CupList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cupList: null
        }
    }
    async componentDidMount() {
        this.updateCupList()
    }

    async updateCupList() {
        const recentCups = await store.getRecentCups()
        console.log(recentCups)
        if (recentCups != null) {
            let cupList = recentCups.map((cup) =>
                <IonItem routerLink = "/tab1" routerDirection = "back" className = "item" onClick = {() => store.setLastCup(cup["cup"])}>
                    <IonLabel>
                        <h2>{cup["cup"]}</h2>
                        <p>Acessado em {cup["date"]} às {cup["time"]}</p>
                    </IonLabel>
                </IonItem>
            )
            this.setState({ cupList: cupList })
        }
    }

    async componentDidUpdate() {
        let match = await store.getRecentCups()
        if (match == this.state.cupList || this.state.cupList.length != match.length) {
            this.updateCupList()
        }
    }

    render() {
        const recentCups = this.state.cupList
        const response = recentCups?
            <IonList>{recentCups}</IonList>
            :<ListIsEmpty/>
        return (response)
    }
}
export default CupList