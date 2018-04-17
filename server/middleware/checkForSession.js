module.exports = function(req,res,next) {
 if (!req.session.user) {
  req.session.user = {
   user: '',
   cart: [],
   price: 0
  }
 }

 next();
}