import React from 'react';
import './CreateList.css'

export default function CreateList() {
    return (
        <React.Fragment>
            <form className="list-form">
                <div className="form-group">
                    <label >Create a List</label> <br></br>
                    <input placeholder="Enter a title"></input>
                </div>
                <button type="submit" class="btn btn-primary">Crear</button>
            </form>
        </React.Fragment>
                    )
}