import React, { Component } from 'react'

class Form extends Component {
    constructor(){
        super();
        this.state = {
            inventory: inventory,
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
        const newProduct = {
            name,
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
                />
                <input
                    name="price"
                    placeholder="Price"
                    onChange={e => this.handleChange(e)}
                />
                <input
                    name="img_url"
                    placeholder="Img_url"
                    onChange={e => this.handleChange(e)}
                />
                <button type="submit">Add Product</button>
                <button type="cancel">cancel</button>
            </form>
        )
    }
}

export default Form
