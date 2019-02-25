var Products=require('./models').Products;
var mongoose=require('mongoose');
var multer = require('multer');
var pug=require('pug');

function viewProducts(req,res){
    Products.find({},(err, docs)=> {
        products=docs.slice(req.session.arrayIndex,(req.session.arrayIndex+9));
        //console.log(docs);
        if(req.session.arrayIndex===0)
        {
            req.session.arrayIndex=req.session.arrayIndex+9;
            res.render('Products.pug',{arrayProducts: products});
        }
        else
        {
            if(products.length==0)
            {
                console.log('here');
                res.send();
            }
            else
            {
                req.session.arrayIndex=req.session.arrayIndex+9;
                res.send(products);                
            }

            
        }

        });
}
module.exports.viewProducts=viewProducts;
