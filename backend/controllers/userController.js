const express =require("express")
const userModel =require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY =process.env.SECRET_KEY
const userinfo = express.Router()

userinfo.post('/signUp', async(req,res)=>{
    
    const  { username, password, email }= req.body;
    try {
        //--- checking for existing User -----//
        const existingUser = await userModel.findOne({ email : email })
        if(existingUser){
            return res.status(400).json({ message:"User already exist"})
        }

         //----- Hashing passward -----// 
        const hashedPassword =  await bcrypt.hash(password,10)   //----- AKA salt -----//

        //----- Creating New User -----//
        const userResult = await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        })

        //----- creating JWT (jasonWebToken) -----//
        const token = jwt.sign({email:userResult.email, id : userResult._id},SECRET_KEY)

        //----- responce -----//
        res.status(201).json({user:userResult, token:token})
        res.render('home')



    } catch (error) {
        res.status(500).json({message:"something went wrong "})
    }

})

userinfo.post('/signIn', async(req,res)=>{

    const {username, password} = req.body
    try {

        //----- checking for existence of the user -----//
        const existingUser = await userModel.findOne({ username : username })
        if(!existingUser){
            return res.status(404).json({ message:"user not found"})
        }
        
        //----- matching Cridentials -----//
        const matchPassword = await  bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            res.status(400).json({message:"password is wrong"})
        }

        //----- creating JWT (jasonWebToken) -----//
        const token = jwt.sign({email : existingUser.email, id : existingUser._id},SECRET_KEY)
        res.status(200).json({user:existingUser, token:token})
        res.render('home')




    } catch (error) {
        res.status(500).json({message:"something went wrong just now"})
        
    }

})








module.exports = userinfo