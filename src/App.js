
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

/* Theme variables */
import './theme/variables.css';

import React from 'react';
import TabParent from './TabParent'
import Landing from './Pages/Landing/Landing'
import HandleStorage from './util/handleStorage'
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


const store = new HandleStorage()
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isFirstTime: undefined }
  }
  async componentDidMount() {
    let isFirstTime = await store.isFirstTime()
    if (isFirstTime) this.setState({ isFirstTime: true })
    else this.setState({ isFirstTime: false })
  }
  openTabs() {
    this.setState({ isFirstTime: false })
  }

  render() {
    const response = this.state.isFirstTime ?
      <Landing onClick={() => this.openTabs()}  title="CupManager"/> : <TabParent />
    return (
      response
    )
  }

}

export default App;