import CartManager from "../services/carts.service.js";
let cartManager = new CartManager();
const getCartController = async (req, res) => {
  try {
    res.send(await cartManager.getCartByID(req.params.cid));
  } catch (e) {
    res.status(404).send(e.message);
  }
};
const getCartsController = async (req, res) => {
  res.send(await cartManager.getCarts());
};

const addCartController = async (req, res) => {
  const carritoCreado = await cartManager.addCart();
  res.send(carritoCreado);
};

const addProductController = async (req, res) => {
  const cartID = req.params.cid;
  const prodID = req.params.pid;

  try {
    res.send(await cartManager.addProductToCartID(cartID, prodID));
  } catch (e) {
    throw e;
  }
};

const deleteCartController = async (req, res) => {
  res.send(await cartManager.deleteFullCartByID(req.params.id));
};

//borrar producto de carrito
const deleteProductController = async (req, res) => {
  const cartID = req.params.cid;
  const prodID = req.params.pid;

  try {
    res.send(await cartManager.deleteProductFromCart(cartID, prodID));
  } catch (e) {
    throw e;
  }
};
export {
  deleteProductController,
  deleteCartController,
  addProductController,
  addCartController,
  getCartsController,
  getCartController,
};