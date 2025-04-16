import Sequelize from "sequelize";
import db from "../config/db.js";
import Item from "./items.model.js";
import Order from "./orders.model.js";

const Cart = db.define(
  "cart",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: Sequelize.INTEGER,
      references: { model: Order, key: "id" },
    },
    itemId: {
      type: Sequelize.INTEGER,
      references: { model: Item, key: "id" },
      allowNull: false,
      validate: {
        notNull: {
          msg: "item id is required",
        },
      },
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        notNull: {
          msg: "quantity is required",
        },
      },
    },
  },
  {
    tableName: "carts",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    timestamps: true,
  }
);
Cart.belongsTo(Order, {
  foreignKey: "orderId",
  as: "cartItems",
});
Order.hasMany(Cart, {
  foreignKey: "orderId",
  as: "cartItems",
});
Cart.belongsTo(Item, {
  foreignKey: "itemId",
  as: "item",
});
// Cart.sync({ force: true }).then(() => console.log("done"));
export default Cart;
