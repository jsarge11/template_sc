let initialState = {
 user: '',
 products: [],
 cart: []
}

const GET_PRODUCTS = 'GET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const EMPTY_CART = 'EMPTY_CART';
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
    payload: initialState,
  }
}

export function getProducts(products) {
  return {
    type: GET_PRODUCTS,
    payload: products
  }
}

export function addProduct(product) {
  console.log('adding ' + product);
  return {
    type: ADD_PRODUCT,
    payload: product
  }
}
export function emptyCart() {
  return {
    type: EMPTY_CART,
    payload: initialState
  }
}

//reducer with a switch statement and actions

function reducer(state = initialState, action) {

 switch(action.type) {
  case (UPDATE_USER) :
    return Object.assign({}, state, {user: action.payload })
  case (LOGOUT) :
    return Object.assign({}, state, {user: ''});
  case (GET_PRODUCTS) :
    return Object.assign({}, state, {products: action.payload})
  case (ADD_PRODUCT) :
    return Object.assign({}, state, {cart: action.payload})
  case (EMPTY_CART) :
    return Object.assign({}, state, {cart: []});
  default: 
   return state;
 }
}

export default reducer