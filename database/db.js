import { Sequelize } from "sequelize";

const db = new Sequelize("relive", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
