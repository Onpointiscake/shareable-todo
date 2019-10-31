import React from 'react';
import './App.css';

import CreateList from './Components/CreateList/CreateList'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }
  callAPI() {
    fetch("http://localhost:4000/list/323")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <React.Fragment>

        <navbar className="main-nav">
          <h2>Todo Shareable</h2>
          <h3>Share your list with friends</h3>
        </navbar>

        <div className="form-list">
          <CreateList />
        </div>

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
              <button>Go To List</button>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
