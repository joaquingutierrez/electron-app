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
    async findProductsByTitle(text) {
        const searchObj = new RegExp(text)
        const promiseFindProductBtTitle = new Promise((res, rej) => {
            productDB.find({ title: searchObj }, (err, docs) => {
                err ? rej(err) : res(docs)
            })
        })
        const data = await promiseFindProductBtTitle
        return data
    }
    async updateProduct(code, field, newValue) {
        const promiseUpdateProduct = new Promise((res, rej) => {
            productDB.findOne({ code: code }, (err, doc) => {
                if (err) {
                    return rej(err)
                }
                switch (field) {
                    case "title":
                        productDB.update({ code: code }, { $set: { title: newValue } })
                        break;
                    case "description":
                        productDB.update({ code: code }, { $set: { description: newValue } })
                        break
                    case "stock":
                        productDB.update({ code: code }, { $set: { stock: newValue } })
                        break
                    default:
                        break
                }
                res(doc)
            })
        })
        const data = await promiseUpdateProduct
        return data
    }
}

const productList = new ProductManager()

module.exports = {
    productList
}