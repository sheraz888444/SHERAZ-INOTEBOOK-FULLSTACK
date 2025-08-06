const express = require('express')
const router = express.Router()
const Note = require('../Models/Notes');
var fetchuser = require('../Middleware/Fetchuser')
const { body, validationResult } = require('express-validator');


// route 1:fetching all  notes  get method: /api/notes/fetchnotes   login-required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//route 2:fetching details  post method /api/notes/addnotes   login-required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'at least 5 characters').isLength({ min: 5 }),

], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // if errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //add notes
        const notes = new Note({
            title, description, tag, user: req.user.id
        })
        const savednote = await notes.save()
         res.json(savednote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error happened");
        console.log(error)
        
    }
})

//route 3:updating notes on the basis of note putcd  method /api/notes/updateNotes   login-required
router.put('/updateNotes/:id', fetchuser,  async (req, res) => {
const {title,description,tag}=req.body;


// create newnote object
const newNote={}
if(title){newNote.tile=title}
if(description){newNote.description=description}
if(tag){newNote.tag=tag}
// find the note and update it
let  note= await Note.findById(req.params.id)
if(!note){ return res.status(404).send("not found")}
if (note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
}
note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note})
})

//route 4:delete notes on the basis of note delete method /api/notes/delteNotes   login-required
router.delete('/deleteNotes/:id', fetchuser,  async (req, res) => {
const {title,description,tag}=req.body;

// find the note and update it
let  note= await Note.findById(req.params.id)
if(!note){ return res.status(404).send("not found")}
if (note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
}
note=await Note.findByIdAndDelete(req.params.id)
res.json({"success":"notes has been deleted"})
})
module.exports = router