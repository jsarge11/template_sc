import React from 'react'
import Header from './components/Header'
import Product from './components/Product/Product'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { Switch, Route } from 'react-router-dom'

export default (
 <div> 
  <Header />
   <Switch>
    <Route exact path='/' component={Product} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
   </Switch>
 
 </div>
)