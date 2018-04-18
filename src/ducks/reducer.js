let initialState = {
 user: '',
 cart: [],
 cartid: 1
}

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const EMPTY_CART = 'EMPTY_CART'
const UPDATE_USER= 'UPDATE_USER';
const LOGOUT = 'LOGOUT';


export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  }
}
export function logOut() {
  return {
    type: LOGOUT,
    payload: '',
  }
}

export function addToCart(product) {
  return {
    type: ADD_TO_CART,
    payload: product
  }
}
export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    payload: id
  }
}
export function emptyCart() {
  return {
    type: EMPTY_CART,
    payload: []
  }
}

//reducer with a switch statement and actions

function reducer(state = initialState, action) {

 switch(action.type) {
  case (UPDATE_USER) :
    return Object.assign({}, state, {user: action.payload })
    
  case (LOGOUT) :
    return Object.assign({}, state, {user: action.payload});

  case (ADD_TO_CART) :
    action.payload.cartid = null;
    let copy = Object.assign({}, action.payload);
    copy.cartid = state.cartid;
    state.cartid++;

    return Object.assign({}, state, {cart: [...state.cart, copy]})

  case (REMOVE_FROM_CART) :
    return Object.assign({}, state, {cart: state.cart.filter(item=>item.cartid !== action.payload.cartid)})

  case (EMPTY_CART) :
    return Object.assign({}, state, {cart: action.payload})
  
  default: 
   return state;
 }
}

export default reducer