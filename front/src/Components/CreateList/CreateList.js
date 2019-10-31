import React, { Component } from 'react'

export default class CreateList extends Component {
    render() {
        return (
            <div>
                <div className="form-list">
            <form className="list-form">
                <div className="form-group">
                    <label >Create a List</label> <br></br>
                    <input placeholder="Enter a title"></input>
                </div>
                <button type="submit" class="btn btn-primary">Crear</button>
            </form>
            </div>
            </div>
        )
    }
}
