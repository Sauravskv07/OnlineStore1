var Users=require('./models').Users;
var Products=require('./models').Products;
var Orders=require('./models').Orders;
var multer = require('multer');
const mongoose=require('mongoose');
var upload = multer({ dest: './public/assets/images' })

module.exports.buy_a_product=[
    upload.none(),
    (req,res)=>
    {
        console.log('inside buying the product');
        upload.none();
        var ActiveUser=req.session.user;
        var itemBought=req.params.productId;
        Users.findById({_id:mongoose.Types.ObjectId(ActiveUser._id)},(error,user)=>{
            Products.findById({_id:mongoose.Types.ObjectId(itemBought)},(error,product)=>
                {
                function placeOrder(){
                    if(error)
                        console.log('error');
                    else
                    {
                        let newOrder=new Orders({
                            c_id:user._id,
                            p_id:product._id,
                            order_quantity:req.body.item_quantiy ,
                            delivery_address: req.body.delivery_address,
                        });
                        newOrder.save((error,result)=>
                            {
                                if(error)
                                    console.log('There has been some error while placing the new Order');
                                else    
                                    console.log(result);
                            })
                    }    
                }
                product.buy(JSON.stringify(ActiveUser.userDeliveryAddress),req.body.item_quantity,placeOrder);
                res.redirect('/myCart');
                });
        });
    }];