const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

const router = express.Router();


// Route 1 Fetch all user notes using GET method

router.get('/allnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user._id });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

// res.send('Hello this is notes');
});



// Route 2 to Add a new note using POST method
router.post('/addnote', fetchuser, [
    body('title').isLength({min: 3}).withMessage('Title is required'),
    body('description').isLength({ min: 3 }).withMessage('Description must be at least 3 characters long'),

],
    async (req, res) => {

        try {
            const { title, description, tag } = req.body;
//  if invalid request throw error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
// Create a new note
            const note = new Notes({
                title, description, tag, user: req.user._id
            });
// Save note in database
            const savedNote = await note.save();
            res.json(savedNote);


        } catch (error) {
            console.log(error.message);

        }
    });


    
// Route 3 to update a note using PUT method
router.put('/updatenote/:_id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        // Create a new note Object
        const newNote = {};
        if (title) {newNote.title = title};
        if (description) {newNote.description = description};
        if (tag) {newNote.tag = tag};

        // Find note by id

        let note = await Notes.findById(req.params._id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });
        // Make sure user owns note
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        // Update note
        const updatedNote = await Notes.findByIdAndUpdate(req.params._id, { $set: newNote }, { new: true });
        res.json({updatedNote});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});



// Route 4 to delete a note using DELETE method
router.delete('/deletenote/:_id', fetchuser, async (req, res) => {

    
    try {
        // Find note by id
        let note = await Notes.findById(req.params._id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });
        // Check user
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        // Delete note
        await Notes.findByIdAndRemove(req.params._id);
        res.json({ msg: 'Note Successfully Deleted ' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});






module.exports = router;
