import React from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'

import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export default class TheList extends React.Component {

    state = {
        nombre_lista: "",
        ListIsInEditMode: false,
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
            .then((response) => {
                let titulo = response.data.title;
                this.setState({
                    nombre_lista: titulo
                })
            })
            .catch((error) => {
                console.log(error);
            })
        // set tasks property of state to tasks of current list:
        axios.get(`http://localhost:4000/api/tasks/${id}`)
            .then((response) => {
                let tasks = response.data;
                this.setState({
                    tasks: tasks
                })
            }).catch((error) => console.log(error))
    }
    // Api functions:
    deleteList = () => {
        if (window.confirm('¿Estás seguro que quieres borrar esta Lista?')) {

            axios.delete(`http://localhost:4000/api/list/${this.state.id_lista}`)
                .then(() => console.log('lista eliminada'))
                .catch((err) => console.log(err))
            axios.delete(`http://localhost:4000/api/tasks/${this.state.id_lista}`)
                .then(() => console.log('tareas de la lista eliminadas'))
                .catch((err) => console.log(err))

            alert('Lista borrada. Ahora podrás crear una nueva')
            // Go back to Index page:
            this.props.history.push('/')

        } else {
            console.log('anulada operacion')
        }
    }

    // List edit Name functions:
    changeEditMode = () => {
        console.log('should go to edit mode now')
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
    }
    updateComponentValue = () => {
        this.setState({
            isInEditMode: false,
            nombre_lista: this.refs.TheTextInput.value
        })
    }
    renderEditView = () => {
        return (
            <React.Fragment>
                <input
                    type="text"
                    defaultValue={this.state.nombre_lista}
                    ref="TheTextInput"
                />
                <div className="buttons-edit-list">
                    <button className="btn btn-secondary" onClick={this.changeEditMode}>CANCELAR</button>
                    <button className="btn btn-success" onClick={this.updateComponentValue}>GUARDAR</button>
                </div>
            </React.Fragment>
        )
    }
    renderDefaultView = () => {
        return (
            <div className="list-non-edit">
                <h2>{this.state.nombre_lista}</h2>
                <FontAwesomeIcon onClick={this.changeEditMode} size="lg" icon={faMarker} />
            </div>
        )
    }

    getTaskAsDone = (task) => {
        const id = task._id;

        axios.put(`http://localhost:4000/api/task/${id}`, {
            doned: true
        }).then(() => {
            console.log('ahora habría que cambiar el estilo')
        }).catch(error => { console.error(error) })

    }
    deleteTask = (task) => {
        const id = task._id;
        if (window.confirm(`¿Quieres borrar la tarea ${task.name}?`)) {

            axios.delete(`http://localhost:4000/api/task/${id}`)
                .then(() => {
                    let idlista = this.props.match.params.id_lista
                    axios.get(`http://localhost:4000/api/tasks/${idlista}`)
                        .then((response) => {
                            let tasks = response.data;
                            this.setState({
                                tasks: tasks
                            })
                        }).catch((error) => console.log(error))
        
                    console.log(this.state.tasks)
                }).catch((err) => console.log(err))
        } else {
            console.log('anulada operacion')
        }
    }

    createTask = (event) => {
        event.preventDefault()
        console.log('añadiendo task en api')
        // Post new task in Api
        const nombreTask = event.target.elements.nombretask.value;
        axios.post('http://localhost:4000/api/task', {
            name: nombreTask,
            list: this.state.id_lista
        }).then(() => {
            let id = this.props.match.params.id_lista
            axios.get(`http://localhost:4000/api/tasks/${id}`)
                .then((response) => {
                    let tasks = response.data;
                    this.setState({
                        tasks: tasks
                    })
                }).catch((error) => console.log(error))

            console.log(this.state.tasks)
        }).catch(error => console.error(error))

        //clear value of input:
        document.getElementById("create-list-form").reset();
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-list">
                    <div className="list-edit-title">
                        {this.state.isInEditMode ? this.renderEditView() : this.renderDefaultView()}
                    </div>
                </div>
                <div className="container-aviso-list">
                    <form id="create-list-form" onSubmit={this.createTask} className="form-items">
                        <input className="input-items-real" name="nombretask" placeholder="Añade una tarea aqui..."></input>
                        <button type="submit" className="btn btn-primary">Añadir</button>
                    </form>
                    <div className="the-list-popUp">
                        {this.state.tasks.map((item, i) =>
                            <ul>
                                <li className="item-lista" key={i}>{item.name}</li>
                                <div className="double-button-wrapper">
                                    <button onClick={this.getTaskAsDone.bind(this, item)} className="btn btn-success">Hecho</button>
                                    <button onClick={this.deleteTask.bind(this, item)} className="btn btn-secondary">Borrar</button>
                                </div>
                            </ul>
                        )}
                    </div>
                    <div className="delete-container">
                        <button size="sm"
                            onClick={this.deleteList} type="button"
                            className="btn btn-danger btn-sm borra-lista-btn">
                            Borrar Lista
                        </button>
                    </div>
                </div>
                <Link to="/"><button className="btn btn-info button-create-otherList">Crear otra Lista</button></Link>
            </React.Fragment>
        )
    }
}
