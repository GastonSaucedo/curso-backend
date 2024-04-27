import categoriesModel from "./categories.model.js";
const getCategories = async () => {
  return await categoriesModel.find().lean();
};

const addCategory = async (category) => {
  return await categoriesModel.create({ category });
};

const deleteCategory = async (id) => {
  return await categoriesModel.deleteOne({ _id: id });
};

export { deleteCategory, addCategory, getCategories };