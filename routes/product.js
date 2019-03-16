var Products=require('./models').Products;
const mongoose=require('mongoose');
module.exports.indProduct=(req,res)=>
    {
        var id=req.params.productId
        console.log(id);
        Products.findById({_id:mongoose.Types.ObjectId(id)},(error,doc)=>
        {
            res.render('Product.pug',{product:doc});
        });
    }