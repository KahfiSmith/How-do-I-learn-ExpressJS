import express from "express";
import { userRegistration, userLogin } from "../controller/user.controller.js";

const router = express.Router()

router.post('/register', userRegistration)
router.get('/login', userLogin)

export default router