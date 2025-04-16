import Sequelize from "sequelize";
import db from "../config/db.js";
import User from "./user.model.js";

const Order = db.define(
  "Order",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "customer address is required",
        },
      },
    },
    orderList: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "order list is required",
        },
      },
    },
    totalBill: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "total bill is required",
        },
      },
    },
  },
  {
    tableName: "orders",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    timestamps: true,
  }
);
User.hasMany(Order, {
  foreignKey: "customerId",
  as: "customer",
});
Order.belongsTo(User, {
  foreignKey: "customerId",
  as: "customer",
});
// Order.sync({ force: true }).then(() => console.log("done"));
export default Order;
