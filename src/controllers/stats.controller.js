/* eslint-disable style/quotes */
import sequelize from "@/config/db";
import Cart from "@/models/cart.model";
import Category from "@/models/category.model";
import Item from "@/models/items.model";
import Order from "@/models/orders.model";
import User from "@/models/user.model";
import { format, startOfDay, subDays } from "date-fns";
import { Op } from "sequelize";

export const getSalesByCategory = async () => {
  try {
    const cart = await Cart.findAll({
      attributes: ["quantity"],
      include: [
        {
          model: Item,
          attributes: ["price"],
          as: "item",
          include: {
            model: Category,
            attributes: ["name"],
            as: "category",
          },
        },
      ],
    });
    const salesByCategory = cart.reduce((data, { item, quantity }) => {
      if (data[item.category.name]) {
        data[item.category.name] += item.price * quantity;
      } else {
        data[item.category.name] = item.price * quantity;
      }
      return data;
    }, {});
    const result = [];
    for (const [name, totalSales] of Object.entries(salesByCategory)) {
      result.push({ name, totalSales });
    }
    return result;
  } catch (error) {
    console.error(`Error getting sales by category`, error);
    throw new Error(error);
  }
};
export const getTotalCount = async () => {
  try {
    const [totalUsers, totalCategories, totalItems, totalOrders] =
      await Promise.all([
        User.count(),
        Category.count(),
        Item.count(),
        Order.count(),
      ]);
    return { totalUsers, totalCategories, totalItems, totalOrders };
  } catch (error) {
    console.error(`Error getting Total Count`, error);
  }
};

export const getOrdersLast7Days = async () => {
  // Get today and 6 days before
  const today = new Date();
  const sevenDaysAgo = subDays(startOfDay(today), 6);

  // Fetch orders grouped by day
  const orders = await Order.findAll({
    attributes: [
      [sequelize.fn("TO_CHAR", sequelize.col("created_at"), "Dy"), "day"],
      [sequelize.fn("DATE_TRUNC", "day", sequelize.col("created_at")), "date"],
      [sequelize.fn("COUNT", sequelize.col("id")), "count"],
    ],
    where: {
      created_at: {
        [Op.gte]: sevenDaysAgo,
      },
    },
    group: [
      sequelize.literal(`DATE_TRUNC('day', "created_at")`),
      sequelize.literal(`TO_CHAR("created_at", 'Dy')`),
    ],
    order: [[sequelize.literal(`DATE_TRUNC('day', "created_at")`), "ASC"]],
    raw: true,
  });

  // Create a default structure for the last 7 days
  const result = [];
  for (let i = 0; i < 7; i++) {
    const date = subDays(startOfDay(today), 6 - i);
    const label = format(date, "EEE"); // 'Mon', 'Tue', etc.
    const orderObj = orders.find(
      (o) => format(new Date(o.date), "EEE") === label
    );
    result.push({
      day: label,
      order: orderObj ? Number.parseInt(orderObj.count) : 0,
    });
  }
  return result;
};

export const getTop10ItemsByRevenue = async () => {
  try {
    const topItems = await Cart.findAll({
      attributes: [
        [sequelize.col("item.name"), "itemName"],
        [
          sequelize.fn(
            "SUM",
            sequelize.literal('"cart"."quantity" * "item"."price"')
          ),
          "totalRevenue",
        ],
      ],
      include: [
        {
          model: Item,
          as: "item",
          attributes: [],
        },
      ],
      group: ["item.id", "item.name"],
      order: [
        [
          sequelize.fn(
            "SUM",
            sequelize.literal('"cart"."quantity" * "item"."price"')
          ),
          "DESC",
        ],
      ],
      limit: 15,
      raw: true,
    });
    return topItems.map(({ itemName, totalRevenue }) => ({
      name: itemName,
      revenue: Number.parseInt(totalRevenue),
    }));
  } catch (error) {
    console.error("Error fetching top items by revenue:", error);
    throw error;
  }
};
getTop10ItemsByRevenue();
