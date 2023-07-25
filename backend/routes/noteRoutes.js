const express = require('express')
const router = express.Router({ mergeParams: true })
const { getNotes, addNote } = require('../controllers/noteController')

const { protect } = require('../middleware/authMiddleware')

// All routes for notes are protected as only authorized user can view and add notes
router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router
