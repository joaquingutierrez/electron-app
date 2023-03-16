const { BrowserWindow, ipcMain } = require('electron')

const {store} = require("./dabase")

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

ipcMain.on("newProduct", (e, data) => {
    store.set(data.code, data)
})

module.exports = {
    createWindow
}