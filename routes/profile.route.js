import express from "express";
import { addPsikolog } from "../controller/insert-psikolog.controller.js";
import { getUserProfile, updateUserProfile } from "../controller/profile-user.controller.js";
import { showAllPsikolog } from "../controller/show-Psikolog.controller.js";

const router = express.Router();

router.post("/add-psikolog", addPsikolog);
router.get("/profile-user/:uuid", getUserProfile);
router.put("/profile-user-edit/:uuid", updateUserProfile);
router.get("/show-psikolog", showAllPsikolog);

export default router;
