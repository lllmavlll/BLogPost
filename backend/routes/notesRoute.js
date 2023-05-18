const express =require('express');
const noteModel = require("../models/note")
const path =require('path')
const { getNote, createNote, deleteNote, updateNote } = require('../controllers/noteController');
const  auth = require('../midddlewaares/auth') //----- middlewear import
const noteRoute = express.Router();

//----- static files
const spath = path.join(__dirname,'../public')
noteRoute.use(express.static(spath))


//----- Only authenticated users acn access these end points

noteRoute.get('/', auth, getNote)

noteRoute.post('/', auth, createNote)

noteRoute.delete('/:id', auth, deleteNote) 

noteRoute.put('/:id', auth, updateNote)

/////////////////////////

noteRoute.get('/newpost',(req,res)=>{
    res.render('newpost',{newNote:new noteModel })
})
noteRoute.get('/newpost/:id',async(req,res)=>{
    const newNote = await noteModel.findById(req.params.id) //---error
    if(newNote== null) res.redirect('home')
  return  res.render('show',{newNote:newNote})
})

noteRoute.post('/newpost',async(req,res)=>{

    const {title, description, }=req.body;
    
    let newNote = new noteModel({
        title:title,
        description:description,
        // createdAt: new Date()  
     
    })
    try {
        const cNotes=await noteModel.findOne({title:title})
        if(cNotes){
         return   res.json({message:"title alredy exists"})
        }
       
            newNote = await newNote.save();
            res.redirect(`newpost/${newNote.id}`)
        // console.log(newNote)
    } catch (error) {
        // console.log(error)
        res.render(`newpost`,{newNote:newNote})
    }
})

module.exports= noteRoute