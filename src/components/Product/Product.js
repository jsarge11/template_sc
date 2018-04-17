import React, { Component } from 'react'
import Header from '../Header'
import { connect } from 'react-redux'
import { getProducts, addProduct } from '../../ducks/reducer'
import axios from 'axios'

import "./product.css"


class Product extends Component {

 state = {
  username: '',
 }

 componentDidMount() {
  axios.get('/api/cart').then(res => {
   this.props.addProduct( res.data );
  })
  axios.get('/api/products').then(res => {
   this.props.getProducts(res.data)
  })
 }

 addToCart(id) {
  axios.post('/api/cart?id=' + id).then( res => {
   this.props.addProduct(res.data)
  })
 }

 render() {
  let productList = this.props.products.map((item, i) => { 
   return (
   <div className="product" key={item + i}>
      {item.name}<br/>
      {item.price}<br/>
      {item.description}<br/>

      <button onClick={()=>this.addToCart(item.product_id)}>add to cart</button>
   </div>
   )
  })
  return (

   <div>
    <h2>Products</h2>
   {productList}
   </div>
  )
 }
}
function mapStateToProps(state) {
 let { products } = state;

 return {
  products
 }
}

export default connect(mapStateToProps, {getProducts, addProduct })(Product);

