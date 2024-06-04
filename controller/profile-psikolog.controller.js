import User from "../models/users.js";

export const getProfilePsikolog = async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({
      attributes: [
        "nama_lengkap",
        "jenis_kelamin",
        "umur",
        "nomer_telepon",
        "spesialis",
      ],
      where: { uuid },
    });
    if (!user) {
      return res.status(404).json({ msg: "Psikolog tidak ditemukan" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProfilePsikolog = async (req, res) => {
    const { uuid } = req.params;
    const { nama_lengkap, jenis_kelamin, umur, tanggal_lahir, nomer_telepon, spesialis, pengalaman, biografi } =
      req.body;
  
    try {
      const user = await User.findOne({ where: { uuid } });
      if (!user) {
        return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
      }
  
      user.nama_lengkap = nama_lengkap || user.nama_lengkap;
      user.jenis_kelamin = jenis_kelamin || user.jenis_kelamin;
      user.umur = umur || user.umur;
      user.tanggal_lahir = tanggal_lahir || user.tanggal_lahir;
      user.nomer_telepon = nomer_telepon || user.nomer_telepon;
      user.spesialis = spesialis || user.spesialis;
      user.pengalaman = pengalaman || user.pengalaman;
      user.biografi = biografi || user.biografi;
      await user.save();
  
      res.status(200).json({ msg: "Profil berhasil diperbarui", user });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
