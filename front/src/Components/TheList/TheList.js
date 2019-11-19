import React from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default class TheList extends React.Component {
    
    state = {
        nombre_lista: "",
        id_lista: "",
        tasks: []
    }
    componentDidMount() {
        let id = this.props.match.params.id_lista
        // set id_lista property of state to the current list id:
        this.setState({
            id_lista: id
        })
        // set nombre_lista property of state to current list:
        axios.get(`http://localhost:4000/api/list/${id}`)
            .then( (response) => {
                let titulo = response.data.title;
                this.setState({
                    nombre_lista: titulo
                })
            })
            .catch( (error) => {
                console.log(error);
            })
        // set tasks property of state to tasks of current list:
        axios.get(`http://localhost:4000/api/tasks/${id}`)
            .then( (response) => {
                let tasks = response.data;
                this.setState({
                    tasks: tasks
                })
            }).catch( (error) => console.log(error))
    }

    deleteList = () => {
        axios.delete(`http://localhost:4000/api/list/${this.state.id_lista}`)
             .then(() => console.log('lista eliminada'))
             .catch((err) => console.log(err))
        // delete also the tasks of that list:
        axios.delete(`http://localhost:4000/api/tasks/${this.state.id_lista}`)
            .then(() => console.log('tareas de la lista eliminadas'))
            .catch((err) => console.log(err))

        alert('lista eliminada')
        // Go back to Index page:
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-list">
                    <div className="list-edit-title">
                        <h2>{this.state.nombre_lista}</h2>
                        <FontAwesomeIcon size="lg" icon={faMarker} />
                    </div>
                </div>
                <div className="container-aviso-list">
                    <div className="the-list-popUp">
                        {this.state.tasks.map((item, i) => 
        
                                <li key={i}>{item.name}</li>   
                               
                           
                        )}
                    </div>
                    <div className="delete-container">
                        <button onClick={this.deleteList} type="button" className="btn btn-danger">Borrar Lista</button>
                    </div>
                </div>
                <Link to="/"><button type="button">Volver a Inicio</button></Link>
            </React.Fragment>
        )
    }
}
