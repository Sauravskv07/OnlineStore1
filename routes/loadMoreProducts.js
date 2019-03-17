var Products=require('./models').Products;
var mongoose=require('mongoose');
var multer = require('multer');
var pug=require('pug');

module.exports=(req,res)=>{
    Products.find({},(err, docs)=> 
    {
        var index=req.session.arrayIndex;
        products=docs.slice(index,(index+9));
        if(products.length==0)
        {
            console.log('here');
            res.send([]);
        }
        else
        {
            req.session.arrayIndex=req.session.arrayIndex+9;
            res.send(products);                
        }    
    });
}
