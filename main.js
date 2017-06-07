// Require Electron and Node.js modules
var electron = require('electron');
var app = electron.app;
var Tray = electron.Tray;

var BrowserWindow = electron.BrowserWindow;

var path = require('path');
var url = require('url');


// Global reference of the window object
var win;
var tray;


// w432 h702 +500 for devtool
function createWindow () {
    
   tray = new Tray(path.join(__dirname, 'app_icons/tray_icon.png'));
    
  // Create the browser window.
  win = new BrowserWindow({width:330, 
                           height:500, 
                           minWidth: 330, 
                           minHeight: 500, 
                           maxHeight:520, 
                           maxWidth:330, 
                           x: 2000, 
                           y: 0, 
                           titleBarStyle: 'hidden-inset', 
                           fullscreenable:false, 
                           backgroundColor:'#333'});


  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'www/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
//  win.webContents.openDevTools()

tray.on('click', () => {
  win.isVisible() ? win.hide() : win.show()
})
win.on('show', () => {
  tray.setHighlightMode('never')
})
win.on('hide', () => {
  tray.setHighlightMode('never')
})

    
    
  // Emitted when the window is closed.
  win.on('closed', function(){
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function(){
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  //if (process.platform !== 'darwin') {
    app.quit();
  //};
});

app.on('activate', function(){
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


