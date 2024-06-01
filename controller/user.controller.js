import { query } from "../database/db.js";
import bcrypt from "bcrypt";

export const userRegistration = async (req, res) => {
    const { email, password, nama_lengkap, jenis_kelamin } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await query(
        "INSERT INTO users (email, password, nama_lengkap, jenis_kelamin) VALUES (?, ?, ?, ?)",
        [email, hashedPassword, nama_lengkap, jenis_kelamin]
      );
  
      const userId = result.insertId;
      await query(
        "INSERT INTO profiles (id_user) VALUES (?)",
        [userId]
      );
  
      return res.status(200).json({ msg: "User berhasil ditambahkan" });
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
      return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
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
  
      return res.status(200).json({ msg: "Login berhasil", user });
    } catch (error) {
      console.log("Terjadi kesalahan:", error);
      return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
  };
