import {
    deleteCategory,
    addCategory,
    getCategories,
  } from "../daos/categories/categories.dao.js";
  
  export default class CategoryManager {
    constructor() {}
    obtenerCategorias = async () => {
      return await getCategories();
    };
  
    agregarCategoria = async (category) => {
      return await addCategory(category);
    };
  
    borrarCategoria = async (id) => {
      return await deleteCategory(id);
    };
  }