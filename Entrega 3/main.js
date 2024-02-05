const ProductManager = require("./ProductManager.js")

let productManager = new ProductManager()


let modifProducts = async () => {
    //agrego un solo producto
    try {
        await productManager.addProduct("kayak", 3600, 5, 35, "color verde 3 mts", "./images/kayakverde3mts");

        let productos = await productManager.getProducts();
        console.log(
            `Productos encontrados en Product Manager: ${productos.length}`
        );
        console.log(productos);
        //busqueda por ID
        console.log("===Busco productos por id===\n\n");
        const id1 = 4;
        const id2 = "2323232";
        await productManager.getProductByID(id1); //existe
        await productManager.getProductByID(id2); //no existe
        //borrado de productos
        console.log("===Borrando producto por id===\n\n");
        await productManager.deleteProductByID(2);
        //modificación de productos
        console.log("===Modificando producto por id===\n\n");
        await productManager.updateProductByID(3, "stock", 30);
    } catch (error) {
        console.log("error al correr el programa");
    }

}

modifProducts()


