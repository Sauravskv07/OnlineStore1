Users=require('./models').Users;
var mongoose=require('mongoose');

module.exports.my_cart=(req,res)=>
{
    console.log(req.session.user._id);
    Users.findOne({_id:mongoose.Types.ObjectId(req.session.user._id)})
    .populate('myCart')
    .exec(function (err, user) {
    if (err) return handleError(err)
    console.log('The user has % Product(s)', user.myCart.length);
    res.send(JSON.stringify(user));
  })
}