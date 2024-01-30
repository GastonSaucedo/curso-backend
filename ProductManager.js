class Product {
    constructor(title, material, price, thumbnail, code, stock) {
        this.title = title
        this.material = material
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}


class ProductManager {
    #products
    #productsDirPath
    #productsFilePath
    #fileSystem

    constructor() {
        this.#products = new Array()
        this.#productsDirPath = "./files"
        this.#productsFilePath = this.#productsDirPath + "productos.json"
        this.#fileSystem = require("fs")
    }

    addProduct = async (title, material, price, thumbnail, code, stock) => {
        let newProduct = new Product(title, material, price, thumbnail, code, stock)
        console.log("Crear Usuario: Usuario a registrar:")
        console.log(newProduct)
        try {
            await this.#fileSystem.promises.mkdir(this.#productsDirPath, { recursive: true })

            if (!this.#fileSystem.existsSync(this.#productsFilePath)) await this.#fileSystem.promises.writeFile(this.#productsFilePath, "[]")

            let productsFile = await this.#fileSystem.promises.readFile(this.#productsFilePath, "utf-8")
            console.info("Archivo JSON obtenido desde archivo: ")
            console.log(productsFile)

            this.#products = JSON.parse(productsFile)
            console.log("Productos encontrados: ")
            console.log(this.#products)

            this.#products.push(newProduct)
            console.log("Lista de productos actualizada: ")
            console.log(this.#products)

            await this.#fileSystem.promises.writeFile(this.#productsFilePath, JSON.stringify(this.#products, null, 2, '\t'))

        } catch (error) {
            console.error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`)
            throw Error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`)
        }
    }



    listProducts = async () => {
        try {

            await this.#fileSystem.promises.mkdir(this.#productsDirPath, { recursive: true })
            if (!this.#fileSystem.existsSync(this.#productsFilePath)) await this.#fileSystem.promises.writeFile(this.#productsFilePath, "[]")

            let productsFile = await this.#fileSystem.promises.readFile(this.#productsFilePath, "utf-8")

        } catch {

        }
    }



}







/*     addProduct(product) {
        const requiredFields = ['title', 'material', 'price', 'thumbnail', 'code', 'stock'];
        for (let field of requiredFields) {
            if (!(field in product)) {
                throw new Error(`el campo ${field} es necesario en el producto`);
            }
        }

        const productExists = this.products.some(p => p.code === product.code);
        if (productExists) {
            console.log('Ya existe un producto con este codigo');
            return;
        }

        product.id = this.currentId++;
        this.products.push(product);
        console.log('producto añadido');
    }

    getproducts() {

        return console.log(this.products);
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.log('producto no encontrado');
        }
        return console.log(`La id solicitada pertenece a: ${JSON.stringify(product.title)}`);
    }
}



let productManager = new ProductManager();

let product1 = {
    title: 'Remera 1',
    material: 'Remera de Algodon',
    price: 60,
    thumbnail: './images/remera1',
    code: '1',
    stock: 10
};


let product2 = {
    title: 'Remera 2',
    material: 'Remera de Lino',
    price: 35,
    thumbnail: './images/remera2',
    code: '2',
    stock: 20
};


let product3 = {
    title: 'Remera 3',
    material: 'Remera deportiva',
    price: 75,
    thumbnail: './images/remera3',
    code: '2',
    stock: 20
};

productManager.addProduct(product1);
productManager.addProduct(product2);
productManager.addProduct(product3);

let products = productManager.getproducts();
let product = productManager.getProductById(2);

 */

module.exports = ProductManager