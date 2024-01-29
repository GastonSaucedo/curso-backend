class ProductManager {
    constructor() {
        this.products = [];
        this.currentId = 1;
    }

    addProduct(product) {
        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
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
    description: 'Remera de Algodon',
    price: 60,
    thumbnail: './images/remera1',
    code: '1',
    stock: 10
};


let product2 = {
    title: 'Remera 2',
    description: 'Remera de Lino',
    price: 35,
    thumbnail: './images/remera2',
    code: '2',
    stock: 20
};


let product3 = {
    title: 'Remera 3',
    description: 'Remera deportiva',
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