module.exports = {
 read: (req, res, next) => {
  const db = req.app.get('db');
  db.get_products().then( products => {
   res.send( products );
  })
 }
}