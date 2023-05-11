// const express =require("express")
// const userModel =require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')
// const SECRET_KEY ="NOTES_API"
// const userinfo = express.Router()

// userinfo.post('/signup', async(req,res)=>{

    
//     // const  { username, password, email }= req.body;
//     const username= req.body.username;
//     const password= req.body.password;
//     const email= req.body.email;
//     try {
//         //--- checking for existing User -----//
//         const existingUser = await userModel.findOne({ username : username })
//         if(existingUser){
//             return res.status(400).json({ message:"User already exist"})
//         }

//          //----- Hashing passward -----// 
//         const hashedPassword =  await bcrypt.hash(password,10)   //----- AKA salt -----//

//         //----- Creating New User -----//
//         const userResult = await userModel.create({
//             email:email,
//             password:hashedPassword,
//             username:username
//         })

//           //----- creating JWT (jasonWebToken) -----//
         
//           const token = jwt.sign({email:userResult.email, id : userResult._id},SECRET_KEY)

//         //----- responce -----//
//         res.status(201).json({user:userResult, token:token})



//     } catch (error) {
//         res.status(500).json({message:"something went wrong ",error})

//     }

// })

// userinfo.post('/signin', async(req,res)=>{


//     // const {username, password} = req.body
//     const email= req.body.email;
//     const password= req.body.password;
//     try {

       
//         //----- checking for existence of the user -----//
//         const existingUser = await userModel.findOne({ email : email })
//         if(!existingUser){
//             return res.status(404).json({ message:"user not found"})
//         }
//         //----- matching Cridentials -----//
//         const matchPassword = await  bcrypt.compare(password,existingUser.password)
//         if(!matchPassword){
//           return  res.status(400).json({message:"password is wrong"})
//         }
//         else{
//         res.render('home')

//         }

//         //----- creating JWT (jasonWebToken) -----//
//         const token = jwt.sign({email : existingUser.email, id : existingUser._id},SECRET_KEY)
//         res.status(200).json({user:existingUser, token:token})


//     } catch (error) {
    
//         res.status(500).json({message:"something went wrong "})
        
//     }


// })

// module.exports = userinfo
const userModel =require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY ="NOTES_API"


const signup =async(req,res)=>{
   
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


    } catch (error) {
      return  res.status(500).json({message:"something went wrong"})
    }
}

const signin = async (req,res)=>{

    const {email, password} = req.body
    try {

        //----- checking for existence of the user -----//
        const existingUser = await userModel.findOne({ email : email })
        if(!existingUser){
            // return res.status(404).json({ message:"user not found"})
             res.status(404).send("user not found")
        }
    
        
        //----- matching Cridentials -----//
        const matchPassword = await  bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            res.status(400).send('incorrect password ')
            
        }
        else{
         res.render('home')

        }

        //----- creating JWT (jasonWebToken) -----//
        const token = jwt.sign({email : existingUser.email, id : existingUser._id},SECRET_KEY)
        res.status(200).json({user:existingUser, token:token})




    } catch (error) {
     return   res.status(500).json({message:"something went wrong"})
    }

}






module.exports ={signin , signup}