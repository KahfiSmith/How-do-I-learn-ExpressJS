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

export const updateProfileUser = async (req, res) => {
  const { id_user } = req.params;
  const { nama_lengkap, jenis_kelamin, tanggal_lahir, nomer_telepon } =
    req.body;

  try {
    const user = await User.findOne({ where: { id_user } });
    if (!user) {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }

    user.nama_lengkap = nama_lengkap || user.nama_lengkap;
    user.jenis_kelamin = jenis_kelamin || user.jenis_kelamin;
    user.tanggal_lahir = tanggal_lahir || user.tanggal_lahir;
    user.nomer_telepon = nomer_telepon || user.nomer_telepon;
    await user.save();

    res.status(200).json({ msg: "Profil berhasil diperbarui", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
