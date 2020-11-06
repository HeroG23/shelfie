import React, { Component } from 'react'
import axios from "axios"
import Form from "./Components/Form/Form";
import Dashboard from './Components/Dashboard/Dashboard';
import Header from './Components/Header/Header';
class App extends Component {
  constructor(){
    super();
    this.state = {
      inventory: []
    }
  }

  componentDidMount(){
    axios.get('/api/products')
    .then(res => {this.setState({inventory: res.data})
  }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
         this is the App.js component
      <Header/>
      <Dashboard />
      <Form/>    
      </div>
    )
  }
}

export default App;
