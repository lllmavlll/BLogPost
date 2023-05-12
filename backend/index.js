const express =require("express")
const mongoose= require('mongoose')
const cors =require('cors')
const path =require('path')
const { signup, signin } = require('./controllers/userController');
const noteRoute = require("./routes/notesRoute")
const app = express()


const dotenv =require('dotenv')
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

//----- view engine -----//
const temp_path = path.join(__dirname,'./templates/views')
app.set("view engine","ejs")
app.set("views",temp_path)

//----- static files
const spath = path.join(__dirname,'./public')
app.use(express.static(spath))

//----- getting data from the form/htmlpage -----//
app.use(express.urlencoded({extended:false}))

//----- routes or end points -----//
app.get('/',(req,res)=>{
    res.render('index')
});

//----- signup -----//
app.get('/signup',(req,res)=>{
    res.render('signup')

})
app.post('/signup',signup)

//----- signin -----//

app.get('/signin',(req,res)=>{
    res.render('signin')

})
app.post('/signin',signin)

//----- home page after sign in -----//
app.get('/home', (req,res)=>{
    const notes =[{
        title:"testing0",
        date:new Date(),
        description:"test"


    },{
        title:"testing1",
        date: new Date(),
        description:"test desvcvcvcvcvcvcvcvcvcvcvcvcvcvcvcvcvdfdf sdg sdg sdgsd gsdg sdg test desvcvcvcvcvcvcvcvcvcvcvcvcvcvcvcvcvdfdf sdg sdg sdgsd gsdg sdg "


    },{
        title:"testing2",
        date: new Date(),
        description:"test desc"


    },{
        title:"testing2",
        date: new Date(),
        description:"test desc"


    }]
    res.render('home',{notes:notes})
});

//----- Crud for notes -----//
app.use('/home',noteRoute)


app.listen(PORT,()=>{
    console.log(`running onn port https://localhost:${PORT}`)
})