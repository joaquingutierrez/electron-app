const Datastore = require("nedb")

const productDB = new Datastore({filename: "./src/db/productsDB.nedb", autoload: true})
productDB.ensureIndex({fieldName: "code", unique: true}, (err) => {
    if (err) console.log("El codigo ya existe", err)
})

module.exports = {
    productDB
}