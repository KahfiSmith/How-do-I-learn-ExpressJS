import { DataTypes } from 'sequelize';
import db from '../database/db.js';

const User = db.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  nama_lengkap: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  jenis_kelamin: {
    type: DataTypes.ENUM('laki-laki', 'perempuan'),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('psikolog', 'pasien'),
    allowNull: true,
    defaultValue: 'pasien',
  },
  umur: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  nomer_telepon: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  spesialis: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  pengalaman: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  biografi: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;
