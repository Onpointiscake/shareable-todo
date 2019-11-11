import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class CreateList extends Component {
  state = {
    listaIsCreated: false,
    lista: "",
    id_lista: ""
  }

  createList = (event) => {
    event.preventDefault()

    this.setState({
      listaIsCreated: true,
      lista: event.target.elements.titulolista.value
    })

    const tituloLista = event.target.elements.titulolista.value;
    axios.post('http://localhost:4000/api/list', {
      title: tituloLista
    })
      .then(res => {
        console.log(res)

        let id_newList = res.data._id;

        this.setState({
          id_lista: id_newList
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  createTask = (event) => {
    event.preventDefault()

    const nombreTask = event.target.elements.nombretask.value;
    axios.post('http://localhost:4000/api/task', {
      name: nombreTask,
      list: this.state.id_lista
    }).then(res => console.log(res))
      .catch(error => console.error(error))

  }

  render() {
    if (!this.state.listaIsCreated) {
      return (
        <React.Fragment>
          <div className="form-list">
            <form onSubmit={this.createList} className="list-form">
              <div className="form-group">
                <label >Create a List</label> <br></br>
                <input name="titulolista" placeholder="Enter a title"></input>
              </div>
              <button type="submit" class="btn btn-primary">Crear</button>
            </form>
          </div>
        </React.Fragment>
      )
    } else {
      const newTo = { 
        pathname: `/lista/${this.state.id_lista}`,
        param1: this.state.id_lista 
      };
      return (
        <div className="container-aviso">
          <h2>You just created this list:</h2>
          <h4 className="title-new-list">{this.state.lista}</h4>

          <form onSubmit={this.createTask} className="form-items">
            <input className="input-items" name="nombretask" placeholder="add items..."></input>
            <button type="submit" class="btn btn-primary">Añadir</button>
          </form>

          <div className="items-container">

          </div>
          <div className="double-links-wrap">
            <div className="get-link-wrapper">
              <p>Share the above list with friends:</p>
              <button>Get Link to Share</button>
              <input defaultValue={this.state.id_lista}></input>
            </div>
            <div className="go-to-list-wrapper">
              <p>Or Add more tasks and personalize the list clicking here:</p>
              <Link to={newTo}> <button>Go To List</button> </Link>
            </div>
          </div>
        </div>
      )
    }
  }
}
