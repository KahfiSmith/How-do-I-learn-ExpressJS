import { query } from "../database/db.js";

export const getConsultanById = async (req, res) => {
    try {
        const result = await query("SELECT nama_lengkap, id_user FROM users WHERE role = 'pasien'");
        res.json({ msg: "Data ditemukan", data: result });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}

export const getListConsultation = async (req, res) => {
    try {
      const { id_psikolog } = req.params;
  
      const result = await query(
        `
          SELECT 
            c.tanggal, 
            c.kategori,
            c.hipotesis,
            u.nama_lengkap AS nama_lengkap
          FROM konsultans c
          JOIN users u ON c.id_pasien = u.id_user
          WHERE c.id_psikolog = ?
        `,
        [id_psikolog]
      );
  
      res.json({ msg: "Data ditemukan", data: result });
    } catch (e) {
      res.status(500).json({ msg: e.message });
    }
  };

export const addConsultation = async (req, res) => {
    const { id_pasien, id_psikolog, tanggal, hipotesis, kategori, catatan, simpulan, simpulann } = req.body;

    if (!id_pasien || !id_psikolog || !tanggal || !hipotesis || !kategori || !catatan) {
        return res.status(400).json({ success: false, message: 'Semua field harus diisi.' });
    }

    try {
        const lastNumberResult = await query('SELECT nomor_konsultasi FROM konsultans ORDER BY nomor_konsultasi DESC LIMIT 1');
        let newConsultationNumber = 1;
        if (lastNumberResult.length > 0) {
            newConsultationNumber = lastNumberResult[0].nomor_konsultasi + 1;
        }

        const result = await query(
            'INSERT INTO konsultans (id_pasien, id_psikolog, tanggal, nomor_konsultasi, hipotesis, kategori, catatan, simpulan, simpulann) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id_pasien, id_psikolog, tanggal, newConsultationNumber, hipotesis, kategori, catatan, simpulan, simpulann]
        );
        res.json({ success: true, message: 'Konsultasi telah dibuat', consultationId: result.insertId, nomorKonsultasi: newConsultationNumber });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

