const jwt = require('jsonwebtoken')
const SECRET_KEY ='NOTES_API'



const auth = (req,res,next)=>{
    try {
        let token = req.headers.authorization; //----- accessing the token
        if(token){
             token = req.headers.authorization.split(' ')[1];
            // token = token.split("")[1];
            let user= jwt.verify(token,SECRET_KEY);
            req.userId=user.id;
        }   else{
           return res.status(401).json({message:"Unauthorized User"})//----- erroer if thers no token sent
        }  
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"Unauthorized User"})//----- erroer if token is sent but not matching or invalid
    }
}

module.exports =auth;