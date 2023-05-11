const express =require("express")
const mongoose= require('mongoose')
const cors =require('cors')
const userRoute = require("./routes/userRoute")
const noteRoute = require("./routes/notesRoute")
const path =require('path')
const app = express()


const dotenv =require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 3000

//----- static files
const spath = path.join(__dirname,'./public')
app.use(express.static(spath))

//----- mongo connect -----//

mongoose.connect(process.env.MONGO) 
.then(()=> {
    app.listen(PORT,()=>{
        console.log(`running onn port https://localhost:${PORT}`)
    })
})
.catch((err)=>console.log(err))


// app.listen(PORT,()=>{
//     console.log(`running onn port https://localhost:${PORT}`)
// })

//----- creating a middleware -----//
// app.use((req,res,next)=>{
//     console.log(`HTTP Mehod - ${req.method} URL - ${req.url}`)
//     next()
// })
app.use(cors())



//----- Converting request body into JSON form ----//
app.use(express.json())

//-----using imported routes-----//
app.use('/users',userRoute)
app.use('/notes',noteRoute)

//----- view engine -----//
const temp_path = path.join(__dirname,'./templates/views')
app.set("view engine", "hbs")
app.set("views",temp_path)


app.get('/',(req,res)=>{
    // res.send("yes! its working")
    res.render('index')
});



