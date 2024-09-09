import express from 'express';
import { signup,signin,updateLocation, google, signOut } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post("/signin", signin);
router.get("/signout", signOut);
router.post('/google',google);
router.post('/update-location', updateLocation);
// router.post("/google", google)
// router.get("/signout", signOut)

export default router;

