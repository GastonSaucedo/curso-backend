import fs from "fs";
import ProductManager from "./ProductManager.js";
let productManager = new ProductManager();
class CartManager {
  #cart;
  #cartDirPath;
  #cartFilePath;
  #fs;

  constructor() {
    this.#cart = [];
    this.#cartDirPath = "src/files";
    this.#cartFilePath = this.#cartDirPath + "/cart.json";
    this.#fs = fs;
  }
  /*=============================================
=             Crear directorio                =
=============================================*/
  createDir = async () => {
    try {
      await this.#fs.promises.mkdir(this.#cartDirPath, {
        recursive: true,
      });
      if (!this.#fs.existsSync(this.#cartFilePath)) {
        await this.#fs.promises.writeFile(this.#cartFilePath, "[]");
      }
    } catch (error) {
      throw ("error creando directorio y archivo", error);
    }
  };

  /*=============================================
=           Crear un cart vacío            =
=============================================*/
  addCart = async () => {
    let newCart = {
      products: [],
    };

    try {
      const exists = await this.getCarts();

      let maxID = 0;

      if (exists.length > 0) {
        const idArray = exists.map((cart) => cart.id);
        maxID =
          idArray.length > 1
            ? idArray.reduce((a, b) => Math.max(a, b))
            : idArray[0];
      }

      this.#cart.push({
        ...newCart,
        id: maxID + 1,
      });

      await this.#fs.promises.writeFile(
        this.#cartFilePath,
        JSON.stringify(this.#cart, null, 2, "\t")
      );
      let msj = `El cart se ha generado con éxito con id ${maxID + 1}\n\n`;
      return msj;
    } catch (error) {
      console.error(
        `Error creando el cart nuevo: ${JSON.stringify(
          cartNuevo
        )}, detalle del error: ${error}`
      );
      throw new Error(
        `Error creando cart nuevo: ${JSON.stringify(
          cartNuevo
        )}, detalle del ${error}`
      );
    }
  };
  /*=============================================
=       Mostrar todos los  cart           =
=============================================*/
  getCarts = async () => {
    try {
      await this.createDir();
      let readedCart = await this.#fs.promises.readFile(
        this.#cartFilePath,
        "utf-8"
      );
      this.#cart = JSON.parse(readedCart);
      return this.#cart;
    } catch (error) {
      console.error(`Error leyendo los products, detalle del error: ${error}`);
      throw new Error(`Error leyendo los products, detalle del ${error}`);
    }
  };
  /*=============================================
=            Mostrar cart por ID           =
=============================================*/
  getCartByID = async (id) => {
    try {
      const cart = await this.getCarts();
      if (!cart) {
        throw "error al leer los cart";
      }
      const foundedCart = cart.find(
        (everyCart) => everyCart.id === id
      );
      console.log("cart encontrado ", foundedCart);
      if (foundedCart) {
        return foundedCart;
      } else {
        throw `No existe ningún cart con id = ${id}`;
      }
    } catch (error) {
      console.error(`Error leyendo cart by id, detalle: ${error}`);
      throw new Error(`Error leyendo cart by id, detalle: ${error}`);
    }
  };
  /*=============================================
=  Agregar prod. a cart con ID específico  =
=============================================*/
  addProductToCartID = async (id, productID) => {
    try {
      await productManager.getProductByID(productID);
    } catch (e) {
      return e.message;
    }
    try {
      const searchedCart = await this.getCartByID(id);

      const index = this.#cart.indexOf(searchedCart);
      const products = searchedCart.products;
      const verifyProduct = products.find(
        (cadaproducto) => cadaproducto.productID === productID
      );
      if (verifyProduct) {
        const indexProd = products.indexOf(verifyProduct);
        const newQuantity = searchedCart.products[indexProd].qty + 1;
        this.#cart[index].products[indexProd].qty = newQuantity;
      } else {
        let newProduct = {
          productID: productID,
          qty: 1,
        };
        searchedCart.products.push(newProduct);

        this.#cart[index].products = searchedCart.products;

        await this.#fs.promises.writeFile(
          this.#cartFilePath,
          JSON.stringify(this.#cart, null, 2, "\t")
        );
      }
      let msj = `El producto con id = ${productID} se ha agregado con éxito al cart con id = ${id}`;
      return msj;
    } catch (error) {
      console.error(
        `Error leyendo en método "add product to cart", detalle: ${error}`
      );
      return error.message;
    }
  };
  /*=============================================
=        Borrar un cart completo           =
=============================================*/
  deleteFullCartByID = async (id) => {
    try {
      const toDeleteCart = await this.getCartByID(id);
      if (toDeleteCart) {
        this.#cart.splice(this.#cart.indexOf(toDeleteCart), 1);
        await this.#fs.promises.writeFile(
          this.#cartFilePath,
          JSON.stringify(this.#cart, null, 2, "\t")
        );

        let msj = `El cart con id ${id} fue borrado con éxito\n\n`;
        return msj;
      } else {
        throw "No existe el cart con el id indicado";
      }
    } catch (error) {
      console.error(
        `error al tratar de borrar el cart, detalle del error: ${error}`
      );
      throw new Error(
        `error al tratar de borrar el cart, detalle del ${error}`
      );
    }
  };
}

export default CartManager;
