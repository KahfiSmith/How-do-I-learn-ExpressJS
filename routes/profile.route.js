import express from "express";
import { addPsikolog } from "../controller/insert-psikolog.controller.js";
import { getUserProfile, updateUserProfile } from "../controller/profile-user.controller.js";

const router = express.Router();

router.post('/add-psikolog', addPsikolog)
router.get('/profile-user/:uuid', getUserProfile)
router.put('/profile-user-edit/:uuid', updateUserProfile)

export default router;
