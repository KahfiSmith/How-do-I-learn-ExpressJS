import { query, db } from "../database/db.js";

export const getUserProfile = async (req, res) => {
  const { id_profil } = req.params;
  try {
    const profileData = await query(
      `
      SELECT profiles.*, users.nama_lengkap, users.jenis_kelamin
      FROM profiles
      LEFT JOIN users ON profiles.id_user = users.id_user
      WHERE profiles.id_profil = ?
      `,
      [id_profil]
    );

    if (profileData.length === 0) {
      return res.status(404).json({ msg: "Profile not found" });
    }

    return res.status(200).json(profileData[0]);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const editUserProfile = async (req, res) => {
    const { id_user } = req.params;
    const {
      umur,
      tanggal_lahir,
      nomer_telepon,
      spesialis,
      pengalaman,
      biografi,
      nama_lengkap,
      jenis_kelamin
    } = req.body;
  
    try {
      const connection = await db.getConnection();
      await connection.beginTransaction();
  
      try {
        await connection.query(
          `
          UPDATE profiles
          SET umur = ?, tanggal_lahir = ?, nomer_telepon = ?, spesialis = ?, pengalaman = ?, biografi = ?
          WHERE id_user = ?
          `,
          [umur, tanggal_lahir, nomer_telepon, spesialis, pengalaman, biografi, id_user]
        );
  
        await connection.query(
          `
          UPDATE users
          SET nama_lengkap = ?, jenis_kelamin = ?
          WHERE id_user = ?
          `,
          [nama_lengkap, jenis_kelamin, id_user]
        );
  
        await connection.commit();
        connection.release();
  
        res.status(200).json({ msg: 'Profile updated successfully' });
      } catch (error) {
        await connection.rollback();
        connection.release();
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
    }
  };