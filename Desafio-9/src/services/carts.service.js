import {
    deleteFullCartByID,
    saveCart,
    getCartByID,
    getCarts,
    addCart,
  } from "../daos/carts/carts.dao.js";
  import { getProductByID } from "../daos/products/products.dao.js";
  
  /*import {
    saveCart,
    getCartByID,
    getCarts,
    addCart,
  } from "../daos/fs/carts.fs.dao.js";
  import { getProductByID } from "../daos/fs/products.fs.dao.js";*/
  
  class CartManager {
    //carrito vacío
    agregarCarrito = async () => {
      let newCarrito = {
        products: [],
      };
      const carrito = await addCart(newCarrito);
      return carrito;
    };
    //obtener carritos
    obtenerCarritos = async () => {
      return await getCarts();
    };
    //obtener carrito con id determinado
    obtenerCarritoPorID = async (id) => {
      return await getCartByID(id);
    };
    //agregar producto a un carrito específico
    agregarProductoAcarrito = async (id, productID) => {
      let carritoBuscado = await getCartByID(id);
      if (!carritoBuscado) {
        throw new Error("Carrito no encontrado");
      }
      const producto = await getProductByID(productID); //para verificar que exista un producto con ese id
      if (!producto) {
        throw new Error("producto no encontrado");
      }
  
      const productIndex = carritoBuscado.cart.findIndex(
        (productItem) => productItem.product._id.toString() === productID
      );
  
      if (productIndex === -1) {
        carritoBuscado.cart.push({ product: productID, qty: 1 });
      } else {
        carritoBuscado.cart[productIndex].qty++;
      }
  
      await saveCart(carritoBuscado);
  
      return carritoBuscado;
    };
  
    //borrar carrito
    borrarCarritoPorID = async (id) => {
      const result = await deleteFullCartByID(id);
      return result;
    };
  
    //borrar producto de un carrito específico
    borrarProductoDeCarrito = async (id, productID) => {
      let carritoBuscado = await getCartByID(id);
  
      if (!carritoBuscado) {
        throw new Error("Carrito no encontrado");
      }
  
      const productIndex = carritoBuscado.cart.findIndex(
        (productItem) => productItem.product._id.toString() === productID
      );
  
      if (productIndex === -1) {
        throw new Error("el producto indicado no existe en el carrito");
      } else {
        carritoBuscado.cart.splice(productIndex, 1);
      }
  
      await saveCart(carritoBuscado);
  
      return carritoBuscado;
    };
  }
  
  export default CartManager;