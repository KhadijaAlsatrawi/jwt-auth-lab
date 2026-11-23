const verifyToken = require('../middleware/verifyToken')
const Entry = require('../models/Entry')

const router = require('express').Router()

router.post('/', verifyToken, async (req, res)=>{
    try{
        const {title, entryBody, isPublic} = req.body

        const createdEntry = await Entry.create({
            title: title,
            entryBody: entryBody,
            isPublic: isPublic,
            owner: req.user._id
        })

        res.status(201).json(createdEntry)
    }catch(err){
        console.log(err)
    }
})

router.get('/', async (req, res)=>{
    try {
        const allEntries = await Entry.find({isPublic: true})

        res.status(200).json(allEntries)
    } catch (err) {
        console.log(err)   
    }
})

router.get('/my-entries', verifyToken, async (req, res)=>{
    try{
        const myEntries = await Entry.find({owner: req.user._id})


        res.status(200).json(myEntries)
    }catch(err){
        console.log(err)
    }
})

router.put('/:entryId', verifyToken, async (req, res)=>{
    try{
        const {title, entryBody, isPublic} = req.body

        const foundEntry = await Entry.findById(req.params.entryId)

        if(String(foundEntry.owner) !== String(req.user._id)){
            return res.status(403).json({message: "can't do that!"})
        }

        const updateddEntry = await Entry.findByIdAndUpdate(req.params.entryId,{
            title: title,
            entryBody: entryBody,
            isPublic: isPublic,
        }, {returnDocument: 'after'})

        res.status(200).json(updateddEntry)
    }catch(err){
        console.log(err)
    }
})

router.delete('/:entryId', verifyToken, async (req, res)=>{
    try{
        const foundEntry = await Entry.findById(req.params.entryId)

        if(String(foundEntry.owner) !== String(req.user._id)){
            return res.status(403).json({message: "can't do that!"})
        }

        await Entry.findByIdAndDelete(req.params.entryId)

        res.sendStatus(204)
    }catch(err){
        console.log(err)
    }
})

module.exports = router