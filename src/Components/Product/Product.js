import React from 'react'

function Product(props){
    let { id, name, price, img } = props.item;
    return (
      <div className='Product'>
        <img className='product_img'src={img} alt=""/>
        <div className='product_info'>
          <p className='product_name'>{name}</p>
          <p className='product_price'>${price}</p>
        </div>
        <div className='product_button_box'>
          <button onClick={()=> props.deleteProduct(id)}>Delete</button>
          <button onClick={()=> props.editSelect(props.item)}>Edit</button>
        </div>
      </div>
    )
  }

export default Product
