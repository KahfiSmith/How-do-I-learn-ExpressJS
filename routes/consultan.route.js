import express from "express";
import { addConsultation, getConsultanById, getListConsultation } from "../controller/consultan.controller.js";

const router = express.Router();

router.get("/get-role", getConsultanById);
router.post("/add-consultation", addConsultation);
router.get("/get-list-consultation/:id_psikolog", getListConsultation);

export default router;
