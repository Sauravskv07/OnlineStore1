var Users=require('./models').Users;
var Products=require('./models').Products;
const mongoose=require('mongoose');

module.exports.buy_a_product=[
    
    (req,res)=>
    {
        var ActiveUser=req.session.user;
        console.log(ActiveUser._id);
        var itemBought=req.params.productId;
        console.log(itemBought);
        Users.findById({_id:mongoose.Types.ObjectId(ActiveUser._id)},(error,doc)=>{console.log('doc  ',doc)});
        Users.findOneAndUpdate(
            {_id:mongoose.Types.ObjectId(ActiveUser._id)},
            {$push:{myCart:mongoose.Types.ObjectId(itemBought)}},
            function (error, success) 
            {
                if (error) {
                    console.log('no such user found');
                    console.log(error);
                }
                else {
                    console.log('readed here it means success')
                    console.log(success);
                }
                Products.findById({_id:mongoose.Types.ObjectId(itemBought)},(error,doc)=>
                {
                    doc.buy(JSON.stringify(ActiveUser.userDeliveryAddress),()=>
                    {
                            res.redirect('/myCart');
                    });
                });


            });
    }];