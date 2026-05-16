const {prisma }= require('../utils/dbConnector');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.adminRegister= async (req,res)=>{
    const {name,role,email,password} = req.body
    const hashPassword = await bcrypt.hash(password,10)//10 salts of hashing
    try{
    const UserData  = await prisma.User.create({
        data:{
            name,
            email,
            role,
            password:hashPassword
        }
    });
    res.status(201).send({message:'created admin',status:true,data:UserData})
    }catch(err){
       res.status(400).send({message:err.message,status:false})
    }  
}
exports.adminLogin= async (req,res)=>{
    const {email,password,role} = req.body;
    console.log(req.body)
    try{
    const validUser = await prisma.User.findFirst({where:{email:email,role:"admin"}});
    if(!validUser) return  res.status(200).send({message:`User Does'nt exist`});
    const validPass =await bcrypt.compare(password,validUser.password);
    if(!validPass) return res.status(200).send({message:`Wrong Password`});
    const token = jwt.sign({id:validUser.id,email:email,role:"admin"},
        process.env.JWT_SECRET_TOKEN,{expiresIn:'1h'}
    )
    res.status(200).send({message:`admin Login Successful `,data:validUser,token:token});
    }catch(err){ 
        console.log(err)
        res.status(400).send({message:err.message});
    }
}
exports.userLogin = async(req,res)=>{
   const {name,email,password,role} = req.body;
   console.log(req.body)
    try{
    const validUser = await prisma.User.findFirst({where:{email:email,role:"user"}});
    if(!validUser) res.status(200).send({message:`User Does'nt exist`});
    const validPass =await bcrypt.compare(password,validUser.password);
    if(!validPass) res.status(200).send({message:`Wrong Password`});
    const token = jwt.sign({id:validUser.id,email:email,role:"admin"},
        process.env.JWT_SECRET_TOKEN,{expiresIn:'1h'}
    )
    res.status(200).send({message:`user Login Successful`,data:validUser,token:token});
    }catch(err){ 
        console.log(err)
        res.status(400).send({message:err.message});
    }
}
exports.userRegister = async (req,res)=>{
     const {name,role,email,password} = req.body
    const hashPassword = await bcrypt.hash(password,10)//10 salts of hashing
    try{
    const UserData  = await prisma.User.create({
        data:{
            name,
            role,
            email,
            password:hashPassword
        }
    });
    res.status(201).send({message:'created user',status:true,data:UserData})
    }catch(err){
       res.status(200).send({message:err,status:false})
    }  
    
}
exports.adminChangePass = async (req,res)=>{
    const adminId = req.params.id;
    const {newPass} = req.body;
    console.log(newPass);
    try{
        const updateData = await prisma.User.update({
         where:{id:adminId},
         data:{pass:newPass}
        })
         res.status(201).send({status:true,message:updateData});
    }catch(err){
         res.status(400).send({status:false,message:err});
    }
}