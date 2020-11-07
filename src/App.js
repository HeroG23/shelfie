import React, { Component } from 'react';
import {Link} from "react-router-dom"

import Header from './Components/Header/Header';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';

import './reset.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
          <Link exact path='/' component={Dashboard} />
          <Link path='/add' component={Form} />
          <Link path='/edit/:id' component={Form} />
      </div>
    );
  }
}

export default App;