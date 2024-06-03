import bcrypt from "bcrypt";
import User from "../models/users.js";

export const userRegistration = async (req, res) => {
    const { email, password, nama_lengkap, jenis_kelamin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
      await User.create({
        email,
        password: hashedPassword,
        nama_lengkap,
        jenis_kelamin
      });
      res.status(200).json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: "Email tidak ditemukan" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Password salah" });
    }
    res.status(200).json({ msg: "Login Berhasil" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
