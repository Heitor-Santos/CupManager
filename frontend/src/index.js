import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cup from './Cup';
import Partida from './Partida';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={App}/>
          <Route path="/:nameCup" exact={true} component={Cup}/>
          <Route path="/:nameCup/:namePartida" component={Partida}/>
        </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
