import sequelize from "@/config/db";
import Cart from "@/models/cart.model";
import Order from "@/models/orders.model.js";

export const addOrder = async (req) => {
  try {
    const {
      body: { cartBody, ...orderBody },
    } = req;
    let transaction;
    try {
      transaction = await sequelize.transaction();
      const order = await Order.create(orderBody);
      const cart = await Cart.bulkCreate(
        cartBody.map((item) => ({ ...item, orderId: order.id }))
      );
      await transaction.commit();
      return { order, cart };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw new Error(`Error in Transaction`, error);
    }
  } catch (error) {
    console.error("Error creating order", error);
    throw new Error(error);
  }
};
