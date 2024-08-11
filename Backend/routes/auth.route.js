import express from 'express';
import { register,signin } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', register);
router.post("/signin", signin)
// router.post("/google", google)
// router.get("/signout", signOut)

export default router;

