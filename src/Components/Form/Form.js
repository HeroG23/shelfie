import e from 'express';
import React, { Component } from 'react'

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            price: 0,
            img_url: ""
        }
        this.addProduct = this.addProduct.bind(this)
    }

    handleChange = (e) => {
       this.setState({
           [e.target.name]: e.target.value
       }) 
    }

    addProduct(){
        const {name, price, img_url} = this.state;
        e.preventDefault();
        const newProduct = {
            product_name,
            price,
            img_url
        }
        const newInventory = [...inventory, newProduct]
        this.setState({
            inventory: newInventory
        })
    }
    render() {
        return (
            <form className="form" onSubmit={this.addProduct}>
                <input
                    name="name"
                    placeholder="Name"
                    onChange={e => this.handleChange(e)}
                    type="text"
                />
                <input
                    name="price"
                    placeholder="Price"
                    onChange={e => this.handleChange(e)}
                    type="text"
                />
                <input
                    name="img_url"
                    placeholder="Img_url"
                    onChange={e => this.handleChange(e)}
                    type="text"
                />
                <button type="submit">Add Product</button>
                <button onClick={e=>e.stopPropagation()}>cancel</button>
            </form>
        )
    }
}

export default Form
