const userModel =require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY ="NOTES_API"


const signup =async(req,res)=>{
   
    const password =req.body.password
    const conpassword =req.body.confirmpassword
    const username =req.body.username
    const email =req.body.email

     //----- checking for existing user -----//
     userModel.findOne({email:email})
    try {
       
       if(email){
        return res.status(422).json({messege:"user exist"})
       }
        //----- matching password
        if(password===conpassword){
        
            const hashedPassword =  await bcrypt.hash(password,10) //----- hashing password
            const hashedConPassword =  await bcrypt.hash(conpassword,10) //----- hashing confirm  password
            const userResult = new userModel({
                username:username,
                password:hashedPassword,
                confirmpassword:hashedConPassword,
                email:email,
            })
        await userResult.save()
        
        //----- creating JWT (jasonWebToken) -----//
        const token = jwt.sign({email:userResult.email, id : userResult._id},SECRET_KEY)
        console.log(token)
        
        //----- responce -----//
        return res.status(201).redirect("signin")
        }
        
    } catch (error) {
      return  res.status(400).send(error)
    }
}

const signin = async (req,res)=>{

    const {email, password} = req.body
    try {

        //----- checking for existence of the user -----//
        const existingUser = await userModel.findOne({ email : email })
        if(!existingUser){
            // return res.status(404).json({ message:"user not found"})
          return   res.status(404).send("<h1>user not found</h1>")
        }
    
        
        //----- matching Cridentials -----//
        const matchPassword = await  bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
         return   res.status(400).send('<h1>incorrect password</h1> ')
            
        }
      
        //----- creating JWT (jasonWebToken) -----//
        const token = jwt.sign({email : existingUser.email, id : existingUser._id},SECRET_KEY)
        // res.status(200).json({user:existingUser, token:token})
       return res.status(200).redirect('home')




    } catch (error) {
     return   res.status(500).json({message:"something went wrong"})
    }

}






module.exports ={signin , signup}