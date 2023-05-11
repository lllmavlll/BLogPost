const userModel =require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY ="NOTES_API"


const signup =async(req,res)=>{
   
    const password =req.body.password
    const conpassword =req.body.confirmpassword
    const username =req.body.username
    const email =req.body.email
    try {
       
        //----- matching password
        if(password===conpassword){
             //--- checking for existing User -----//
            //  const 
            // if(existingUser){
            //     return  res.status(400).send('<h1>user already exist</h1>')
            // }

            const hashedPassword =  await bcrypt.hash(password,10) //----- hashing password
            const userResult = new userModel({
                username:username,
                password:hashedPassword,
                confirmpassword:conpassword,
                email:email,
            })
        const newUser =await userResult.save()

       
        
        
        //----- creating JWT (jasonWebToken) -----//
        const token = jwt.sign({email:userResult.email, id : userResult._id},SECRET_KEY)
        
        //----- responce -----//
        return res.status(201).render("home")
        
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
          return   res.status(404).send("user not found")
        }
    
        
        //----- matching Cridentials -----//
        const matchPassword = await  bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
         return   res.status(400).send('incorrect password ')
            
        }
      
        //----- creating JWT (jasonWebToken) -----//
        const token = jwt.sign({email : existingUser.email, id : existingUser._id},SECRET_KEY)
        // res.status(200).json({user:existingUser, token:token})
       return res.status(200).render('home')




    } catch (error) {
     return   res.status(500).json({message:"something went wrong"})
    }

}






module.exports ={signin , signup}