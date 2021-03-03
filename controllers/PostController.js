const Validator = require('fastest-validator');
const models = require('../models');
const Joi = require('joi')

async function save(req, res){
    const {title,content, categoryId} =req.body;
    const post = {
        title, content, categoryId,userId: req.userData.userId
    }
    
    const schema = Joi.object({
        content:Joi.string().min(10).required(),
        title:Joi.string().required().min(4).max(225),
        categoryId:Joi.number().required()
    })


   let cat_id=  await models.Category.findByPk(categoryId) ; 
    
    if(!cat_id){
      return  res.status(400).json({
            Error:"Invalid category ID provided"
        })
    }
    let postData = new models.Post(post);
    await postData.save();
    res.status(201).json({
    message: "Post created successfully",
    Data: {content,title},
   })
    
}

async function show(req, res){
    const id = req.params.id||req.body.id;

   const postID=  await models.Post.findOne({
    where: {id}, include: ['category']
  })
        if(postID){
            post = postID.get();
            res.status(200).json(post);
        }else{
            res.status(404).json({
                message: "Post not found!"
            }) 
        }
}


async function showCat(req, res){
    const id = req.params.id||req.body.id;

   const category=  await models.Category.findOne({
    where: {id}, include: ['posts']
  })
        if(category){
            cat = category.get();
            res.status(200).json(cat);
        }else{
            res.status(404).json({
                message: "Post not found!"
            }) 
        }
}


async function index(req, res){
  const posts= await  models.Post.findAll()
  console.log(posts)
        if(posts.length !==0){
          return  res.status(200).json(posts)
        }else{
            return res.json('No post is found');
     }
}

async function getPostByCat(req, res){
     const cat_id = await models.Post.findAll({where:{categoryId:req.params.id}});
     if(cat_id.length !==0){
       return  res.status(200).json(cat_id)
     }else{
         return res.status(404).json({
             Message: "No post found for the category id provided"
         })
     }
}

function update(req, res){
    const id = req.params.id;
    const updatedPost = {
        title: req.body.title, 
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    }
    
    const userId = 1;

    const schema = {
        title: {type:"string", optional: false, max: "100"},
        content: {type: "string", optional: false, max: "500"},
        categoryId: {type: "number", optional: false}
    }
    
    const v = new Validator();
    const validationResponse = v.validate(updatedPost, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }

    models.Post.update(updatedPost, {where: {id:id, userId: userId}}).then(result => {
        res.status(200).json({
            message: "Post updated successfully",
            post: updatedPost
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    })
}


function destroy(req, res){
    const id = req.params.id;
    const userId = req.userData.userId;

    models.Post.destroy({where:{id:id, userId:userId}}).then(result => {
        res.status(200).json({
            message: "Post deleted successfully"
        });
    }).catch(error => {
        res.status(200).json({
            message: "Something went wrong",
            error: error
        });
    });
}

 
module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy,
    getPostByCat:getPostByCat,
    showCat
}
