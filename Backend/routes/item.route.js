import express from 'express'
// import { verifyToken } from '../utils/verifyToken.js'
import { addItem, deleteItem, getAllItems, getItem, getItems, insertManyItems, updateItem } from '../controllers/item.controller.js'


const router = express.Router()
router.post('/create',addItem)
router.post('/insertmany',insertManyItems)
router.delete('/delete/:id',deleteItem)
router.get('/get/:id',getItem)
router.get('/get',getAllItems)
router.post('/swipe',getItems)
router.post('/update/:id',updateItem)
export default router