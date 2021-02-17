const { app, BrowserWindow, ipcMain, dialog } = require('electron')
//const { dialog } = require('electron').remote;

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('openFolder', (event) => {
    console.debug("main.js: openFolder");
    dialog.showOpenDialog({
        title: "Select a folder",
        properties: ["openDirectory"]
    }).then(result => {
        console.log("openned folder: " + result.filePaths + " " + result.canceled);
        event.reply("openFolderReply", result.filePaths);
    });
})