import {
  CATEGORY_RESOURCE,
  ITEM_RESOURCE,
  ORDER_RESOURCE,
  USER_RESOURCE,
} from "@/constants/resources.js";

import Category from "@/models/category.model";
import Item from "@/models/items.model";
import Order from "@/models/orders.model";
import User from "@/models/user.model";
import sequelize from "./db";

export default {
  [CATEGORY_RESOURCE]: {
    model: Category,
    attributes: ["id", "name", "description"],
    order: [["created_at", "ASC"]],
  },
  [ITEM_RESOURCE]: {
    model: Item,
    attributes: [
      "id",
      "name",
      "description",
      "itemImage",
      "price",
      "availability",
      [sequelize.col("category.name"), "categoryName"],
    ],
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["name"],
      },
    ],
    order: [["updated_at", "DESC"]],
  },
  [ORDER_RESOURCE]: {
    model: Order,
    attributes: [
      "id",
      "address",
      "orderList",
      "totalBill",
      [sequelize.col("customer.name"), "customerName"],
      [sequelize.col("customer.phoneNumber"), "customerNumber"],
    ],
    include: [
      {
        model: User,
        as: "customer",
        attributes: ["name", "phoneNumber"],
      },
    ],
    order: [["updated_at", "DESC"]],
  },
  [USER_RESOURCE]: {
    model: User,
    attributes: ["id", "name", "email", "phoneNumber", "isVerified"],
    order: [["updated_at", "DESC"]],
  },
};
