import { query } from "../database/db.js";

export const showAllPsikolog = async (req, res) => {
    try {
        const result = await query("SELECT * FROM users WHERE role = 'psikolog'");
        if (result.length > 0) {
            res.status(200).json({ msg: "Data ditemukan", data: result });
        } else {
            res.status(404).json({ msg: "Data tidak ditemukan" });
        }
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}
