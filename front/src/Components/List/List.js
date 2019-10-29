import React from 'react';
import "./List.css"

const List = () => {
    return (
        <div>
            <h2>Titulo de la Lista</h2>
            <ul>
                <li>Item numero 1 renderizado dinámicamente</li>
                <li>Item Numero 2 renderizado dinámicamente</li>
            </ul>
            <input placeholder="añadir tarea "></input> <br></br>
            <button type="button" class="btn btn-outline-success btn-add-item">Añadir Item</button>
        </div>
    );
}

export default List;
