import cartModel from "./carts.model.js";

const addCart = async (newCarrito) => {
  const carrito = await cartModel.create(newCarrito);
  return carrito;
};
//obtener carritos
const getCarts = async () => {
  const carritos = await cartModel.find().lean();
  return carritos;
};
//obtener carrito con id determinado
const getCartByID = async (id) => {
  const carrito = await cartModel.findOne({ _id: id }).lean();
  const result = carrito
    ? { success: true, data: { ...carrito } }
    : { success: false, message: "no se encontró ningún carrito con ese id" };
  return result;
};

//borrar carrito
const deleteFullCartByID = async (id) => {
  const result = await cartModel.deleteOne({ _id: id });
  return result;
};
const saveCart = async (carritoBuscado) => {
  await carritoBuscado.save();

  return carritoBuscado;
};

export { deleteFullCartByID, saveCart, getCartByID, getCarts, addCart };