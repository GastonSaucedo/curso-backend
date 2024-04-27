import CategoryManager from "../services/categories.service.js";
let categoryManager = new CategoryManager();
const getCategoriesController = async (req, res) => {
  try {
    const categorias = await categoryManager.getCategories();

    return res.send(categorias);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const addCategoryController = async (req, res) => {
  const nuevaCate = req.body.cate;

  try {
    await categoryManager.addCategory(nuevaCate);
    res.send("<p>La categoría se agregó con éxito</p>");
  } catch (e) {
    res.status(500).send(e.message);
  }
};
export { getCategoriesController, addCategoryController };