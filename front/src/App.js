import React from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom'

import Navbar from './Components/Navbar/navbar'

import CreateList from './Components/CreateList/CreateList'
import TheList from './Components/TheList/TheList';


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>

        <Navbar />
        <Route exact path="/" render={(props) => <CreateList {...props} />} />
        <Route path="/lista/:id_lista" render={(props) => <TheList {...props} />} />

        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
