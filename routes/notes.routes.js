const express= require("express")
const {NoteModel} = require("../models/note.model")
const {auth} = require("../middleware/auth.middleware")
const noteRouter = express.Router()

noteRouter.use(auth)

noteRouter.post("/create",async(req,res)=>{
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.json({msg:"New Note has been added",note:req.body})
    } catch (error) {
        res.json({error:error.message})
    }
})

noteRouter.get("/",async(req,res)=>{
    try {
        const notes = await NoteModel.find({userID:req.body.userID})
        res.send(notes)
    } catch (error) {
        res.json({error:error.message})
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const useridinuserdoc = req.body.userID;
    const {noteID} = req.params;
    try {
        const note = await NoteModel.findOne({_id:noteID})
        const useridinnotedoc = note.userID
        if(useridinuserdoc===useridinnotedoc){
            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.json({msg:`${note.title} has been updated`})
        }
        else{
            res.json({msg:"Not Authorized!!"})
        }
    } catch (error) {
        res.json({error:error.message})
    }
   
})

noteRouter.delete("/delete/:noteId",async(req,res)=>{
    const useridinuserdoc = req.body.userID;
    const {noteID} = req.params;
    try {
        const note = await NoteModel.findOne({_id:noteID})
        const useridinnotedoc = note.userID
        if(useridinuserdoc===useridinnotedoc){
            await NoteModel.findByIdAndDelete({_id:noteID})
            res.json({msg:`${note.title} has been updated`})
        }
        else{
            res.json({msg:"Not Authorized!!"})
        }
    } catch (error) {
        res.json({error:error.message})
    }
   
})


module.exports = {
    noteRouter
}