/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
/* eslint-disable perfectionist/sort-imports */
import Category from "../models/category.model.js";
import Item from "../models/items.model.js";
import User from "../models/user.model.js";
import Order from "../models/orders.model.js";
import Cart from "../models/cart.model.js";
import sequelize from "../config/db.js";
import relations from "../config/relations.js";

const syncDatabase = async () => {
  try {
    relations();
    await sequelize.sync({ alter: true }); // Use `force: true` to drop and recreate tables
    console.log("Database synced successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
