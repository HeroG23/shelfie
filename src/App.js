import React, { Component } from 'react'
import Form from "./Components/Form/Form";
import Dashboard from './Components/Dashboard/Dashboard';
import Header from './Components/Header/Header';
export class App extends Component {
  constructor(){
    super();
    this.state = {
      inventory: []
    }
  }

  componentDidMount(){
    axios.get('http://')
  }
  render() {
    return (
      <div>
         this is the App.js component
      <Header/>
      <Dashboard/>
      <Form/>    
      </div>
    )
  }
}

export default App;
