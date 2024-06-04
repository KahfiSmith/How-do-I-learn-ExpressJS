import bcrypt from "bcrypt";
import { query } from "../database/db.js";
import { v4 as uuidv4 } from 'uuid'; 

export const addPsikolog = async (req, res) => {
    const { email, password, nama_lengkap, jenis_kelamin, umur, tanggal_lahir, nomer_telepon, spesialis, pengalaman, biografi, role } = req.body;
  
    if (!email || !password || !nama_lengkap || !jenis_kelamin) {
      return res.status(400).json({ msg: "Field tidak boleh kosong" });
    }
  
    try {
      const uuid = uuidv4(); 
      const hashedPassword = await bcrypt.hash(password, 5);
      const result = await query("INSERT INTO users (uuid, email, password, nama_lengkap, jenis_kelamin, umur, tanggal_lahir, nomer_telepon, spesialis, pengalaman, biografi, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [uuid, email, hashedPassword, nama_lengkap, jenis_kelamin, umur, tanggal_lahir, nomer_telepon, spesialis, pengalaman, biografi, role]);
      if (result) {
        res.status(200).json({ msg: "Registrasi Psikolog Berhasil" });
      } else {
        res.status(500).json({ msg: "Gagal melakukan registrasi" });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };