import axios from 'axios';
import React, { Component } from 'react'
import Product from '../Product/Product';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: []
    }
    this.getInventory = this.getInventory.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  componentDidMount() {
    this.getInventory();
  }
  getInventory() {
    axios.get('/api/inventory')
      .then(res => this.setState({ inventory: res.data }))
  }
  deleteProduct(id) {
    axios.delete(`/api/product/${id}`)
      .then(res => this.getInventory())
      .catch(err => console.log('delete product axios error', err))
  }
  render() {
    return (
      <div className='Dashboard'>
        {this.state.inventory.map((el) => {
          return <Product key={el.id} item={el} deleteProduct={this.deleteProduct} />
        })}
      </div>
    );
  }
}

export default Dashboard
