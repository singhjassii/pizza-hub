import Sequelize from "sequelize";
import db from "../config/db.js";

const Category = db.define(
  "category",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "category name is required.",
        },
        len: {
          args: [1, 100],
          msg: "category name should have 1 to 100 characters.",
        },
      },
    },
    description: {
      type: Sequelize.STRING(455),
      allowNull: false,
      validate: {
        notNull: {
          msg: "category description is required.",
        },
        len: {
          args: [1, 455],
          msg: "category description should have 1 to 455 characters.",
        },
      },
    },
  },
  {
    tableName: "categories",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    timestamps: true,
  }
);
// Category.sync({ alter: true }).then(() => console.log("done"));
export default Category;
