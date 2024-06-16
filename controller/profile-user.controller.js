import { query } from "../database/db.js";
import jwt from "jsonwebtoken";

const issueToken = (user) => {
  const payload = {
    uuid: user.uuid,
    nama_lengkap: user.nama_lengkap,
    jenis_kelamin: user.jenis_kelamin,
    tanggal_lahir: user.tanggal_lahir,
    nomer_telepon: user.nomer_telepon
  };

  const secretKey = process.env.SECRET_KEY || 'your_secret_key_here';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secretKey, options);
};

export const updateUserProfile = async (req, res) => {
  const { uuid } = req.params;
  const { nama_lengkap, jenis_kelamin, tanggal_lahir, nomer_telepon } = req.body;

  const updates = [];
  const values = [];

  if (nama_lengkap) {
    updates.push("nama_lengkap = ?");
    values.push(nama_lengkap);
  }
  if (jenis_kelamin) {
    updates.push("jenis_kelamin = ?");
    values.push(jenis_kelamin);
  }
  if (tanggal_lahir) {
    updates.push("tanggal_lahir = ?");
    values.push(tanggal_lahir);
  }
  if (nomer_telepon) {
    updates.push("nomer_telepon = ?");
    values.push(nomer_telepon);
  }

  if (updates.length > 0) {
    const updateString = updates.join(', ');
    values.push(uuid); 

    try {
      const result = await query(`UPDATE users SET ${updateString} WHERE uuid = ?`, values);
      if (result.affectedRows > 0) {
        const updatedUser = { uuid, nama_lengkap, jenis_kelamin, tanggal_lahir, nomer_telepon };
        const newToken = issueToken(updatedUser);
        res.status(200).json({ msg: "Profil berhasil diperbarui", token: newToken });
      } else {
        res.status(404).json({ msg: "Data tidak ditemukan" });
      }
    } catch (error) {
      res.status(500).json({ msg: "Error saat memperbarui profil: " + error.message });
    }
  } else {
    res.status(400).json({ msg: "Tidak ada data yang diperbarui" });
  }
};

export const getUserProfile = async (req, res) => {
  const { uuid } = req.params;
  try {
    const result = await query(
      "SELECT nama_lengkap, jenis_kelamin, umur, tanggal_lahir FROM users WHERE uuid = ?",
      [uuid]
    );
    if (result.length > 0) {
      const data = result.map(item => ({
        ...item,
        tanggal_lahir: new Date(item.tanggal_lahir).toLocaleDateString('id-ID') 
      }));
      res.status(200).json({ msg: "Data ditemukan", data: data });
    } else {
      res.status(404).json({ msg: "Data tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};