
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/assets/album')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});
var Images=require('./models').Images;
var mongoose=require('mongoose')
module.exports=[
upload.array('input_images'),
( req,res)=>
{
    if(req.session.user)
    {
        var ownerId=mongoose.Types.ObjectId(req.session.user._id);
        req.files.forEach(file => 
            {
            let image=new Images(
                {
                    owner:ownerId,
                    fileName:file.filename,
                    fileType:file.mimetype,
                    imgDescription:req.body.description,
                });
            image.save((error,result)=>{
                if(error)
                    console.log('unable to save the image');
                else 
                    console.log(result);
                });
            });
        res.redirect('/album');
    }
    else
    {
        res.redirect('/album');
    }
}  
]  

