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
	myCart: [{ type: Schema.Types.ObjectId, ref: 'Products' }]
		  
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
	buy(address,callback)
		{
	this.itemQuantity=this.itemQuantity -1;
	this.save();
	console.log('transaction completed and will be delivered at address :',address);
	console.log('final count of the Quantity of items remaining =',this.itemQuantity);
	callback();
		}
	});

const Products=mongoose.model('Products',ProductsSchema);
const Users=mongoose.model('Users',UserSchema);
module.exports.Products=Products;
module.exports.Users=Users;

