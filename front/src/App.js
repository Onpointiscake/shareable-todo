import React from 'react';
import './App.css';

import BrowserRouter from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'

import CreateList from './Components/CreateList/CreateList'
import DetailsList from './Components/List/DetailsList'
import lista from './Components/ListaDemo/ListaDemo'
import navbar from './Components/navbar/navbar'

class App extends React.Component {
  /*
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
  */
  render() {
    return (
      <BrowserRouter>
        <Route path="/lista" render={navbar} />
        <Route path="/lista" render={lista} />

        <Route exact path="/" render={navbar} />
        <Route exact path="/" render={CreateList}/>
        <Route exact path="/" render={DetailsList} />
      </BrowserRouter>
    );
  }
}

export default App;
