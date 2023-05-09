const express =require('express');
const { getNote, createNote, deleteNote, updateNote } = require('../controllers/noteController');
const noteRoute = express.Router();

const  auth = require('../midddlewaares/auth') //----- middlewear import

//----- Only authenticated users acn access these end points

noteRoute.get('/', auth, getNote)

noteRoute.post('/', auth, createNote)

noteRoute.delete('/:id', auth, deleteNote) 

noteRoute.put('/:id', auth, updateNote)

module.exports= noteRoute