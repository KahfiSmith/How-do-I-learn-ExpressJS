import { query } from "../database/db.js";

export const getRiwayatById = async (req, res) => {
  try {
    const { id_pasien } = req.params;

    const result = await query(
      `
        SELECT 
          c.tanggal, 
          c.id_konsultasi,
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
    const { id_konsultasi } = req.params;

    const selectQuery = `
          SELECT 
            k.tanggal,
            pasien.nama_lengkap AS nama_pasien,
            psikolog.nama_lengkap AS nama_psikolog,
            k.hipotesis,
            k.kategori,
            k.catatan,
            k.simpulan,
            k.simpulann,
            k.nomor_konsultasi
          FROM konsultans k
          JOIN users pasien ON k.id_pasien = pasien.id_user
          JOIN users psikolog ON k.id_psikolog = psikolog.id_user
          WHERE k.id_konsultasi = ?
        `;
    const result = await query(selectQuery, [id_konsultasi]);

    if (result.length > 0) {
      res.json({ msg: "Data ditemukan", data: result[0] });
    } else {
      res.status(404).json({ msg: "Data tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error dalam operasi database: ", error);
    res.status(500).json({ msg: error.message });
  }
};

