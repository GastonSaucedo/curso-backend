const ProductManager = require("./ProductManager.js")
let productManager = new ProductManager()


let modifProducts = async () => {
    await productManager.addProduct("Remera 1", "Algodon", 60, "./images/remera1", "1", 10)
    let products = await productManager.listProducts()
    console.log(`Usuarios encontrados en Product Manager: ${products.length}`)
    console.log(products)
}

modifProducts()