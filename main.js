const electron = require('electron');
const {ipcMain} = require('electron');

// Module to control application life.
const app = electron.app

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Other global variables
global.gestureLabelsOn = true;
global.gestureControlOn = true;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 760,
    'minWidth': 1300,
    'minHeight': 760,
    resizable: true
  });

  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/html/index.html`)
  // mainWindow.loadURL(`file://${__dirname}/views/draw.html`)

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Loads new url clicked from sidebar navigation
ipcMain.on('changeWindow', function(event, arg) {
  mainWindow.loadURL(`file://${__dirname}/html/` + arg)
});

// Change global variables
ipcMain.on('changeGlobal', function(event, varName, setting) {

  if(varName.localeCompare("gestureLabelsOn") == 0) {
    global.gestureLabelsOn = setting;
  }

  if(varName.localeCompare("gestureControlOn") == 0) {
    global.gestureControlOn = setting;
  }
});
