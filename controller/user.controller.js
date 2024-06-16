import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { query } from "../database/db.js";
import dotenv from "dotenv";

dotenv.config();

export const userRegistration = async (req, res) => {
  const { email, password, nama_lengkap, jenis_kelamin } = req.body;

  if (!email || !password || !nama_lengkap || !jenis_kelamin) {
    return res.status(400).json({ msg: "Field tidak boleh kosong" });
  }

  try {
    const uuid = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 5);
    const result = await query(
      "INSERT INTO users (uuid, email, password, nama_lengkap, jenis_kelamin) VALUES (?, ?, ?, ?, ?)",
      [uuid, email, hashedPassword, nama_lengkap, jenis_kelamin]
    );
    if (result) {
      res.status(200).json({ msg: "Registrasi Berhasil" });
    } else {
      res.status(500).json({ msg: "Gagal melakukan registrasi" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const issueToken = (user) => {
  return jwt.sign({
    userId: user.uuid,
    email: user.email,
    role: user.role,
    nama_lengkap: user.nama_lengkap,
    uuid: user.uuid,
    umur: user.umur,
    tanggal_lahir: user.tanggal_lahir,
    nomer_telepon: user.nomer_telepon,
    jenis_kelamin: user.jenis_kelamin,
  }, process.env.SECRET_KEY, { expiresIn: '1d' });
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResult = await query("SELECT * FROM users WHERE email = ?", [email]);

    if (userResult.length === 0) {
      return res.status(404).json({ msg: "Email tidak ditemukan" });
    }

    const user = userResult[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: "Password salah" });
    }

    const token = issueToken(user); 

    req.session.userId = user.id;

    return res.status(200).json({ msg: "Login berhasil", token, user });
  } catch (error) {
    console.log("Terjadi kesalahan:", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};