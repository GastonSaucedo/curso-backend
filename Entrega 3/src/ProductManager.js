import fs from "fs";


class Product {
    constructor(title, price, code, stock, description, thumb) {
        this.title = title;
        this.price = price;
        this.code = code;
        this.stock = stock;
        this.description = description;
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
        this.#productsDirPath = "./files";
        this.#productsFilePath = this.#productsDirPath + "/products.json";
        this.#fs = fs;
    }




    // CREACION DE DIRECTORIO Y VERIFICACION DE EXISTENCIA DE ARCHIVO
    createDir = async () => {

        try {
            await this.#fs.promises.mkdir(this.#productsDirPath, { recursive: true });
            if (!this.#fs.existsSync(this.#productsFilePath)) {
                console.log("el archivo no existe => se crea vacío");
                await this.#fs.promises.writeFile(this.#productsFilePath, "[]");
            }
        } catch (error) {
            console.log("error creando directorio y archivo", error);
            throw ("error creando directorio y archivo", error);
        } finally {
        }
    };





    // AGREGAR PRODUCTOS A LA LISTA
    addProduct = async (title, price, code, stock, description, thumb) => {

        //verifico si tiene todos los datos. Si no los tiene interrumpe el proceso
        if (!title || !price || !code || !stock || !description || !thumb) {
            return console.log(
                `Al producto con nombre ${title} le faltan uno o más datos y no será agregado \n`
            );
        }
        //creo el producto nuevo con la clase Producto
        let newProduct = new Product(
            title,
            price,
            code,
            stock,
            description,
            thumb
        );

        try {
            await this.getProducts();

            if (
                this.#products.find(
                    (products) => products.code === newProduct.code
                )
            ) {
                return console.log(
                    `El producto con código ${newProduct.code} ya está en el archivo y no será agregado\n`
                );
            } else {
                let maxID = 0;
                //busco el máximo id para generar un ID nuevo (la opción con length deja de funcionar cuando borro products porque (length + 1) pasa a ser menor que el máximo id que se había generado antes de borrar los products)
                if (this.#products.length > 0) {
                    const arrayDeID = this.#products.map((product) => product.id);
                    maxID =
                        arrayDeID.length > 1
                            ? arrayDeID.reduce((a, b) => Math.max(a, b))
                            : arrayDeID[0];
                }
                this.#products.push({
                    ...newProduct,
                    id: maxID + 1,
                });

                console.log("Lista actualizada de products: ");
                console.log(this.#products);

                await this.#fs.promises.writeFile(
                    this.#productsFilePath,
                    JSON.stringify(this.#products, null, 2, "\t")
                );
                console.log(
                    `El producto con código ${newProduct.code} fue agregado con éxito\n\n`
                );
            }
        } catch (error) {
            console.error(
                `Error creando el producto nuevo: ${JSON.stringify(
                    newProduct
                )}, detalle del error: ${error}`
            );
            throw Error(
                `Error creando producto nuevo: ${JSON.stringify(
                    newProduct
                )}, detalle del error: ${error}`
            );
        } finally {

        }
    };




    // LEO EL ARCHIVO Y OBTENGO LOS PRODUCTOS
    getProducts = async () => {
        try {

            await this.createDir();
            let readedProducts = await this.#fs.promises.readFile(
                this.#productsFilePath,
                "utf-8"
            );
            this.#products = JSON.parse(readedProducts);

            console.log("products Leidos y parseados: ", this.#products);
            return this.#products;
        } catch (error) {
            console.error(
                `Dentro de getProducts: Error leyendo los products, detalle del error: ${error}`
            );
            throw Error(
                `Dentro de getProducts: Error leyendo los products, detalle del error: ${error}`
            );
        }
    };



    //   LEO EL ARCHIVO Y VERIFICO SI EXISTE UN PRODUCTO CON LA DETERMINADA ID
    getProductByID = async (id) => {
        try {
            await this.getProducts();

            const foundedProduct = this.#products.find(
                (products) => products.id === id
            );
            foundedProduct
                ? console.log(
                    "El producto encontrado con id: ",
                    id,
                    " es el siguiente: ",
                    foundedProduct
                )
                : console.log("No se encontró el producto con el id ", id);

            return foundedProduct;
        } catch (error) {
            console.error(
                `Error leyendo los products en get product by id, detalle del error: ${error}`
            );
            throw Error(
                `Error leyendo los products en get product by id, detalle del error: ${error}`
            );
        } finally {

        }
    };

    // BORRAR PRODUCTO CON LA ID SELECCIONADA
    deleteProductByID = async (id) => {
        try {

            const productoAborrar = await this.getProductByID(id);
            if (productoAborrar) {
                this.#products.splice(this.#products.indexOf(productoAborrar), 1);
                await this.#fs.promises.writeFile(
                    this.#productsFilePath,
                    JSON.stringify(this.#products, null, 2, "\t")
                );
                console.log(`El producto con id ${id} fue borrado con éxito\n\n`);
                console.log(
                    "el nuevo archivo de products es el siguiente: ",
                    this.#products
                );
            } else {
                console.log("no existe el id indicado");
            }
        } catch (error) {
            console.log(
                `error al tratar de borrar el producto, detalle del error: ${error}`
            );
        } finally {

        }
    };

    /* Método updateProductByID: Modificar producto con un id determinado
     *
     *
     */
    updateProductByID = async (id, propiedad, nuevoValor) => {
        try {
            console.log("===Empieza función update===\n\n");
            const productoAmodificar = await this.getProductByID(id);
            console.log("Producto a modificar ", productoAmodificar);
            if (productoAmodificar) {
                const indice = this.#products.indexOf(productoAmodificar);
                this.#products[indice][propiedad] = nuevoValor;
                await this.#fs.promises.writeFile(
                    this.#productsFilePath,
                    JSON.stringify(this.#products, null, 2, "\t")
                );
                console.log(`El producto con id ${id} fue modificado con éxito\n\n`);
                console.log(
                    "el nuevo archivo de products es el siguiente: ",
                    this.#products
                );
            } else {
                console.log("no existe el id indicado");
            }
        } catch (error) {
            console.log(
                `error al tratar de modificar el producto, detalle del error: ${error}`
            );
        } finally {

        }
    };
}

export default ProductManager;