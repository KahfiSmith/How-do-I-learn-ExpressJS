import express from "express";
import { addPsikolog } from "../controller/insert-psikolog.controller.js";
import { getUserProfile, updateUserProfile } from "../controller/profile-user.controller.js";
import { showAllPsikolog } from "../controller/show-Psikolog.controller.js";
import { getPsikologProfile, updatePsikologProfile } from "../controller/profile-psikolog.controller.js";

const router = express.Router();

// user
router.get("/profile-user/:uuid", getUserProfile);
router.put("/profile-user-edit/:uuid", updateUserProfile);

// psikolog
router.post("/add-psikolog", addPsikolog);
router.get("/profile-psikolog/:uuid", getPsikologProfile);
router.put("/profile-psikolog-edit/:uuid", updatePsikologProfile);
router.get("/show-psikolog", showAllPsikolog);

export default router;
