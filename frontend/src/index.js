import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import Cup from './Cup/Cup';
import Timer from './Partida/Timer';
import Partida from './Partida/Partida';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={App}/>
          <Route path="/:nameCup" exact={true} component={Cup}/>
          <Route path="/:nameCup/:namePartida" exact={true} component={Partida}/>
          <Route path="/a/b/c" exact={true} component={Timer}/>
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
