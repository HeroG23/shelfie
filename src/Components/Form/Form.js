import React, { Component } from 'react'

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            product_name: "",
            price: 0,
            img_url: ""
        }
        this.addProduct = this.addProduct.bind(this)
        this.imageChange = this.imageChange.bind(this)
    }

    nameChange = (e) => {
       this.setState({
           product_name: e.target.value
       }) 
    }
    priceChange = (e) => {
        this.setState({
            price: e.target.value
        })
    }
    imageChange(e){
        this.setState({
            img_url: e.target.value
        })
    }

    addProduct(){
        const {product_name, price, img_url} = this.state;
        const newProduct = {
            product_name,
            price,
            img_url
        }
        const newInventory = [...this.props.inventory, newProduct]
        this.setState({
            [this.props.inventory]: newInventory
        })
    }
    render() {
        const {product_name, price, img_url, } = this.state
        const {inventory} = this.props
        return (
            <form className="form" onSubmit={this.addProduct}>
                <input
                    value={product_name}
                    onChange={e => this.nameChange(e)}
                    type="text"
                />
                <input
                   value={price}
                    onChange={e => this.priceChange(e)}
                    type="text"
                />
                <input
                    value={img_url}
                    onChange={e => this.imageChange(e)}
                    type="text"
                />
                <button className="add-product" type="submit">Add Product</button>
                <button className="cancel" onClick={() => {
                    this.setState({product_name: inventory.product_name, price: inventory.price, img_url: inventory.img_url})
                }}>cancel</button>
            </form>
        )
    }
}

export default Form
