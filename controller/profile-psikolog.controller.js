import User from "../models/users.js";

export const getProfileUser = async (req, res) => {
  const { id_user } = req.params;
  try {
    const user = await User.findOne({
      attributes: [
        "nama_lengkap",
        "jenis_kelamin",
        "umur",
        "tanggal_lahir",
        "nomer_telepon",
      ],
      where: { id_user },
    });
    if (!user) {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
