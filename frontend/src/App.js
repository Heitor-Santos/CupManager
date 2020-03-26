import React from 'react';
import './App.css';
import api from './util/api';
import './estilos/busca.css';
import './estilos/geral.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function InBusca(props) {
  return (
    <input type="text" class="form-control" id="inBusca"
      placeholder="Digite aqui o nome do seu campeonato" aria-label="Recipient's username"
      aria-describedby="basic-addon2" onChange={props.onChange}
    />
  );
}

function ButCadast(props) {
  return (
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button"
        id="button-addon2" onClick={props.onClick}>Cadastrar</button>
    </div>
  );
}

class ResSub extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      codeRes: this.props.codeRes
    }
  }
  render() {
    if (this.props.codeRes == 200) {
      return (
        <div class="alert alert-success" role="alert">
          Seu campeonato foi criado!
        </div>
      )
    }
    else if (this.props.codeRes == 400) {
      console.log("400")
      return (
        <div class="alert alert-warning" role="alert">
          Já temos um campeonato com esse nome
        </div>
      )
    }
    else {
      return (
        <div class="alert alert-danger" role="alert">
          Por favor, tente mais tarde!
        </div>
      )
    }
  }
}

class Busca extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameCup: "",
      codeRes: false,
    }
  }
  handleChange(newName) {
    this.setState({ nameCup: newName })
  }
  async handleCLick() {
    try {
      const response = await api.post('/cup', {
        "nome": this.state.nameCup,
        "idPartidas": ""
      })
      this.setState({ codeRes: 200 })
    }
    catch (error) {
      if (error.response) {
        this.setState({ codeRes: error.response.status })
      }
    }
  }
  render() {
    return (
      <div>
        <div id="geral"><img src={require('./media/symbol.jpg')} width="50%" /></div>
        <div class="input-group mb-3" id="busca">
          <InBusca onChange={() => this.handleChange(document.getElementById('inBusca').value)} />
          <ButCadast onClick={() => this.handleCLick()} />
        </div>
        {this.state.codeRes ?
          <div id="geral">
            <ResSub codeRes={this.state.codeRes} />
          </div>
          : null
        }
        <p class="text-center">Bem vinde ao Cup Manager, feito com muito carinho
        por Antônio e Heitor &lt;3</p>
      </div>
    )
  }

}
function App() {
  return (
    <div>

      <Busca />

    </div>
  );
}

export default Busca;
