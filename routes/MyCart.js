Users=require('./models').Users;
Products=require('./models').Products;
Orders=require('./models').Orders;
var mongoose=require('mongoose');

module.exports.my_cart=(req,res)=>
{
    console.log(req.session.user._id);
    // Users.findOne({_id:mongoose.Types.ObjectId(req.session.user._id)},(error,user)=>
    // {
    //   var arrayofProducts=[];
    //   var arrayofProductObj=user.myCart;
    //   console.log('array of products id',arrayofProductObj);
    //   arrayofProductObj.forEach(element => 
    //   {
    //     console.log(element);
    //     Products.findById({_id:mongoose.Types.ObjectId(element._id)},(error,product)=>
    //       {
    //           console.log(product);
    //           arrayofProducts.push(product.toObject());
    //           console.log('inside loop',arrayofProducts);
    //       });
    //   });
    //   console.log('here');
    //   console.log('array fo products',arrayofProducts);
    //   console.log('here also');
    //   res.send(arrayofProducts);
    Orders.find().populate('p_id');
    Orders.find({c_id:mongoose.Types.ObjectId(req.session.user._id)}, function (err, orders) {
      var opts = [{ path: 'p_id'}];
      var promise = User.populate(users, opts);
      promise.then(
        console.log('done populating orders')
      ).end(
        res.render('myCart.pug',{arrayOfOrders:orders})
      );
    })  
  }

    //.populate('myCart._id')
    //.exec(function (err, user) {
    //if (err) {console.log(err);}
    //console.log('The user has % Product(s)', user.myCart.length);
    //console.log(user);
    //res.render('myCart.pug',{Me:user});
