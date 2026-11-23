const verifyToken = require('../middleware/verifyToken')
const entryController = require('../controllers/entries.controller')

const router = require('express').Router()

router.post('/', verifyToken, entryController.createEntry)

router.get('/', entryController.getPublicEntries)

router.get('/my-entries', verifyToken, entryController.getMyEntries)

router.get('/:entryId', verifyToken, entryController.getEntryById)

router.put('/:entryId', verifyToken, entryController.updateEntry)

router.delete('/:entryId', verifyToken, entryController.deleteEntry)

module.exports = router