import express from "express";
import { getDetailRiwayat, getRiwayatById } from "../controller/riwayat-user.controller.js";

const router = express.Router();

router.get("/get-riwayat/:id_pasien", getRiwayatById);
router.get("/get-detail-riwayat/:id_pasien/:id_psikolog", getDetailRiwayat);

export default router;