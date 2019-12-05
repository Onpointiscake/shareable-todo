import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export default class CreateList extends Component {

  state = {
    listaIsCreated: false,
    lista: "",
    id_lista: "",
    items_local: []
  }

  createList = (event) => {
    event.preventDefault()

    this.setState({
      listaIsCreated: true,
      lista: event.target.elements.titulolista.value
    })

    const tituloLista = event.target.elements.titulolista.value;
    axios.post('https://localhost:4000/api/list', {
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

    let itemsCounter = this.state.items_local.length;
    this.setState(prevState => ({
      items_local: [{ "name": nombreTask, "id": itemsCounter, idApi: "" }, ...prevState.items_local]
    }))

    axios.post('https://localhost:4000/api/task', {
      name: nombreTask,
      list: this.state.id_lista
    }).then((res) => {
      this.setState(prevState => ({
        ...prevState,
        items_local: [...prevState.items_local.map(item => {
          if (item.name === res.data.name) {
            item.idApi = res.data._id
          }
          return { ...item };
        })]
      }))
    }).catch(error => console.error(error))

    //clear value of input:
    document.getElementById("create-list-form").reset();
  }

  deleteTask = (id) => {
    this.state.items_local.map(object => {
      if (object.id === id) {
        let linkofTaskToDelete = object.idApi;
        axios.delete(`https://localhost:4000/api/task/${linkofTaskToDelete}`)
          .then(() => console.log('task eliminada en backend'))
          .catch((err) => console.log(err))
      }
      return 'procediendo a eliminar en local...'
    })
    // delete locally:
    this.setState({
      items_local: this.state.items_local.filter(function (item) {
        return item.id !== id
      })
    });
  }

  shareList = () => {

    if (navigator.share) {
      console.log('this stuff works!')
    } else {
      console.log('navigation doesnt work')
    }
  }

  render() {
    if (!this.state.listaIsCreated) {
      return (
        <React.Fragment>
          <div>
            <div className="main-nav">
              <h4>&#169;Todo Shareable</h4>
              <h3>Tu App de Tareas Colaborativa</h3>
            </div>
          </div>

          <div className="form-list">
            <form onSubmit={this.createList} className="list-form">
              <div className="form-group">
                <h4>Crea una Lista</h4>
                <input className="input-titulo" name="titulolista" placeholder="Escribe un título..."></input>
              </div>
              <button type="submit" className="btn btn-primary">Crear</button>
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
        <React.Fragment>
          <div>
            <div className="main-nav">
              <h4>&#169; Todo Shareable</h4>
              <h3>Tu App de Tareas Colaborativa</h3>
            </div>
          </div>

          <div className="container-aviso">
            <h2 className="info-created">Acabas de crear la siguiente lista</h2>
            <div className="new-list-wrapper"><h4 className="title-new-list">{this.state.lista}</h4>

              <form id="create-list-form" onSubmit={this.createTask} className="form-items">
                <input className="input-items" name="nombretask" placeholder="Añade algo que hacer..."></input>
                <button type="submit" className="btn btn-primary">Añadir Tarea</button>
              </form>

              <div className="items-container">
                {this.state.items_local.map((item, i) =>
                  <ul key={i} data-id={item.id}>
                    <li key={i} data-id={item.id}>{item.name}
                      <button onClick={this.deleteTask.bind(this, item.id)}>Borrar</button>
                    </li>
                  </ul>
                )}
              </div></div>

            <div className="double-links-wrap">
              <div className="get-link-wrapper">
                <h5>¿Quieres que otras personas puedan colaborar en esta lista?</h5>
                <h6 className="info-share">Entonces comparte el siguiente enlace </h6>
                <input className="input-share-list" defaultValue={"https://arcane-everglades-30591.herokuapp.com/lista/" + this.state.id_lista}></input>
                <button className="button-copy-link btn btn-link" href={"https://arcane-everglades-30591.herokuapp.com/lista/" + this.state.id_lista}>Copiar Link</button>
              </div>
              <div className="go-to-list-wrapper">
                <p>...O accede directamente a tu nueva lista</p>
                <Link to={newTo}> <button className="btn btn-info btn-golist">Ir A La Lista</button> </Link>
              </div>
            </div>
          </div>
        </React.Fragment>

      )
    }
  }
}
