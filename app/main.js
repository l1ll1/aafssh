var app = require('app'); 
var argv = require('yargs').parse(process.argv.slice(1));


// browser-window creates a native window
var BrowserWindow = require('browser-window');
var mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function () {
  sshauthz(argv.oauthurl)
});


function sshauthz(url) {
    authWindow = new BrowserWindow({ webPreferences: 
        { nodeIntegration: false, 
          webSecurity: false, 
          allowRunningInsecureContent: true, 
          allowDisplayingInsecureContent: true }, 
        frame: true,
        useContentSize: true,
        enableLargerThanScreen: true,
        show: false });
    authWindow.loadURL(url);
    authWindow.webContents.on('dom-ready', function(event) {
        authWindow.show();
        currenturl=authWindow.getURL();
        if (currenturl.indexOf("http://localhost:5000/") === 0){
            access_token = currenturl.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
            authWindow.close()
            console.log("access_token: "+access_token)
        }
    });
}
