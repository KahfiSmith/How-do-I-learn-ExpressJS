import { query } from "../database/db.js";

export const getRiwayatById = async (req, res) => {
  try {
    const { id_pasien } = req.params;

    const result = await query(
      `
        SELECT 
          c.tanggal, 
          u.nama_lengkap AS nama_lengkap
        FROM konsultans c
        JOIN users u ON c.id_psikolog = u.id_user
        WHERE c.id_pasien = ?
      `,
      [id_pasien]
    );

    res.json({ msg: "Data ditemukan", data: result });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

export const getDetailRiwayat = async (req, res) => {
  try {
    const { id_pasien, id_psikolog } = req.params;

    const selectQuery = `
          SELECT 
            k.tanggal,
            pasien.nama_lengkap AS nama_pasien,
            psikolog.nama_lengkap AS nama_psikolog
          FROM konsultans k
          JOIN users pasien ON k.id_pasien = pasien.id_user AND pasien.role = 'pasien'
          JOIN users psikolog ON k.id_psikolog = psikolog.id_user AND psikolog.role = 'psikolog'
          WHERE k.id_pasien = ? AND k.id_psikolog = ?
        `;
    const result = await query(selectQuery, [id_pasien, id_psikolog]);

    if (result.length > 0) {
      res.json({ msg: "Data ditemukan", data: result });
    } else {
      res.status(404).json({ msg: "Data tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error dalam operasi database: ", error);
    res.status(500).json({ msg: error.message });
  }
};
