import Sequelize from "sequelize";
import db from "../config/db.js";
import Category from "./category.model.js";

const Item = db.define(
  "Item",
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
          msg: "Items name is required.",
        },
        len: {
          args: [1, 100],
          msg: "Items name should have 1 to 100 characters.",
        },
      },
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "item price is required",
        },
      },
    },
    itemImage: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "item image is required",
        },
      },
    },
    availability: {
      type: Sequelize.ENUM("yes", "no"),
      allowNull: false,
      defaultValue: "yes",
      validate: {
        isIn: {
          args: [["yes", "no"]],
          msg: "availability contains invalid value",
        },
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Items description is required.",
        },
        len: {
          args: [1, 255],
          msg: "Items name should have 1 to 255 characters.",
        },
      },
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
      validate: {
        notNull: {
          msg: "category id is required",
        },
      },
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    timestamps: true,
  }
);
// Item.sync({ alter: true }).then(() => console.log("done"));
Category.hasMany(Item, {
  foreignKey: "categoryId",
  as: "category",
});
Item.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});
export default Item;
