var Images=require('./models').Images;

module.exports.viewImages=(req,res)=>{
    Images.find({},(err, images)=> {
        res.render('album.pug',{arrayImages: images});        
        });
}
