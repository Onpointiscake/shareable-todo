import React from 'react';
import Link from 'react-router-dom/Link'

const DetailsList = () => {
    return (
        <div>
            <div className="container-aviso">
                <h2>This is your new list:</h2>
                <h4 className="title-new-list">Titulo fetcheado de la nueva lista</h4>

                <div className="new-list-popUp">
                    <div className="get-link-wrapper">
                        <p>Share your list with friends:</p>
                        <button>Get Link to Share</button>
                        <input></input>
                    </div>
                    <div className="go-to-list-wrapper">
                        <p>Or start adding items already:</p>
                        <Link to="/lista"><button>Go To List</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsList;
