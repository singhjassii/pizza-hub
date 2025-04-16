import pg from "pg";
import { Sequelize } from "sequelize";
import operatorsAliases from "./operatorsAliases.js";

import "dotenv/config";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  // logging: false, // Disable logging for production
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
  pool: { max: 5, idle: 30 },
  operatorsAliases,
});

export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.warn("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
testDBConnection();

export default sequelize;
