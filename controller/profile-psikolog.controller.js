import { query } from "../database/db.js";
import jwt from "jsonwebtoken";

const issueToken = (user) => {
  const payload = {
    uuid: user.uuid,
    nama_lengkap: user.nama_lengkap,
    spesialis: user.spesialis,
    umur: user.umur,
    jenis_kelamin: user.jenis_kelamin,
    nomer_telepon: user.nomer_telepon,
    biografi: user.biografi,
    pengalaman: user.pengalaman
  };

  const secretKey = process.env.SECRET_KEY || 'your_secret_key_here';
  const options = { expiresIn: '1h' };

  return jwt.sign(payload, secretKey, options);
};

export const updatePsikologProfile = async (req, res) => {
  const { uuid } = req.params;
  const { nama_lengkap, spesialis, umur, jenis_kelamin, nomer_telepon, biografi, pengalaman } = req.body;

  const updates = [];
  const values = [];

  if (nama_lengkap) {
    updates.push("nama_lengkap = ?");
    values.push(nama_lengkap);
  }
  if (spesialis) {
    updates.push("spesialis = ?");
    values.push(spesialis);
  }
  if (umur) {
    updates.push("umur = ?");
    values.push(umur);
  }
  if (jenis_kelamin) {
    updates.push("jenis_kelamin = ?");
    values.push(jenis_kelamin);
  }
  if (nomer_telepon) {
    updates.push("nomer_telepon = ?");
    values.push(nomer_telepon);
  }
  if (biografi) {
    updates.push("biografi = ?");
    values.push(biografi);
  }
  if (pengalaman) {
    updates.push("pengalaman = ?");
    values.push(pengalaman);
  }

  if (updates.length > 0) {
    const updateString = updates.join(', ');
    values.push(uuid);

    try {
      const result = await query(`UPDATE users SET ${updateString} WHERE uuid = ?`, values);
      if (result.affectedRows > 0) {
        const updatedUser = { uuid, nama_lengkap, jenis_kelamin, umur, spesialis, biografi, pengalaman, nomer_telepon };
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

export const getPsikologProfile = async (req, res) => {
  const { uuid } = req.params;
  try {
    const result = await query(
      "SELECT nama_lengkap, spesialis, umur, nomer_telepon, biografi, pengalaman, jenis_kelamin FROM users WHERE uuid = ?",
      [uuid]
    );
    if (result.length > 0) {
      res.status(200).json({ msg: "Data ditemukan", data: result });
    } else {
      res.status(404).json({ msg: "Data tidak ditemukan" });
    }
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};