const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

// 기본 크기 720p 세팅
const width = 1280;
const height = 720;

let mainWindow;

function createWindow() {
  // Electron Node 빌트인 함수 not defined 이슈: {webPreferences: { nodeIntegration: true } 추가
  mainWindow = new BrowserWindow({webPreferences: { nodeIntegration: true }, width, height });
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  
  // Dev 모드일 때 개발자 도구 활성화
  // if (isDev) {
  //   mainWindow.webContents.openDevTools();
  // }

  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});