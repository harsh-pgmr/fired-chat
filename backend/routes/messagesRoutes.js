const express = require('express');
const router = express.Router();

const Messages = require('../models/messagesModel')


// save new message
router.post('/', async(req, res) => {
    const message = new Messages({
        sender: req.body.sender,
        room: req.body.room,
        content: req.body.content
    })

    try {
        await message.save();
        res.status(200).json({
            msg: "New message saved.",
            message: message
        })
    } 
    catch (error) {
        res.status(500).json({
            msg: 'Internal server error.'
        })
    }
})


router.get('/', async (req, res) => {
    try {
        const messages = await Messages.find();
        res.json(messages)       
    } 
    catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }
})

router.delete('/', async (req, res) => {
    try {
        const filter = {
            sender: req.body.sender,
            room: req.body.room
        }
        await Messages.deleteMany(filter)        
        res.status(200).json({
            msg: "Messages deleted."
        })
    } 
    catch (error) {
        res.status(500).json({
            msg: error.message
        })    
    }
})



module.exports = router;