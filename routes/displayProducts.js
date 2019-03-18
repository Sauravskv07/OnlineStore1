var Products=require('./models').Products;
var mongoose=require('mongoose');
var multer = require('multer');
var pug=require('pug');

function viewProducts(req,res){
    Products.find({},(err, docs)=> {
        products=docs.slice(0,30);
        req.session.arrayIndex=30;
        res.render('Products.pug',{arrayProducts: products});        
        });
}
module.exports.viewProducts=viewProducts;
