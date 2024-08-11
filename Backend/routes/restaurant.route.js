import express from 'express'
import { registerRes ,getRestaurant ,getRestaurants,updateRestaurant} from '../controllers/restaurant.controller.js'

const router = express.Router()
router.post('/create',registerRes)
router.get('/get/:id',getRestaurant)
router.get('/get',getRestaurants)
router.post('/update/:id',updateRestaurant)
export default router