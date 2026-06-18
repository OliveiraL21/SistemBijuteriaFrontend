// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, autoUpdater, dialog } = require("electron");
const { autoUpdater: updater } = require('electron-updater');
const path = require("path");
const log = require('electron-log');

app.commandLine.appendSwitch('high-dpi-support', 'true');
app.commandLine.appendSwitch('force-device-scale-factor', '1');

updater.logger = log;
updater.logger.transports.file.level = 'info';


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: app.platform === 'linux' ? path.join(__dirname, 'dist/sistem-bijuteria-frontend/browser/assets/images/diamond-ring.png') : path.join(__dirname, 'dist/sistem-bijuteria-frontend/browser/assets/images/diamond-ring.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "dist/sistem-bijuteria-frontend/browser/preload.js"),
    },

  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'dist/sistem-bijuteria-frontend/browser/index.html'));

  // // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  updater.checkForUpdatesAndNotify();

  if (process.platform === 'linux') {
    app.setDesktopName('bijus-da-manu.desktop');
  }
});

updater.on('checking-for-update', () => {
  log.info('Verificando atualizações...');
});

updater.on('update-available', (info) => {
  log.info('Atualização disponível.');
  // Opcional: Avisar o usuário que está baixando
});

updater.on('update-not-available', (info) => {
  log.info('Nenhuma atualização disponível.');
});

updater.on('error', (err) => {
  log.error('Erro na atualização: ', err);
});


updater.on('update-downloaded', (info) => {
  dialog.showMessageBox({
    type: 'info',
    title: 'Atualização Disponível',
    message: 'Uma nova versão foi baixada. Deseja instalar agora?',
    buttons: ['Sim', 'Depois']
  }).then(result => {
    if (result.response === 0) {
      updater.quitAndInstall();
    }
  })
});


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
