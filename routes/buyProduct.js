var Users=require('./models').Users;
const mongoose=require('mongoose');

module.exports.buy_a_product=[
    
    (req,res)=>
    {
        var ActiveUser=req.session.user;
        var itemBought=req.body.itemBought;
        Users.findOneAndUpdate(
            {userId:mongoose.Types.ObjectId(ActiveUser.userId)},
            {$push:{myCart:mongoose.Types.ObjectId(itemBought)}},
            function (error, success) 
            {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            });
    }];