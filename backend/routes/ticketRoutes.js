const express = require('express')
const router = express.Router()
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')

// Re-route into note router
// notes can be accessed only via ticket id so that we dont access notes from another ticket
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

// All routes for tickets are protected as only authorized user can view/add/delete tickets

router.route('/').get(protect, getTickets).post(protect, createTicket)

router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)

module.exports = router
