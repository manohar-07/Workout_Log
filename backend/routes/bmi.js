const express = require('express')

// controller functions
const { getBmi,calculateBmi } = require('../controllers/bmiController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()


router.use(requireAuth) //middleware
// bmi route
router.get('/', getBmi)

// bmi calculate route
router.post('/calculate', calculateBmi)

module.exports = router