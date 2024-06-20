import express from "express";
import { addConsultation, getConsultanById } from "../controller/consultan.controller.js";

const router = express.Router();

router.get("/get-role", getConsultanById);
router.post("/add-consultation", addConsultation);

export default router;
