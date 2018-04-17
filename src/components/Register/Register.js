import React from 'react'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import '../Login/login.css'

class Register extends React.Component {

 state = {
  username: '',
  email: '',
  password: '',
  errorMessage: '',
  successMessage: '',
 }

 updateName(value) {
  this.setState({username: value })
 }
 updateEmail(value) {
  this.setState({email: value })
 }
 updatePassword(value) {
  this.setState({password: value })
 }
 registerUser() {
  let { username, email, password } = this.state;
  
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password, salt);

  axios.post('/api/register', { username, email, hash }).then(res => {
   this.setState({ 
    username: '',
    email: '',
    password: '',
    errorMessage: '',
    successMessage: 'User Created'
   })

  }).catch( err => this.setState({successMessage: '', errorMessage: err.response.data.message}))

 }

 render() {
  return (
   <div id="loginBox">
   <h2>register</h2>
    username<input value={this.state.username} type="text" placeholder="name" onChange={(e)=>this.updateName(e.target.value)}/>
    email<input value={this.state.email} type="text" placeholder="email" onChange={(e)=>this.updateEmail(e.target.value)}/>
    password<input value={this.state.password} type="password" placeholder="password" onChange={(e)=>this.updatePassword(e.target.value)}/>
    {/* best way to send passwords? are we going to do sessions next week? */}
    <div id="errorMessage">{this.state.errorMessage}</div>
    <div id="successMessage">{this.state.successMessage}</div>
    <button onClick={()=>this.registerUser()}>register</button>
   </div>
  )
 }
}

export default Register