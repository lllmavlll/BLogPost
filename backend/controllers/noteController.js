const noteModel = require("../models/note")

// -----creating a new note -----//
const createNote = async (req,res)=>{
    // console.log(req.userId);
    const {title, description, }=req.body;

    const newNote = new  noteModel({
        title:title,
        description:description,
        username:req.username,
        userId:req.userId
    })
    try {
        await newNote.save();
        res.status(200).json(newNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong!"})

        
    }
}
//----- updating the note
const updateNote = async (req,res)=>{
     const id =req.params.id;
    const {title, description, }=req.body;

    const updateNote ={
        title:title,
        description:description,
        userId:req.userId
    }

    try {
        await noteModel.findByIdAndUpdate(id, updateNote,{new:true});
        res.status(200).json(updateNote)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong!"})
    }
}

// ----- deleting the note
const deleteNote = async(req,res)=>{
    const id =req.params.id;
    try {
        const deleteNote =await noteModel.findByIdAndRemove(id);
        res.status(202).json(deleteNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong!"})
    }

}
//----- getting the created notes -----//
const getNote =  async (req,res)=>{
    try {
    const notes = await noteModel.find({userId:req.userId})
    res.status(200).json(notes)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"something went wrong!"})  
    }
}
module.exports ={
    createNote,
    updateNote,
    deleteNote,
    getNote
    
}