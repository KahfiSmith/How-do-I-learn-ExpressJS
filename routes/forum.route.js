import express from "express";
import { addForum, getForum } from "../controller/forum.controller.js";

const router = express.Router();

router.get("/show-forum", getForum);
router.post("/add-forum", addForum);

export default router;
