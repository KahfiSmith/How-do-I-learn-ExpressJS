import bcrypt from "bcrypt";
import User from "../models/users.js";
import { query } from "../database/db.js";

export const userRegistration = async (req, res) => {
  const { email, password, nama_lengkap, jenis_kelamin } = req.body;

  if (!email || !password || !nama_lengkap || !jenis_kelamin) {
    return res.status(400).json({ msg: "Field tidak boleh kosong" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const result = await query("INSERT INTO users (email, password, nama_lengkap, jenis_kelamin) VALUES (?, ?, ?, ?)", [email, hashedPassword, nama_lurator,jenis_kelamin]);
    if (result) {
      res.status(200).json({ msg: "Registrasi Berhasil" });
    } else {
      res.status(500).json({ msg: "Gagal melakukan registrasi" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "Email tidak ditemukan" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password salah" });
    }
    req.session.user = { uuid: user.uuid };
    const nama_lengkap = user.nama_lengkap;
    const role = user.role;
    res
      .status(200)
      .json({ msg: "Login Berhasil", uuid: user.uuid, nama_lengkap, role });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const Me = async (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ msg: "Mohon login ke akun anda!" });
  const user = await User.findOne({
    atributes: ["uuid", "email", "nama_lengkap", "role"],
    where: { uuid: req.session.user.uuid },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const userLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Gagal logout" });
    res.status(200).json({ msg: "Logout Berhasil" });
  });
};
