import React from 'react'
import { faMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function ListaDemo() {
    return (
        <React.Fragment>
            <div className="form-list">
                <div className="list-edit-title">
                    <h2>The Title Of Your List</h2>
                    <FontAwesomeIcon size="lg" icon={faMarker} />
                </div>
            </div>
            <div className="container-aviso-list">
                <div className="the-list-popUp">
                    <ul>
                        <li>item uno</li>
                        <li>item dos</li>
                        <li>item tres</li>
                        <li>item cuatro</li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}
