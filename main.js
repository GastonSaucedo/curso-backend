class ProductManager {
    constructor() {
        this.productos = [];
        this.currentId = 1;
    }

    addProduct(producto) {
        const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
        for (let field of requiredFields) {
            if (!(field in producto)) {
                throw new Error(`el campo ${field} es necesario`);
            }
        }

        const productExists = this.productos.some(p => p.code === producto.code);
        if (productExists) {
            console.log('Ya existe un producto con este codigo');
            return;
        }

        producto.id = this.currentId++;
        this.productos.push(producto);
        console.log('Producto añadido');
    }

    getproductos() {

        return console.log(this.productos);
    }

    getProductById(id) {
        const producto = this.productos.find(p => p.id === id);
        if (!producto) {
            console.log('Producto no encontrado');
        }
        return console.log(`La id solicitada pertenece a: ${JSON.stringify(producto.title)}`);
    }

}


let productManager = new ProductManager();

let producto1 = {
    title: 'Remera 1',
    description: 'Remera de Algodon',
    price: 60,
    thumbnail: './images/remera1',
    code: '1',
    stock: 10
};


let producto2 = {
    title: 'Remera 2',
    description: 'Remera de Lino',
    price: 35,
    thumbnail: './images/remera2',
    code: '2',
    stock: 20
};


let producto3 = {
    title: 'Remera 3',
    description: 'Remera deportiva',
    price: 75,
    thumbnail: './images/remera3',
    code: '2',
    stock: 20
};

productManager.addProduct(producto1);
productManager.addProduct(producto2);
productManager.addProduct(producto3);

let productos = productManager.getproductos();
let producto = productManager.getProductById(2); 