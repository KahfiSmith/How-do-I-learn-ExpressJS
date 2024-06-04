import { query } from "../database/db.js";

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

export const updateUserProfile = async (req, res) => {
  const { uuid } = req.params;
  const { nama_lengkap, jenis_kelamin, umur, tanggal_lahir } = req.body;
  
  const updates = [];
  if (nama_lengkap) updates.push(`nama_lengkap = '${nama_lengkap}'`);
  if (jenis_kelamin) updates.push(`jenis_kelamin = '${jenis_kelamin}'`);
  if (umur) updates.push(`umur = ${umur}`);
  if (tanggal_lahir) updates.push(`tanggal_lahir = '${tanggal_lahir}'`);

  const updateString = updates.join(', ');

  try {
    const result = await query(
      `UPDATE users SET ${updateString} WHERE uuid = ?`,
      [uuid]
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ msg: "Profil berhasil diperbarui" });
    } else {
      res.status(404).json({ msg: "Data tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


