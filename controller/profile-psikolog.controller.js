import { query } from "../database/db.js";

export const getPsikologProfile = async (req, res) => {
  const { uuid } = req.params;
  try {
    const result = await query(
      "SELECT nama_lengkap, spesialis, umur, nomer_telepon, biografi, pengalaman FROM users WHERE uuid = ?",
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

export const updatePsikologProfile = async (req, res) => {
  const { uuid } = req.params;
  const { nama_lengkap, spesialis, umur, nomer_telepon, biografi, pengalaman } =
    req.body;

  const updates = [];
  if (nama_lengkap) updates.push(`nama_lengkap = '${nama_lengkap}'`);
  if (spesialis) updates.push(`spesialis = ${spesialis}`);
  if (umur) updates.push(`umur = ${umur}`);
  if (nomer_telepon) updates.push(`nomer_telepon = ${nomer_telepon}`);
  if (biografi) updates.push(`biografi = ${biografi}`);
  if (pengalaman) updates.push(`pengalaman = ${pengalaman}`);

  const updateString = updates.join(", ");

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
