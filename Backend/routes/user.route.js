import express from 'express';
import { signup,signin,updateLocation, google, signOut, updateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/signup', signup);
router.post("/signin", signin);
router.get("/signout", signOut);
router.post('/google',google);
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.post('/update-location', updateLocation);
// router.post("/google", google)
// router.get("/signout", signOut)

export default router;

