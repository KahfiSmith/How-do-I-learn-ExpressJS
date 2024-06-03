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

router.get("/profil-user/:id_user", getProfileUser);
router.put("/profil-user-edit/:id_user", updateProfileUser);
router.get("/profil-psikolog/:id_user", getProfilePsikolog);
router.put("/profil-psikolog-edit/:id_user", updateProfilePsikolog);

export default router;
