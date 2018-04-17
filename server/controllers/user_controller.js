const bcrypt = require('bcryptjs')

module.exports = {

 readUser: (req, res, next) => {
  console.log("User: " + req.session.user)
  res.status(200).send( req.session.user );
 },

 authenticate: (req, res, next) => {
   let { username } = req.body;
   const db = req.app.get('db');

   db.get_users().then( users => {
    let temp_user = users.find( user => user.username === username);
    let message = (temp_user) ? "Success" : "";
    if (message) { // if username exists
      res.status(200).send( temp_user.password );
    }
    else { // if username fails
      res.status(403).send( {message: "Username does not exist."})
     }
   })
 },
 login: (req, res, next) => {
  req.session.user = req.body;
  res.status(200).send ( req.session.user )
 },

 register: (req, res, next) => {

   const db = req.app.get('db');
   let {username, email, hash} = req.body; // requested new name, email, password
   console.log(username, email, hash);

   db.get_users().then( users => {

   let temp_username = users.find( user => user.username === username)
   let temp_email =  users.find ( user => user.email === email)

   let user_username = temp_username ? "Already Exists" : "";
   let user_email = temp_email ? "Already Exists" : "";

   if (!user_username) { //username does not exist
    if (!user_email) { //email does not exist
      console.log('here');
      db.create_user(username, email, hash).then ( user => {
      res.status(200).send({ok: false, message: "User Created."});
     })
    }
    else {
    res.status(403).send({ok: false, message: 'Email already exists.'} )
    }
   }
   else {
    res.status(403).send({ok: false, message: 'User already exists.'})
   }
  })
 },

 logout: (req, res, next) => {
  let { user } = req.session;
  user.user = '',
  user.cart = [],
  user.price = 0

  res.status(200).send( user );
 }

}