var path = require('path');
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var isDev = process.env.IS_DEV === "true";
function createWindow() {
    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : "file://".concat(path.join(__dirname, '../dist/index.html')));
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}
app.whenReady().then(function () {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
