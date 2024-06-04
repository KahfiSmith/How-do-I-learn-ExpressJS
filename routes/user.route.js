import express from "express";
import { userRegistration, userLogin, Me, userLogout} from "../controller/user.controller.js";

const router = express.Router();

router.post('/register', userRegistration)
router.post('/login', userLogin)
router.get('/me', Me)
router.delete('/logout', userLogout)

export default router;
