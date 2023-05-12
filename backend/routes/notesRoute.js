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
noteRoute.get('/:id',async(req,res)=>{
    const newNote =  noteModel.findById(req.params.id)
    // if(newNote== null) res.redirect('home')
    res.render('show',{newNote:newNote})
})

noteRoute.post('/newpost',async(req,res)=>{

    const {title, description, }=req.body;
    
    let newNote = new  noteModel({
        title:title,
        description:description,
     
    })
    try {
        await newNote.save();

        res.redirect(`id= ${newNote.id}`)
    } catch (error) {
        res.render(`newpost`,{newNote:newNote})

        
    }
})

module.exports= noteRoute