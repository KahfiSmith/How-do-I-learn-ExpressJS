import express from "express";
import { userRegistration, userLogin} from "../controller/user.controller.js";
import bcrypt from "bcrypt";
import User from "../models/users.js";

const router = express.Router();

router.post("/addPsikolog", async (req, res) => {
  const { email, password, nama_lengkap, jenis_kelamin, umur, tanggal_lahir, nomer_telepon, spesialis, pengalaman, biografi, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      nama_lengkap,
      jenis_kelamin,
      umur,
      tanggal_lahir,
      nomer_telepon,
      spesialis,
      pengalaman,
      biografi,
      role,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', userRegistration)
router.get('/login', userLogin)

export default router;
