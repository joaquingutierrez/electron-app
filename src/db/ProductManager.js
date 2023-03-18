const { productDB } = require("./connection")

class ProductManager {
    addProduct(product) {
        productDB.insert(product, (err) => {
            err ? console.log("Error al insertar el producto", err) : console.log("Producto agregado")
        })
    }
    deleteProduct(code) {
        productDB.remove({ code }, (err, numRemoved) => {
            err ? console.log("Error al eliminar el producto", err) : console.log("Producto eliminado con éxito")
        })
    }
    async getAllProducts() {
        const promiseGetAllProducts = new Promise((res, rej) => {
            productDB.find({}, (err, docs) => {
                err ? rej(err) : res(docs)
            })
        })
        const data = await promiseGetAllProducts
        return data
    }
    async getOneProduct(code) {
        const promiseGetOneProduct = new Promise((res, rej) => {
            productDB.findOne({ code: code }, (err, doc) => {
                err ? rej(err) : res(doc)
            })
        })
        const data = await promiseGetOneProduct
        return data
    }
}

    const productList = new ProductManager()

module.exports = {
    productList
}