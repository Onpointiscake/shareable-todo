import React from 'react';
import './App.css';

import axios from 'axios'

import BrowserRouter from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'
import Link from 'react-router-dom/Link'

import lista from './Components/ListaDemo/ListaDemo'
import Items from './Components/Items/Items'

class App extends React.Component {

  state = {
    lista: ""
  }

  createList = (event) => {
    event.preventDefault()

    this.setState({
      lista: event.target.elements.titulolista.value
    })

    const tituloLista = event.target.elements.titulolista.value;
    axios.post('http://localhost:4000/api/list', {
      title: tituloLista
    })
      .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
  }

  createTask = (event) => {
    event.preventDefault()

    const nombreTask = event.target.elements.nombretask.value;
    axios.post('http://localhost:4000/api/task', {
      name: nombreTask
    }).then(res => console.log(res))
      .catch(error => console.error(error))

  }

  render() {
    return (

      <BrowserRouter>

        <Route path="/lista" render={lista} />

        <React.Fragment>
          <div>
            <navbar className="main-nav">
              <h2>Todo Shareable</h2>
              <h3>Share your list with friends</h3>
            </navbar>
          </div>

          <div className="form-list">
            <form onSubmit={this.createList} className="list-form">
              <div className="form-group">
                <label >Create a List</label> <br></br>
                <input name="titulolista" placeholder="Enter a title"></input>
              </div>
              <button type="submit" class="btn btn-primary">Crear</button>
            </form>

          </div>

          <div className="container-aviso">
            <h2>This is your new list:</h2>
            <h4 className="title-new-list">{this.state.lista}</h4>
            <form onSubmit={this.createTask} className="form-items">
              <input className="input-items" name="nombretask" placeholder="add items..."></input>
              <button type="submit" class="btn btn-primary">Añadir</button>
            </form>
            <div className="items-container">
              <Items />
            </div>
            <div className="double-links-wrap">
              <div className="get-link-wrapper">
                <p>Share your list with friends:</p>
                <button>Get Link to Share</button>
                <input></input>
              </div>
              <div className="go-to-list-wrapper">
                <p>Or start adding items already:</p>
                <Link to="/lista"> <button>Go To List</button> </Link>
              </div>
            </div>
          </div>
        </React.Fragment>


      </BrowserRouter>

    );
  }
}

export default App;
