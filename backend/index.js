const express =require("express")
const mongoose= require('mongoose')
const cors =require('cors')
// const userRoute = require("./routes/userRoute")
// const noteRoute = require("./routes/notesRoute")
const path =require('path')
const app = express()


const dotenv =require('dotenv')
const { userInfo } = require("os")
const userinfo = require("./controllers/userController")
dotenv.config()

const PORT = process.env.PORT || 3000



//----- mongo connect -----//

mongoose.connect(process.env.MONGO) 
.then(()=> {
        console.log(`mongoconnect`)
})
.catch((err)=>console.log(err))

//----- creating a middleware -----//
// app.use((req,res,next)=>{
//     console.log(`HTTP Mehod - ${req.method} URL - ${req.url}`)
//     next()
// })
app.use(cors())



//----- Converting request body into JSON form ----//
app.use(express.json())

//-----using imported routes-----//
// app.use('/signin',userRoute)
// app.use('/signup',userRoute)
// app.use('/notes',noteRoute)

//----- view engine -----//
const temp_path = path.join(__dirname,'./templates/views')
app.set("view engine", "hbs")
app.set("views",temp_path)

//----- static files
const spath = path.join(__dirname,'./public')
app.use(express.static(spath))
app.use('/', userinfo)
app.use(express.urlencoded({extended:false}))


//----- routes or end points -----//
app.get('/',(req,res)=>{
    res.render('index')
});

//----- signup -----//
app.get('/signup',(req,res)=>{
    res.render('signup')

})

//----- signin -----//

app.get('/signin',(req,res)=>{
    res.render('signin')

})





app.listen(PORT,()=>{
    console.log(`running onn port https://localhost:${PORT}`)
})