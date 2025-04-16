import Item from "@/models/items.model.js";
import uploadFilesToCloudinary from "@/utils/uploadFilesToCloudinary";
import { Op } from "sequelize";

export const addItem = async (req) => {
  try {
    const { itemImage, ...rest } = req;
    const [{ url }] = await uploadFilesToCloudinary([itemImage]);
    const newItem = await Item.create({ itemImage: url, ...rest });
    return newItem;
  } catch (error) {
    console.error("Error adding item", error);
    throw new Error(error);
  }
};
export const editItemById = async (req) => {
  try {
    const { id } = req.params;
    const { itemImage, ...rest } = req.body;
    const oldItem = await Item.findByPk(id);
    if (typeof itemImage === "string") {
      const updatedItem = await oldItem.update({ itemImage, ...rest });
      return updatedItem;
    } else {
      const [{ url }] = await uploadFilesToCloudinary([itemImage]);
      const updatedItem = await oldItem.update({ itemImage: url, ...rest });
      return updatedItem;
    }
  } catch (error) {
    console.error("Error updating item", error);
    throw new Error(error);
  }
};
export const getItemById = async (req) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id, {
      attributes: [
        "name",
        "description",
        "categoryId",
        "itemImage",
        "price",
        "availability",
      ],
    });
    return item;
  } catch (error) {
    console.error(`Error getting category`, error);
    throw new Error(error);
  }
};
export const getItemsByCategory = async (req) => {
  try {
    const { id } = req.params;
    const items = await Item.findAll({
      where: { categoryId: id, availability: "yes" },
      attributes: [
        "id",
        "name",
        "description",
        "categoryId",
        "itemImage",
        "price",
        "availability",
      ],
    });
    return items;
  } catch (error) {
    console.error(`Error getting items by category`, error);
    throw new Error(error);
  }
};
export const getItemsByIds = async (req) => {
  try {
    const { ids } = req.body;
    const items = await Item.findAll({
      where: { id: { [Op.in]: ids } },
      attributes: ["id", "name", "description", "itemImage", "price"],
    });
    return items;
  } catch (error) {
    console.error(`Error getting items by ids`, error);
    throw new Error(error);
  }
};
