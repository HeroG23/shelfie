import React from 'react'
import {withRouter} from "react-router-dom"

function Product(props){
  let { id, product_name, price, img_url } = props.item;
  return (
    <div className='Product'>
      <div className='product_img' style={{ backgroundImage: `url(${img_url})` }}></div>
      <div className='product_box'>
        <p className='product_title'>{product_name}</p>
        <p className='product_price'>${price}</p>
      </div>
      <div className='product_button_box'>
        <button onClick={()=> props.deleteProduct(id)}>Delete</button>
        <button onClick={() => props.history.push(`/edit/${props.item.id}`)}>Edit</button>
      </div>
    </div>
  )
}

export default withRouter(Product);
