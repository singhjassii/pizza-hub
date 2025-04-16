import Category from "@/models/category.model.js";

export const addCategory = async (req) => {
  try {
    const body = req;
    const newCategory = await Category.create(body);
    return newCategory;
  } catch (error) {
    console.error("Error adding category", error);
    throw new Error(error);
  }
};

export const getCategoryById = async (req) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      attributes: ["name", "description"],
    });
    return category;
  } catch (error) {
    console.error(`Error getting category`, error);
    throw new Error(error);
  }
};

export const editCategoryById = async (req) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const oldCategory = await Category.findByPk(id);
    const newCategory = await oldCategory.update(body);
    return newCategory;
  } catch (error) {
    console.error(`Error updating category`, error);
    throw new Error(error);
  }
};
