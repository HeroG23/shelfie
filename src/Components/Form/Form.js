import axios from 'axios';
import React, { Component } from 'react'
import {withRouter} from "react-router-dom"

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            product_name: "",
            price: 0,
            img_url: "",
            edit: false
        }
        this.addProduct = this.addProduct.bind(this)
        this.imageChange = this.imageChange.bind(this)
    }
    componentDidMount() {
        let { id } = this.props.match.params;
        if (id) {
          axios.get(`/api/product/${id}`)
            .then(res => {
              this.setState({ ...res.data, edit: true })
            })
        }
      }
      componentDidUpdate(oldProps) {
        if (this.props.match.path !== oldProps.match.path) {
          this.setState({
            product_name: '',
            price: 0,
            img_url: ''
          })
        }
      }
    nameChange = (text) => {
        if (text.length <= 40) {
            this.setState({ name: text })
          }
    }
    numberInput(val) {
      if (val[0] === '.') {
        val = '0' + val
      }
      if (isNaN(Number(val))) {
        return;
      }
      let chop = val.split('.');
      let dollars = chop[0];
      let cents = chop[1];
      if (dollars[0] === '0') {
        dollars = '0'
      }
      if (val.indexOf('.') !== -1) {
        dollars += '.'
      }
      if (cents && cents[1]) {
        cents = cents[0] + cents[1];
        val = dollars + cents;
      } else if (!cents) {
        val = dollars;
      }
      if (Number(val) * 100 >= 2147483647) {
        return;
      }
      this.setState({ price: val })
    }
    numberSubmit(num) {
      num ? num = Number(num) : num = 0
      return Math.round(num * 100)
    }
    imageChange(e){
        var img = new Image();
        img.onload = ()=> this.setState({ img_url: e });
        img.onerror = () => this.setState({ img_url: '' });
        img.src = e;
    }
    handleEdit = () => {
      let { id, product_name, price, img_url } = this.state;
      if (product_name) {
        let product = {
          product_name,
          price: this.numberSubmit(price),
          img_url
        }
        axios.put(`/api/product/${id}`, product)
          .then(res => {
            this.props.history.push('/');
          })
          .catch(err => console.log('axios update erro', err))
      } else {
        console.log('you are missing a name and need to handle this user fail');
      }
    }

    handleCancel = e => {
      if (this.props.match.params.id) {
        this.props.history.push('/');
      } else {
        this.setState({
          name: '',
          price: 0,
          img: '',
          edit: false
        })
      }
    }
    addProduct(){
      let { product_name, price, img_url } = this.state;
      if (product_name) {
        let product = {
          product_name,
          price: this.numberSubmit(price),
          img_url
        }
        axios.post('/api/product', product)
          .then(res => {
            this.props.history.push('/');
          })
          .catch(err => console.log('axios create error', err))
      } else {
        console.log('you are missing a name and need to handle this user fail');
      }
    }

    render() {
        const {product_name, price, img_url, } = this.state
        return (
            <div className="Form">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATgAAAChCAMAAABkv1NnAAAAgVBMVEUAAAD///8qKiomJib4+Pj8/Px0dHR6enqLi4u2trYJCQns7OxkZGRgYGDIyMg/Pz9bW1vi4uLY2NgxMTHy8vKVlZUaGhpUVFRtbW2+vr6oqKihoaHW1tZXV1fu7u7X19dGRkaFhYU5OTkeHh4TExOkpKSRkZGamppERETFxcWwsLBch0+IAAAFAklEQVR4nO2b6WKqMBCFEUREKog7Vlvcq+//gJckqCyRJAqi3PP9akPWY8hMJkHTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQZjf4SiIuEKby69X38D3Zua0UwgJdM5XfekEf35JNWre2sMAyXaDzgj6+J0dTTbiZD+GyzGWES2JCOIr1scLNRrU2X75wg2e6I03omk6typUunNUaVi+dfiar9LzydgooXbggGlHw91SfROwmY2Kjgl6lrQgoXbgZGZO52D7Vq0I6DmnCr3W+VbHGhUMyrnH3mV4VMKPVt9cVVS9NFVZ1TqeEI7GVU2bENj3fFVStSDXuyJouQsPZo726g3GmstnvsFmuyI/b7enmJPAe7BaPHrMJrtzP4fXn836ZzWeozAEeBXQtKs9KdPwimxAOCP0d/cfouA4VeewEc67tnQ1Y/qyyrBryROQkVrhzGNDYwLicZXy2LDQ53/E2mvpBBye5s/Y5wZzg8jDgVxNxEHSo0i2XVThJFGDT11xM72UYx8ONZpBHzW7LJLBEO5vbuMpj86uJEHkFFe9VD226LIVKTeTYs9lR8PZY7YtwFhOkQw2Ibp0480rTjneEu1RTv3Cadua9EkqwMOpSvNBHufQFybtIJI78TMKNE2cyMpw3EE7T6Y/eOioVujGX3if0iLzEIGX2ysT14/qU7nsLp2mrx60EK/ojtQ3psXfM2WQfRIuezyvw9sKJXIm7eIFJXRo5h5cJ5+czr0z+lPsA4S4BDSUrMf2mS/VJNtTSu6MbPTM5c5I/QbhokbbJ7DHP0tFH64cIMexLt0CE4wc31/x39TOEI0FbutRNpMJoA/py/6icRBLh+Nuxrxb3DPRThIsGQNVwxGowjdsi7z1NjznAHPqfLlzUHF3qfEFwXf+V2vVkaLRwsWPviLzZR8xwk4VbDWXdsl2Xzs2lQkivucJ5LNK0N6Rys5Ms05Y2w00VzthTt0whthmbiONOLntDhesyt2ylVKgva4YJjRROSYEkcmaY0kDhPLpVNxXdi5iJbFSpccLpLFDNj4lJsJU822qacOy86/TMkV54YlbibuSc0izh2Anr8tl7OF9D8RrZJOHYeHnnTMrEZ9wFVrk5wsV+2ETSDxPQ+2Zn3LkA7zVDQ4Tb2WxNL+/ekm4XWpkShfupUTjmRbjlXkLY0DlsTrgPlYWz7wlHvKeahFPwW9Xo3w9wKgvXjawWLzsNatUinHTA8hHW9LyQc19WWbgwSs6HEDz2bUINwl325lXdNDXYIU6QtTnKwvV8ziHOOj7Mf7lwhmo06AFYfCo3ZlXhyLuaGQy727OowThsqecmeYftcciF1mGyWcMw9KjhGfkjndUwtnMinGHkNx7krU+ck6/ceLJF6YdptqKohhvTNREumZL3HrbJx0Q4a5pKSeG1XnSv2fITZ8zXSzSUfTLf4pbezi26IV0u10TRjWWz22H+HxM0uxoYv61isrb+KMi/TEt39Gu415zpUmK802R6/nD1KzsadlHjcsEuuU9ZC3TIrQbC/G/wFeajMy77fd8yzhEbiNSXFFvVGTcR5F9W+EmDNIZ+I7vGXR/wgysd1yc6jYfu4bqb41ak6YXkZTCKCzw96NqZbsLQG9X6nQ4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8f/wCxuT5JGNqaLQAAAABJRU5ErkJggg==" alt="" />
                <p>Image URL:</p>
                <input
                    value={img_url}
                    onChange={e => this.imageChange(e.target.value)}
                    type="text"
                />
                <p>Product Name:</p>
                <input
                    value={product_name}
                    onChange={e => this.nameChange(e.target.value)}
                    type="text"
                />
                <p>Price:</p>
                <input
                   value={price}
                    onChange={e => this.numberInput(e.target.value)}
                    type="text"
                />
                <div className="Form-buttons">
                    <button className="cancel-submit" onClick={e => this.handleCancel(e)}>cancel</button>
                    {this.state.edit
                      ? <button onClick={(e) => this.handleEdit(e)}>Save Changes</button>
                      :<button className="add-product" onClick={(e) => this.addProduct(e)}>Add to Inventory</button>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Form)
