const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mailObject = require('../helpers/nodemailer');
const {secret, port}= require('../startups/config');
const _ = require('underscore');
const {emailVerificationObject,forgotPasswordObjects }  = require('../helpers/mailObjects')
 const {text,html,subject} = emailVerificationObject
 const {textF,htmlF,subjectF} = forgotPasswordObjects

async function signUp(req, res){
    const {name,email,password} = req.body;
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6),
        email: Joi.string() .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    })
   const {error,value}= schema.validate({ name,email,password});
   if(error){
      return res.status(400).json({
           error: error.details[0].message
       })
   } 
  const checkUser= await models.User.findOne({where:{email}});
    if(checkUser){
        return  res.status(409).json({error:"Email already exists!"} );
    }
    const salt = await bcryptjs.genSalt(10);
    const hash= await bcryptjs.hash(password, salt);
    const user = { name, email, password: hash }
    const token = jwt.sign({email}, secret,{expiresIn:"30days"})
    const result =  await models.User.create(user)
    res.status(201).json({
        message: "User created successfully",
        result:result
    });
    /**Send mail to registered users */
    const url = `http://127.0.0.1:${port}/user/verify-account/${email}/${token}`
    await mailObject.sendMail(email,url,subject,text,html)
}

async function login(req, res){
    const {email,password}= req.body;
    try{      
     if(!email || !password){
         return res.status(400).json({
            error: "Please ensure that all fields are filled"
         })
     }
    const user = await models.User.findOne({where:{email}});
     if(user === null){
         return  res.status(400).json({error:"Invalid credential "});
     }  
     const validPassword = await bcryptjs.compare(password, user.password); 
     if(!validPassword){return res.status(400).send({error:"Invalid credentials"})}
     const token =  jwt.sign({userId: user.id, email,name:user.name},secret,{expiresIn:'3hours'});
     res.header('auth-token', token).json({message:"Login was successfull",token}) 
    }catch(error){
        res.status(500).json(error)
    }
}

async function verifyEmail(req,res,next){
    try{
    const email = req.params.email;
    const user = await models.User.findOne({where:{email}});
    if(!user){
        return res.status(404).json("No user with this record exist with us")
    }
    const token = req.params.token;
    const decodedToken= jwt.verify(token,secret)
    const response=  await user.update( {status:1},{where:{id:user.id}});
    if(response){
        res.status(202).json({Message:"Your email has been verified",TokenInfo:decodedToken})
    }
    next();
  }
  catch(ex)
  {
    const url = `http://127.0.0.1:${port}/user/resend/${email}`
    res.status(400).json({Message: "Your token has either expired or you have the wrong token. Please generate new token", URL:url})
  }
}

const resendToken= async(req,res)=>{
    email = req.params.email;
    user = await models.User.findOne({where:{email}});
    if(!user)return res.status(404).json({error:"You don't have record with us. Please visit the register Link to create an account"});
    const token = jwt.sign({
        email
      }, secret, { expiresIn: '4hrs'});
    const url = `http://127.0.0.1:${port}/user/verify-account/${email}/${token}`
    const messageInfo = await mailObject.sendMail(email,url);
    if(messageInfo !== undefined){return res.status(200).json({Message:"Please check your mail for the verification link"})}
    else return res.status(500).json({error:"Something must have gone wrong. please try again later",messageInfo})
}


const sendPasswordEmail= async(req,res)=>{
    email = req.body.email;
    user = await models.User.findOne({where:{email}});
    if(!user)return res.status(404).json({error:"You don't have record with us. Please visit the register Link to create an account"});
    const token = jwt.sign({
        email
      }, secret, { expiresIn: '4hrs'});
    const url = `http://127.0.0.1:${port}/user/reset-password/${email}/${token}`
    const messageInfo = await mailObject.sendMail(email,url,subjectF,textF,htmlF);
    if(messageInfo !== undefined){return res.status(200).json({message:"Please check your mail for the verification link"})}
    else return res.status(500).json({error:"Something must have gone wrong. please try again later",messageInfo})
}

async function allUser(req,res){
    try {
        const users = await models.User.findAll({attributes:['email','name','id']});
        if(!users){
            return res.status(404).json({message:"No user is found"})
        }
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error})
    }
}

async function userDetails(req,res){
    const id = req.params.id
    try{
        const user = await models.User.findOne({where:{id}});
        if(!user){
            return res.status(404).json({message:"No user is found with " +id})
        }
        return res.status(200).json(user)
    }catch (error) { res.status(500).json({error})  }
}
module.exports = {signUp,login,verifyEmail,resendToken,allUser,userDetails,sendPasswordEmail}