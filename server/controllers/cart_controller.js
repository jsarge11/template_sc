module.exports = {
 add: (req, res, next) => {
  const db = req.app.get('db');
  db.get_one_product(req.query.id).then( product => {
   req.session.user.cart.push( product );
   res.status(200).send( req.session.user.cart );
  })
 },

 read: (req, res, next) => {
  if (req.session.user.cart) res.status(200).send (req.session.user.cart );
 },

 delete: (req, res, next) => {
  let { cart } = req.session.user;
  let { id } = req.query;

  let index = cart.indexOf(product => product.product_id === id);
  cart.splice(index, 1);
  res.status(200).send( cart );
 },
 
 empty: (req, res, next) => {
  req.session.user.cart = [];
  res.status(200).send (req.session.user.cart);

 }
}