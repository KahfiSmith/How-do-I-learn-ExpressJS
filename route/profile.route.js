import express from "express";
import { getUserProfile, editUserProfile } from "../controller/profile.controller.js";

const router = express.Router();

router.get("/profile-user/:id_profil", getUserProfile);
router.put("/profile-user-edit/:id_user", editUserProfile);

export default router;
// 
