Products=require('./models').Products;
const fs=require('fs');
var multer = require('multer');
var pug=require('pug');
var upload = multer({ dest: '/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/public/assets/images' });
const signup=require('./signUp.js').signup_create_post;
const viewProducts=require('./displayProducts').viewProducts;
function routes(app)
    {
		app.post('/addToCart',upload.single('input_image'),( req,res)=>
        	{
			const filename=req.file.filename;
			console.log(req.file.mimetype);
			var product_image=fs.readFileSync("/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/public/assets/images/"+filename);	
			product_image=new Buffer(product_image,'base64');
			let product=new Products(
				{
					sellerName:req.body.seller_name,
					sellerEmail:req.body.seller_Email,
					itemName:req.body.product_name,
					itemQuantity:req.body.item_Quantity,
					itemDescription:req.body.product_description,
					itemImage: { data: product_image,
					contentType: req.file.mimetype }
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
		app.get('/addToCart',(req,res)=>{
			res.sendFile('/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/addToCart.html');
			});
		app.get('/home',(req,res)=>{
				res.sendFile('/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/home.html');
			});
		app.get('/signup',(req,res)=>{
				res.render('/home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/signUp.pug');
			});
		app.post('/signup',signup);
		app.get('/login',(req,res)=>{
				res.sendFile('home/sauravskv/Desktop/Snippets_to_my_Dream/Makingthecart/views/login.html');
			});
		app.get('/Products',viewProducts);
		app.get('/myCart',(req,res)=>{});
		}
module.exports.routes=routes;