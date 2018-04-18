import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../ducks/reducer'
import axios from 'axios'

import "./product.css"


class Product extends Component {

 state = {
  products: []
 }

 componentDidMount() {

  axios.get('/api/products').then(res => {
   this.setState({ products: res.data })
  })
 }

 addToCart(item) {
   
   this.props.addToCart(item)
 }

 render() {
  let productList = this.state.products.map((item, i) => { 
   return (
   <div className="product" key={item + i}>
      {item.name}<br/>
      {item.price}<br/>
      {item.description}<br/>

      <button onClick={()=>this.addToCart(item)}>add to cart</button>
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
 let { user } = state;
 return {
   user
 }
}

export default connect(mapStateToProps, { addToCart })(Product);

