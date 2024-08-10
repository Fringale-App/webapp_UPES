import express from 'express'
import { registerRes } from '../controllers/restaurant.controller.js'

const router = express.Router()
router.post('/create',registerRes)
export default router