import productModel from "./products.model.js";

const getProducts = async (page, limit, sort) => {
  const products = await productModel.paginate(
    {},
    {
      page,
      limit,
      sort,
      lean: true,
    }
  );

  return products;
};

const addProduct = async (product) => {
  let productoNuevo = await productModel.create(product);
  return productoNuevo;
};
const getProductByID = async (id) => {
  const product = await productModel.findOne({ _id: id }).lean();
  return product;
};
const deleteProduct = async (id) => {
  let result = await productModel.deleteOne({ _id: id });
  return result;
};
const updateProductCategory = async (id, nuevo) => {
  const { category, ...sinCategoria } = nuevo;

  let result = await productModel.updateOne(
    { _id: id },
    {
      $addToSet: {
        category: nuevo.category[0],
      },
      $set: {
        ...sinCategoria,
      },
    }
  );
  return result;
};
const deleteProductCategory = async (id, cate) => {
  let result = await productModel.updateOne(
    { _id: id },
    {
      $pull: {
        category: cate,
      },
    }
  );
  return result;
};

export {
  deleteProductCategory,
  updateProductCategory,
  deleteProduct,
  getProductByID,
  getProducts,
  addProduct,
};