import React from 'react';
import api from './util/api';
import './estilos/busca.css';
import './estilos/geral.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

class Teste extends React.Component {
    render() {
        return (
            <div>
                <h1>OOOOOIIII</h1>
                <p>{this.props.match.params.nameCup}</p>
            </div>
        )
    }
}
export default Teste;