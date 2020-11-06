import React, { Component } from 'react';
import "./reset.css";
import './App.css';
import axios from "axios";
import Form from "./Components/Form/Form";
import Dashboard from './Components/Dashboard/Dashboard';
import Header from './Components/Header/Header';
class App extends Component {
  constructor(){
    super();
    this.state = {
      inventory: [],
      item: {}
    }
    this.findProducts=this.findProducts.bind(this)
    this.editSelect = this.editSelect.bind(this)
  }

  findProducts(){
    axios.get('/api/inventory')
    .then(res => {this.setState({inventory: res.data})
  }).catch(err => console.log(err))
  }
  editSelect(product) {
    this.setState({
      item: product
    })
  }

  render() {
    return (
      <div className="App">
         
      <Header/>
      <Dashboard inventory={this.state.inventory} editSelect={this.editSelect} findProducts={this.findProducts}/>
      <Form product={this.state.item} editSelect={this.editSelect} findProducts={this.findProducts}/>    
      </div>
    )
  }
}

export default App;
