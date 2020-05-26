import React from 'react'
import HandleStorage from '../../util/handleStorage'
import { IonItem, IonList, IonLabel } from '@ionic/react';

const store = new HandleStorage();

class CupList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cupList: null
        }
    }
    async componentDidMount() {
        const recentCups = await store.getRecentCups()
        console.log(recentCups)
        if (recentCups != null) {
            let cupList = recentCups.map((cup) =>
                <IonItem>
                    <IonLabel>
                        <h2>{cup["cup"]}</h2>
                        <p>Acessado em {cup["date"]} às {cup["time"]}</p>
                    </IonLabel>
                </IonItem>
            )
            this.setState({ cupList: cupList })
        }
    }
    render() {
        const recentCups = this.state.cupList
        return (
            <IonList>{recentCups}</IonList>
        )
    }
}
export default CupList