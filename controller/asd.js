import bcrypt from "bcrypt";
import { query } from "../database/db.js";

export const userRegistration = async (req, res) => {
  const { email, password, nama_lengkap, jenis_kelamin } = req.body;

  if (!email || !password || !nama_lengkap || !jenis_kelamin) {
    return res.status(400).json({ msg: "Field tidak boleh kosong" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const result = await query("INSERT INTO users (email, password, nama_lengkap, jenis_kelamin) VALUES (?, ?, ?, ?)", [email, hashedPassword, nama_lengkap, jenis_kelamin]);
    if (result) {
      res.status(200).json({ msg: "Registrasi Berhasil" });
    } else {
      res.status(500).json({ msg: "Gagal melakukan registrasi" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
