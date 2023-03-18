const { BrowserWindow, ipcMain } = require('electron')

const {productList} = require("./db/ProductManager")

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    win.loadFile('public/index.html')
}

ipcMain.on("newProduct", async (e, data) => {
    await productList.addProduct(data)
})

ipcMain.handle("producListReq",  async () => {
    const data = await productList.getAllProducts()
    return data
})
ipcMain.handle("findProductByTitle",  async (event, value) => {
    const data = await productList.findProductsByTitle(value)
    return data
})
ipcMain.handle("productDetail",  async (event, value) => {
    const data = await productList.getOneProduct(value)
    return data
})
ipcMain.handle("updateProduct",  async (event, code, field, newValue) => {
    const data = await productList.updateProduct(code, field, newValue)
    return data
})


module.exports = {
    createWindow
}