import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, home, library, search, key } from 'ionicons/icons';
import Tab1 from './Tab 1/Tab1';
import Tab2 from './Tab 2/Tab2';
import Tab3 from './Tab 3/Tab3';
import Match from '../Pages/Match/Match'
import Clock from '../Pages/Match/Clock'
import ListIsEmpty from './Tab 3/listIsEmpty'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


function TabParent(props) {
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/tab1" component={Tab1} exact={true} />
                        <Route path="/tab2" component={Tab2} exact={true} />
                        <Route path="/tab3" component={Tab3} exact={true}/>
                        <Route path="/match" component={Match} exact={true}/>
                        <Route path="/card" component={ListIsEmpty} exact={true}/>
                        <Route path="/shee" component={Clock} exact={true}/>
                        <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon icon={home} />
                            <IonLabel>Início</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={search} />
                            <IonLabel>Pesquisar</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
                            <IonIcon icon={library} />
                            <IonLabel>Recentes</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    )
}
export default TabParent