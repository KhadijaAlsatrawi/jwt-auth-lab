const Entry = require('../models/Entry')


async function getPublicEntries(req, res) {
    try {
        const allEntries = await Entry.find({ isPublic: true })

        res.status(200).json(allEntries)
    } catch (err) {
        console.log(err)
    }
}


async function getEntryById(req, res) {
    try {
        const foundEntry = await Entry.findById(req.params.entryId)

        res.status(200).json(foundEntry)
    } catch (err) {
        console.log(err)
    }
}

async function getMyEntries(req, res) {
    try {
        const myEntries = await Entry.find({ owner: req.user._id })


        res.status(200).json(myEntries)
    } catch (err) {
        console.log(err)
    }
}

async function createEntry(req, res) {
    try {
        const { title, entryBody, isPublic } = req.body

        const createdEntry = await Entry.create({
            title: title,
            entryBody: entryBody,
            isPublic: isPublic,
            owner: req.user._id
        })

        res.status(201).json(createdEntry)
    } catch (err) {
        console.log(err)
    }
}

async function updateEntry(req, res) {
    try {
        const { title, entryBody, isPublic } = req.body

        const foundEntry = await Entry.findById(req.params.entryId)

        if (String(foundEntry.owner) !== String(req.user._id)) {
            return res.status(403).json({ message: "can't do that!" })
        }

        const updateddEntry = await Entry.findByIdAndUpdate(req.params.entryId, {
            title: title,
            entryBody: entryBody,
            isPublic: isPublic,
        }, { returnDocument: 'after' })

        res.status(200).json(updateddEntry)
    } catch (err) {
        console.log(err)
    }
}

async function deleteEntry(req, res) {
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
}


module.exports = {
    getPublicEntries,
    getMyEntries,
    getEntryById,
    createEntry,
    updateEntry,
    deleteEntry
}