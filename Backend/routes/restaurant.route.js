import express from 'express'
import { registerRes ,getRestaurant ,getRestaurants,updateRestaurant, insertManyRestaurants, getResFoods} from '../controllers/restaurant.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()
router.post('/create',registerRes)
router.post('/insertmany',insertManyRestaurants)
router.get('/get/:id',getRestaurant)
router.get('/get',getRestaurants)
router.post('/update/:id',verifyToken,updateRestaurant)
router.get('/foods/:id',getResFoods)
export default router