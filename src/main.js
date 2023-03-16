const { BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })

    win.loadFile('public/index.html')
}

module.exports = {
    createWindow
}