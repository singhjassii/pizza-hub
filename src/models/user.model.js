import Sequelize from "sequelize";
import db from "../config/db.js";

const User = db.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: "user name is required.",
        },
        len: {
          args: [1, 100],
          msg: "user name should have 1 to 100 characters.",
        },
      },
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "user email is required",
        },
      },
    },
    phoneNumber: {
      type: Sequelize.STRING(15),
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number is required.",
        },
        len: {
          args: [1, 15],
          msg: "Phone number should have 1 to 15 characters.",
        },
      },
    },
    otp: {
      type: Sequelize.STRING(4),
      allowNull: true,
    },
    isVerified: {
      type: Sequelize.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "no",
      validate: {
        isIn: {
          args: [["yes", "no"]],
          msg: "isVerified contains invalid value",
        },
      },
    },
  },
  {
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    timestamps: true,
  }
);
// User.sync({ alter: true }).then(() => console.log("done"));
export default User;
