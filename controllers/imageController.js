const fs = require('fs');
const winston = require('winston');
const models = require('../models')
async function upload(req, res){
    const userID = req.userData.userId;
    const userInfo = await models.User.findOne({where:{id:userID}});
    let imagePath = userInfo.imageURL;
    if(req.file == undefined){
        res.status(400).json({Message:"The image field is required"});
    }
    //unlink previously uploaded image from the fle system
    if(imagePath !=='pictures/noimage.png'){
        fs.unlink(`uploads/${imagePath}`, function(err) {
            if(err && err.code == 'ENOENT') {
                // file doens't exist
                winston.info("File doesn't exist, won't remove it.");
            } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                winston.error("Error occurred while trying to remove file");
            } else {
                winston.info(`removed`);
            }
        });
    }
    if(req.file.filename){
      const url =  'pictures/'+req.file.filename
      const response= await models.User.update({imageURL:url},{where:{id:userID}})
      if(response){
          res.status(202).json({
              message: "Image uploaded successfully",
              url
          });
      }
    }else{
        res.status(500).json({
            message: "Something went wrong!"
        });
    }
}

module.exports = {
    upload: upload
}