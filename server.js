const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
var pug=require('pug');
var multer = require('multer');
const fs=require('fs');
var upload = multer({ dest: './public/assets/images' })
const logger=require('morgan');
//const signup=require('./routes/signUp.js').signup_create_post;
const viewProducts=require('./routes/displayProducts').viewProducts;
const app=express();
var Products=require('./routes/models').Products;
var Users=require('./routes/models').Users;
const {body, validationResult}=require('express-validator/check');
const {sanitizeBody}=require('express-validator/filter');
var session=require('express-session');
var signup_create_post=require('./routes/signUp.js').signup_create_post;
var buy_a_product=require('./routes/buyProduct').buy_a_product;
var my_cart=require('./routes/MyCart.js').my_cart;
//app.set('port', 3004);
app.set('views', '/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views') ;// The directory the templates are stored in
app.set('view engine', 'pug');

mongoose.connect('mongodb://localhost/Makingthecart',{ useNewUrlParser: true });

app.use(bodyParser.json());
app.use('/www', express.static(__dirname + '/www'));
app.use('/public', express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(session(
            {   secret:'Mighty King',
                resave:true,
                saveUninitialized:true,
                name:'login',
                cookie:{expire:100000}
            })
        );
app.use((req,res,next)=>{
    if(!req.session.arrayIndex)
        {req.session.arrayIndex=0;}
    next();
})



var user_login_get=[
    (req,res,next)=>
    {
        if(req.session.user)
            {
                res.send('aleady logined');
            }
        else
            {
                next();
            }
    },
    (req,res)=>
    {
        res.render('//home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/login.pug');
    }
];



var user_login_post=[
    upload.none(),

    body('user_name').isLength({min:1}).trim().withMessage('Name field is empty').isAscii('Name of the user must only consist of alphabets'),
    body('user_password').isLength({min:1}).trim().withMessage('Password field is empty'),

    sanitizeBody('user_name').escape().trim(),
    sanitizeBody('user_password').escape().trim(),

    (req, res) => 
    {
        var user_attempt=
        {
            username : req.body.user_name,
            password : req.body.user_password
        }

        Users.findOne({userName:user_attempt.username}).exec((error,user) =>{
            if(error)
                {
                console.log("There has been an error while getting the records");
                res.render("//home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/login.pug",{errors:["There has been an error while getting the records"],userInput:user_attempt});
                }
            else if (!user) 
                {
                    res.render("//home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/login.pug",{errors:["Invalid Username/ Password"],userInput:user_attempt});
                }
            else if (user.userPassword!=user_attempt.password) 
            {
                console.log('INcorrect password');
                res.render("/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/login.pug",{errors:["Invalid User Name/ Password"],userInput:user_attempt});
            } 
            else 
            {
                req.session.user = user;
                res.redirect('/Products');
            }
        });
    }
];


app.post('/addToProducts',upload.single('input_image'),( req,res)=>
{
const filename=req.file.filename;
console.log(req.file.mimetype);
//var product_image=fs.readFileSync("./public/assets/images/"+filename);	
//product_image=new Buffer(product_image,'base64');
//console.log(product_image.toString());
//var product_image= new Buffer(product_image).toString('base64');
//console.log(new Buffer(product_image).toString('base64'));
console.log(req.body.product_name);
let product=new Products(
    {
        sellerName:req.body.seller_name,
        sellerEmail:req.body.seller_Email,
        itemName:req.body.product_name,
        itemQuantity:req.body.item_Quantity,
        itemDescription:req.body.product_description,
        itemImage: filename
    });

product.save((error,results)=>
    {
    if(error)
        {
        console.error(error);
        process.exit(1);
        }
    else
        {
        Products.find({},(err, docs)=> 
            {
            //console.log(docs);
            res.render('Products.pug',{arrayProducts: docs});
            });
        }	
    });
});
app.get('/addToProducts',(req,res)=>{
res.sendFile('/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/addToProducts.html');
});
app.get('/home',(req,res)=>{
    res.sendFile('/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/home.html');
});
app.get('/signup',(req,res)=>{
    res.render('/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/signUp.pug');
});
app.post('/signup',signup_create_post);
app.get('/login',user_login_get);
app.post('/login',user_login_post);
app.get('/Products',viewProducts);
app.get('/myCart',my_cart);
app.post('/BuyAProduct',buy_a_product);
//app.post('/BuyAProduct',(req,res)=>{console.log(req);});
app.listen(3000);

