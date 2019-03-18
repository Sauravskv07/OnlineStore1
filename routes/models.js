var mongoose=require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId, Mixed = mongoose.Schema.Types.Mixed;
var Schema=mongoose.Schema;
var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose, "email");
var Email = mongoose.SchemaTypes.Email;
let UserSchema=Schema(
	{
	userName:String,
	userPassword:String,
	userEmail:Email,
	userDeliveryAddress:{StreetNumber:Number,AddressLine1:String,CityName:String},
	userPhoneNumber:String,
	_id: 
		{ 
		type: ObjectId, 
		default: function() 
			{ 
		  	return new mongoose.Types.ObjectId() 
			} 
		},
	// myCart: [
	// 	{
	// 		_id:{ type: Schema.Types.ObjectId, ref: 'Products' },
	// 		productQuantity:Number
	// 	}
	// ]
		  
	});
let OrderSchema=Schema(
	{
		_id:{
			type: Schema.Types.ObjectId,
			default:function()
			{
				return new mongoose.Types.ObjectId();
			}
		},
		c_id:{type: Schema.Types.ObjectId, ref: 'Users'},
		p_id:{type: Schema.Types.ObjectId, ref: 'Products'},
		order_quantity: Number,
		delivery_address: String,
	}
);

OrderSchema.method(
	{
	changeQuantity(newQuantity)
	{
		this.order_quantity=newQuantity;
		this.save((error,results)=>{
			if(error)
			{console.log("Thee has been some errors while saving");}
			else 
				console.log(results);
		});
	},
	changeAddress(newAddress)
	{
		this.delivery_address=newAddress;
		this.save((error,results)=>{
			if(error)
				console.log('There has been some error while updating the delivery address');
		});
	}
	});


let ProductsSchema=Schema(
	{
	sellerName:String,
	sellerEmail:Email,
	itemName:String,
	itemQuantity:Number,
	itemDescription:String,
	itemImage: String,
	_id: 
		{ 
		type: ObjectId, 
		default: function() 
			{ 
		  	return new mongoose.Types.ObjectId() 
			} 
	  	},
	});
ProductsSchema.method(
	{
	buy(address,quantity,callback)
		{
		this.itemQuantity=this.itemQuantity -quantity;
		if(this.itemQuantity<0){
			callback('We donot have so much in stock');
		}
		else
		{
			this.save((error,results)=>
			{
				if(error)
					console.log("Thee has been some errors while saving");
				else 
					console.log(results);
			});
			callback();
		}
		}
	});

const Products=mongoose.model('Products',ProductsSchema);
const Users=mongoose.model('Users',UserSchema);
const Orders=mongoose.model('Orders',OrderSchema);
module.exports.Products=Products;
module.exports.Users=Users;
module.exports.Orders=Orders;

