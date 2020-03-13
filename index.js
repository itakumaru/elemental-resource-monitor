const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const windowStateKeeper = require("electron-window-state");

let mainWindow;
app.on("ready", () => {
    // Load the previous state
    let mainWindowState = windowStateKeeper();

    // Create a browser window
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: 252,
        height: 200,
        resizable: false,
        frame: false,
        autoHideMenuBar: true,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load index.html
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    mainWindowState.manage(mainWindow);
});

app.on("window-all-closed", () => {
    app.quit();
});
