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
import { home, library, search} from 'ionicons/icons';
import Cup from './Pages/Cup/Cup';
import Landing from './Pages/Landing/Landing'
import Recents from './Pages/Recents/Recents';
import Match from './Pages/Match/Match'
import ListIsEmpty from './Pages/Recents/listIsEmpty'
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
import AboutUs from './Pages/About/AboutUs';
import AboutApp from './Pages/About/AboutApp';


function TabParent(props) {
    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/tab1" component={Cup} exact={true} />
                        <Route path="/tab2" component={Landing} exact={true} />
                        <Route path="/tab3" component={Recents} exact={true}/>
                        <Route path="/:cupName/:matchName" component={Match} exact={true}/>
                        <Route path="/aboutUs" component={AboutUs} exact={true}/>
                        <Route path="/aboutApp" component={AboutApp} exact={true}/>
                        <Route path="/card" component={ListIsEmpty} exact={true}/>
                        <Route path="/" render={() => <Redirect to="/tab1" />} exact={true} />
                    </IonRouterOutlet>
                    <IonTabBar color = "light" slot="bottom">
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