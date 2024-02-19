import fs from "fs";
class Product {
  constructor(title, price, code, stock, description, status, category, thumb) {
    this.title = title;
    this.price = price;
    this.code = code;
    this.stock = stock;
    this.description = description;
    this.status = status;
    this.category = category;
    this.thumb = thumb;
  }
}

class ProductManager {
  #products;
  #productsDirPath;
  #productsFilePath;
  #fs;

  constructor() {
    this.#products = [];
    this.#productsDirPath = "src/files";
    this.#productsFilePath =
      this.#productsDirPath + "/products.json";
    this.#fs = fs;
  }
  /*=============================================
=             Crear directorio                =
=============================================*/
  createDir = async () => {
    try {
      await this.#fs.promises.mkdir(this.#productsDirPath, {
        recursive: true,
      });
      if (!this.#fs.existsSync(this.#productsFilePath)) {
        await this.#fs.promises.writeFile(this.#productsFilePath, "[]");
      }
    } catch (error) {
      console.log("error creando directorio y archivo", error);
      throw ("error creando directorio y archivo", error);
    }
  };
  /*=============================================
=     Crear un producto (con imagen)          =
=============================================*/
  addProduct = async (
    title,
    price,
    code,
    stock,
    description,
    status,
    category,
    thumb
  ) => {
    if (category === "") {
      category = "general";
    }

    let newProduct = new Product(
      title,
      price,
      code,
      stock,
      description,
      status,
      category,
      thumb
    );

    try {
      const exists = await this.getProducts();

      if (
        exists.find(
          (everyProduct) => everyProduct.code === newProduct.code
        )
      ) {
        throw new Error(
          `El producto con código ${newProduct.code} ya está en el archivo y no será agregado\n`
        );
      } else {
        let maxID = 0;

        if (exists.length > 0) {
          const idArray = exists.map((producto) => producto.id);
          maxID =
            idArray.length > 1
              ? idArray.reduce((a, b) => Math.max(a, b))
              : idArray[0];
        }
        this.#products.push({
          ...newProduct,
          id: maxID + 1,
        });

        await this.#fs.promises.writeFile(
          this.#productsFilePath,
          JSON.stringify(this.#products, null, 2, "\t")
        );
        let msj = `El producto fue agregado con éxito con id = ${maxID + 1
          } \n\n`;
        return msj;
      }
    } catch (error) {
      throw new Error(
        `Error creando producto nuevo: ${JSON.stringify(
          newProduct
        )}, detalle del ${error}`
      );
    }
  };
  /*=============================================
=             Obtener products               =
=============================================*/
  getProducts = async () => {
    try {
      await this.createDir();
      let readedProducts = await this.#fs.promises.readFile(
        this.#productsFilePath,
        "utf-8"
      );
      this.#products = JSON.parse(readedProducts);
      return this.#products;
    } catch (error) {
      throw new Error(
        `Error leyendo los products, detalle del error: ${error}`
      );
    }
  };
  /*=============================================
=          Obtener 1 producto según ID        =
=============================================*/
  getProductByID = async (id) => {
    const obtainedProducts = await this.getProducts();

    const foundedProducts = await obtainedProducts.find(
      (everyProduct) => everyProduct.id === id
    );
    if (foundedProducts) {
      return foundedProducts;
    } else {
      throw new Error(`No existe ningún producto con id = ${id}`);
    }
  };
  /*=============================================
=         Borrar producto según ID            =
=============================================*/
  deleteProductByID = async (id) => {
    try {
      const toDeleteProduct = await this.getProductByID(id);
      if (toDeleteProduct) {
        console.log(toDeleteProduct);
        this.#products.splice(this.#products.indexOf(toDeleteProduct), 1);
        await this.#fs.promises.writeFile(
          this.#productsFilePath,
          JSON.stringify(this.#products, null, 2, "\t")
        );

        let msj = `El producto con id ${id} fue borrado con éxito\n\n`;
        return msj;
      } else {
        throw "No existe el producto con el id indicado";
      }
    } catch (error) {
      throw new Error(
        `error al tratar de borrar el producto, detalle del ${error}`
      );
    }
  };
  /*=============================================
=        Modificar producto por ID            =
=============================================*/
  updateProductByID = async (id, propiedad, nuevoValor) => {
    try {
      const toModifyProduct = await this.getProductByID(id);

      if (toModifyProduct) {
        const indice = this.#products.indexOf(toModifyProduct);
        this.#products[indice][propiedad] = nuevoValor;
        await this.#fs.promises.writeFile(
          this.#productsFilePath,
          JSON.stringify(this.#products, null, 2, "\t")
        );
        let msj = `El producto con id ${id} fue modificado con éxito\n\n`;
        return msj;
      } else {
        throw "No existe un producto con el id indicado";
      }
    } catch (error) {
      return `Error al tratar de modificar el producto.\nDetalle del error: ${error}`;
    }
  };
  /*=============================================
=       Agregar 1 imagen a producto           =
=============================================*/
  uploadThumbByID = async (id, file) => {
    try {
      const toModifyProduct = await this.getProductByID(id);
      console.log(
        "producto cuya imagen se está agregando ",
        toModifyProduct
      );
      if (toModifyProduct) {
        const indice = this.#products.indexOf(toModifyProduct);
        this.#products[indice].thumb.push(file.replaceAll(" ", "%20"));
        await this.#fs.promises.writeFile(
          this.#productsFilePath,
          JSON.stringify(this.#products, null, 2, "\t")
        );
        let msj = `El producto con id ${id} fue modificado con éxito\n\n`;
        return msj;
      } else {
        throw "No existe un producto con el id indicado";
      }
    } catch (error) {
      return `Error al tratar de modificar el producto.\nDetalle del error: ${error}`;
    }
  };
}
export default ProductManager;
