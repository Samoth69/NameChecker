const { app, BrowserWindow, ipcRenderer } = require('electron');
const fs = require('fs');

ipcRenderer.on("openFolderReply", (event, path) => {
    console.debug("app.js: openFolderReply: " + path)

})

function openFolder() {
    console.debug("app.js: openFolder()");
    ipcRenderer.send("openFolder");
}

class Episode {
    constructor(path, content) {
        this.path = path;
        try {
            this.content = JSON.parse(content);
        } catch(e) {
            console.error("failed parsing json for " + path);
            this.content = "";
        }
    }

    get path() {
        return this.path;
    }

    get content() {
        return this.content;
    }
}