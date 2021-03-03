const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mailObject = require('../helpers/nodemailer');
const {secret, port}= require('../startups/config');
const _ = require('underscore');
const winston = require('winston');


async function signUp(req, res){
    const {name,email,password} = req.body;
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string().required()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    })
 
   const {error,value}= schema.validate({ name,email,password});
   if(error){
      return res.status(400).json({
           Error: error.details[0].message
       })
   }
    
  const checkUser= await models.User.findOne({where:{email}});

        if(checkUser){
           return  res.status(409).json({
                message: "Email already exists!",
            });
        }
        const salt = await bcryptjs.genSalt(10);
        const hash= await bcryptjs.hash(password, salt);
        const user = {
            name,
            email,
            password: hash
        }


        const token = jwt.sign({email}, secret,{expiresIn:"30days"})

        const result =  await models.User.create(user)
       
        res.status(201).json({
            message: "User created successfully",
            result:result
        });
        /**Send mail to registered users */
        const url = `http://127.0.0.1:${port}/user/verify-account/${email}/${token}`
        await mailObject.sendMail(email,url)
}


async function login(req, res){
    const {email,password}= req.body;
       
    if(!email || !password){
        return res.status(400).json({
            Error: "Please ensure that all fields are filled"
        })
    }

   const user = await models.User.findOne({where:{email}});
       
    if(user === null){
        return  res.status(401).json({
            message: "Invalid credentials!",
        });
    }  
    const validPassword = await bcryptjs.compare(password, user.password); 
    if(!validPassword){
    return res.status(401).json({
        message: "Invalid credentials!",
    })}
    const token =  jwt.sign({userId: user.id, email},secret,{expiresIn:'30days'});
    res.header('auth-token', token).json({Message:"Login success",token}) 
}

async function verifyEmail(req,res,next){
    const email = req.params.email;
    const user = await models.User.findOne({where:{email}});
    if(!user){
        return res.status(404).json({Message:"No user with this record exist with us"})
    }
    
    // const today = new Date();
    // today.setHours(today.getHours() + 4);
    //  console.info(today.getTime())
    try{
    const token = req.params.token;
   const decodedToken= jwt.verify(token,secret)
    const response=  await user.update(
        {status:1},{where:{id:user.id}}
    );
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
    if(!user)return res.status(404).json({Message:"You don't have record with us. Please visit the register Link to create an account"});
    const token = jwt.sign({
        email
      }, secret, { expiresIn: '4hrs'});
    const url = `http://127.0.0.1:${port}/user/verify-account/${email}/${token}`
    const messageInfo = await mailObject.sendMail(email,url);
    if(messageInfo !== undefined){return res.status(200).json({Message:"Please check your mail for the verification link"})}
    else return res.status(500).json({Message:"Something must have gone wrong. please try again later",messageInfo})
}

module.exports = {
    signUp: signUp,
    login: login,
    verifyEmail:verifyEmail,
    resendToken
} 