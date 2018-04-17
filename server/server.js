const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const cart_ctrl = require('./controllers/cart_controller')
const user_ctrl = require('./controllers/user_controller')
const prod_ctrl = require('./controllers/product_controller')
const checkForSession = require('./middleware/checkForSession')
const session = require('express-session')

require('dotenv').config()

app = express();

const port = 3005;

app.use(bodyParser.json());

//setting up sessions
app.use(session({ 
 resave: true,
 saveUninitialized: false,
 secret: process.env.SECRET_SESSION
}))
app.use(checkForSession);

//product page
app.get('/api/products', prod_ctrl.read)

//cart control
app.get('/api/cart', cart_ctrl.read)
app.post('/api/cart', cart_ctrl.add)
app.delete('/api/cart', cart_ctrl.delete)
app.delete('/api/empty', cart_ctrl.empty)

//user control
app.get('/api/user', user_ctrl.readUser)
app.post('/api/register', user_ctrl.register)
app.post('/api/login', user_ctrl.authenticate)
app.get('/api/login', user_ctrl.login)
app.get('/api/logout', user_ctrl.logout)

massive(process.env.CONNECTION_STRING).then(connection => {
 app.set('db', connection); 
 app.listen(port, console.log("shopping on port " + port))
}).catch('something went wrong');




