var session=require('express-session');
var Products=require('./models').Products;
var Users=require('./models').Users;
module.exports.buy_a_product=
(req,res)=>
{
    var ActiveUser=req.session.user;
    Users.findOneAndUpdate(
        {userId:ObjectId(ActiveUser.userId)},
        {$push:ObjectId(req.body.itemBought)},
        function (error, success) 
        {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
 }