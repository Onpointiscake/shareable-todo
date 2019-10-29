import React from 'react';
import './App.css';
import CreateList from './Components/CreateList/CreateList'
import List from "./Components/List/List"

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
          <button>Create a List</button>
        </navbar>

        <div className="form-list">
          <CreateList />
        </div>

        <div className="container-list">
          <List />
        </div>

      </React.Fragment>
    );
  }
}

export default App;
