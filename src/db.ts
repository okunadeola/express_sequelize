require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";




const sequelize = new Sequelize(process.env.MYSQL_DB as string, process.env.MYSQL_USER as string, process.env.MYSQL_PASSWORD as string, {
  dialect : 'mysql',
  host: process.env.MYSQL_HOST,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };
