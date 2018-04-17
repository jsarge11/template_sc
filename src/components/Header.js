import React, { Component } from 'react'
import './header.css'
import axios from 'axios'
import { logOut, updateUser, emptyCart } from '../ducks/reducer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const cartimg = "https://images.vexels.com/media/users/3/141186/isolated/preview/431ad815c9a8402ebdf354c82923c2a5-shopping-cart-6-by-vexels.png" ;

class Header extends Component {
  
  viewCart() {
    document.getElementById("cartModal").style.display = "block";
  }

  closeSpan() {
    document.getElementById("cartModal").style.display = "none";
  }

  logOut() {
    axios.get('/api/logout').then (res => {
      this.props.logOut();
    })
    axios.get('/api/user').then (res => {
      this.props.updateUser(res.data.user);
    })
  }

  removeProduct(id) {
    axios.delete('/api/cart?=' + id).then( res => {
     this.setState({ 
       cart: res.data,
       itemsInCart: res.data.length
      })
    })
  }

  emptyCart() {
    axios.delete('/api/empty').then( res => {
      this.props.emptyCart();
    })
  }
 
  render() {
  let cartItems = this.props.cart.map((item, i) => {
    return (
      <div className="itemsInCart" key={item + i}>
        {item[0].name}<br/>
        {item[0].price}<br/>
        {item[0].description}<br/>
        <button onClick={()=>this.removeProduct(item.product_id)}>delete</button>
      </div>
    )
  })
  
  return (
   <div id="headerWrapper">
    <div id="logoWrapper">
    <Link to='/'>logo</Link>
    </div>
    <div id="shoppingCartWrapper">
    {this.props.user ? <div>{this.props.user}</div> : <div>Not logged in</div>}
    {this.props.cart.length}
      <div onClick={()=>this.viewCart()}id="cartimg"><img src={cartimg} height="50px" alt="cart"/>
      </div>
    
      <div>
          <Link to='/register'><button>register</button></Link>
          {!this.props.user ? <Link to='/login'><button>login</button></Link> : <button onClick={()=>this.logOut()}>logout</button>}
      </div>
          <button onClick={()=>this.emptyCart()}>empty cart</button>

    </div>
    <div id="cartModal">
      <div id="cartModalContent">
        <span id="close" onClick={()=>this.closeSpan()}>&times;</span>
            {cartItems}
            <button onClick={()=>this.checkout()}>checkout</button>
            {this.props.user ? 
            <div> Welcome, {this.props.user}! </div> : 
            <div id="alert"> Please login to checkout.
            <Link to='/register'> <button onClick={()=>this.closeSpan()}>register</button></Link>
            {!this.props.user ? 
              <Link to='/login'><button onClick={()=>this.closeSpan()}>login</button></Link> : 
              <Link to='/' onClick={()=>this.logOut()}><button>logout</button></Link>}</div>
            }
      
      <br/> 
      </div>
    </div>
   </div>
  )
 }
}
function mapStateToProps(state) {
 let { user, products, cart } = state;
 return {
  user,
  products,
  cart

 }
}

export default connect(mapStateToProps, { logOut, updateUser, emptyCart })(Header);