export const addForum = async (req, res) => {
  const { uuid, catatan, id_psikolog } = req.body;
  if (!catatan || catatan.trim() === "") {
    return res.status(400).json({ msg: "Catatan tidak boleh kosong" });
  }
  try {
    const result = await query(
      "INSERT INTO forum (uuid, catatan, nama_lengkap) VALUES (?, ?, ?)",
      [uuid, catatan, id_psikolog]
    );
    res.json({ msg: "Forum berhasil ditambahkan", data: result });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};
