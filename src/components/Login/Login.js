import React from 'react'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import { Redirect } from 'react-router-dom'
import { updateUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import './login.css'

class Login extends React.Component {

 state = {
  username: '',
  password: '',
  successMessage: '',
  errorMessage: '',
  isLoggedIn: false
 }

 updateName(value) {
  this.setState({username: value })
 }
 updatePassword(value) {
  this.setState({password: value })
 }
 loginUser() {
  let { username, password } = this.state;

    let activeUser = username;

    axios.post('/api/login', { username }).then(res => {
     let canLogin = bcrypt.compareSync(password, res.data);

     this.setState({ 
      username: '',
      password: '',
     })
    
    if (canLogin) {
      axios.get('/api/login', { activeUser }).then( res => {
        this.props.updateUser(activeUser);
        this.setState({ isLoggedIn: true })
      })
    }
    else {
      this.setState({ 
        successMessage: '',
        errorMessage: 'Password does not match.'
      })
    }

  }).catch( err => this.setState({successMessage: '', errorMessage: err.response.data.message}))

 }
 render() {
   if (this.state.isLoggedIn) {
     return (
       <Redirect push to='/'/>
     )
   }
  return (
   <div id="loginBox">
   {this.props.user}
   <h2>login</h2>
    username<input value={this.state.username} type="text" placeholder="name" onChange={(e)=>this.updateName(e.target.value)}/>
    password<input value={this.state.password} type="password" placeholder="name" onChange={(e)=>this.updatePassword(e.target.value)}/>
    <div id="errorMessage">{this.state.errorMessage}</div>

    <button onClick={()=>this.loginUser()}>login</button>
   </div>
  )
 }
}
function mapStateToProps(state) {
  let { user } = state;
  return {
    user,
  }
}
export default connect(mapStateToProps, {updateUser})(Login)