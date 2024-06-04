import express from "express";
import {
  getProfileUser,
  updateProfileUser,
} from "../controller/profile-user.controller.js";
import {
  getProfilePsikolog,
  updateProfilePsikolog,
} from "../controller/profile-psikolog.controller.js";

const router = express.Router();

router.get("/profil-user/:uuid", getProfileUser);
router.put("/profil-user-edit/:uuid", updateProfileUser);
router.get("/profil-psikolog/:uuid", getProfilePsikolog);
router.put("/profil-psikolog-edit/:uuid", updateProfilePsikolog);

export default router;
