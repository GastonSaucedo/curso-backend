import {
    deleteProductCategory,
    updateProductCategory,
    deleteProduct,
    getProductByID,
    getProducts,
    addProduct,
  } from "../daos/products/products.dao.js";
  
  /*import {
    deleteProduct,
    getProductByID,
    getProducts,
    addProduct,
  } from "../daos/fs/products.fs.dao.js";*/
  
  export default class ProductManager {
    constructor() {}
  
    obtenerProductos = async (page, limit, sort) => {
      return await getProducts(page, limit, sort);
    };
  
    agregarProductos = async (product) => {
      return await addProduct(product);
    };
    obtenerProductoPorID = async (id) => {
      return await getProductByID(id);
    };
    borrarProducto = async (id) => {
      return await deleteProduct(id);
    };
    actualizarCategoriasDeProducto = async (id, nuevo) => {
      const result = updateProductCategory(id, nuevo);
  
      if (result.modifiedCount > 0) {
        const modificado = await getProductByID(id);
        return { modificado };
      } else {
        return result;
      }
    };
    borrarCategoriaDeProducto = async (id, cate) => {
      let result = await deleteProductCategory(id, cate);
      if (result.modifiedCount > 0) {
        const modificado = await getProductByID(id);
        return { modificado };
      } else {
        return result;
      }
    };
  }