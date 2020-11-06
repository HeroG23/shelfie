import axios from 'axios';
import React, { Component } from 'react'
import Product from '../Product/Product';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
      }
      deleteProduct(id) {
        axios.delete(`/api/product/${id}`)
          .then(res => this.props.getInventory())
          .catch(err => console.log('delete product axios error', err))
      }
      render() {
        return (
          <div className='Dashboard'>
            {this.props.inventory.map((e) => {
              return <Product key={e.id} item={e} editSelect={this.props.editSelect} deleteProduct={this.deleteProduct} />
            })}
          </div>
        );
      }
    }

export default Dashboard
