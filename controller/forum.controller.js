import { query } from "../database/db.js";

export const addForum = async (req, res) => {
  const { catatan, id_user } = req.body;
  if (!catatan || catatan.trim() === "") {
    return res.status(400).json({ msg: "Catatan tidak boleh kosong" });
  }
  try {
    const result = await query("INSERT INTO forums (catatan, id_user) VALUES (?, ?)", [
      catatan, id_user 
    ]);
    const createdResult = await query("SELECT created_at FROM forums WHERE id_forum = LAST_INSERT_ID()");
    const created_at = createdResult[0].created_at;
    res.json({ msg: "Forum berhasil ditambahkan", data: {...result, created_at} });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};


export const getForum = async (req, res) => {
  try {
    const result = await query(
      "SELECT forums.*, users.nama_lengkap FROM forums JOIN users ON forums.id_user = users.id_user ORDER BY forums.created_at DESC"
    );
    res.json({ msg: "Data ditemukan", data: result });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

