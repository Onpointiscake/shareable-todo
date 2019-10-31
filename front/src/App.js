import React from 'react';
import './App.css';

import axios from 'axios'

/*
import BrowserRouter from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'

import CreateList from './Components/CreateList/CreateList'
import DetailsList from './Components/List/DetailsList'
import lista from './Components/ListaDemo/ListaDemo'
import navbar from './Components/navbar/navbar'
*/

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

  createTask = (e) => {
    console.log(e.target.value)
  }

  render() {
    return (
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
          <input name="nombretask" placeholder="add items..."></input>
        </div>
          {/**
          <div className="new-list-popUp">
            <div className="get-link-wrapper">
              <p>Share your list with friends:</p>
              <button>Get Link to Share</button>
              <input></input>
            </div>
            <div className="go-to-list-wrapper">
              <p>Or start adding items already:</p>
              <button>Go To List</button>
            </div>
          </div>
          */}
        
      </React.Fragment>
      /*
      <BrowserRouter>
        <Route path="/lista" render={navbar} />
        <Route path="/lista" render={lista} />

        <Route exact path="/" render={navbar} />
        <Route exact path="/" render={CreateList}/>
        <Route exact path="/" render={DetailsList} />
      </BrowserRouter>
      */
    );
  }
}

export default App;
