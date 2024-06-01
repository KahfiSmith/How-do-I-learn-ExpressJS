import mysql from "mysql2/promise";
import dotenv from "dotenv/config";

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const Connection = async () => {
  try {
    await db.getConnection();
    console.log("Success");
  } catch (e) {
    console.error("Failed to connect:", e.message);
  }
};

const query = async (query, value) => {
  try {
    const [result] = await db.query(query, value ?? []);
    return result;
  } catch (e) {
    console.error("Query failed:", e.message);
  }
};

export { Connection, query, db };
