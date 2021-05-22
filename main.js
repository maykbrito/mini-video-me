const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const customSize = 300;
const bigFactor = 2.4; // how much enlarge when double click video
let win, smallPosition, bigPosition, tray, videoInputArrayFormatted;

const updatePositions = {
  big: () => {
    // memo small position
    smallPosition = win.getBounds();

    if (!bigPosition) {
      // first time enter, configure big video
      const { x, y } = smallPosition;
      const proportion = customSize * bigFactor;
      bigPosition = {
        x: x - proportion,
        y: y - proportion,
        width: proportion,
        height: proportion
      };
    }

    // move and make it bigger
    win.setBounds(bigPosition, true);
  },
  small: () => {
    // memo big position
    bigPosition = win.getBounds();

    // move and make it smaller
    win.setBounds(smallPosition, true);
  }
};

ipcMain.on('double-click', (event, arg) => {
  const size = arg ? 'small' : 'big';
  updatePositions[size]();
});

function createWindow() {
  win = new BrowserWindow({
    width: customSize,
    height: customSize,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    transparent: true,
    alwaysOnTop: true,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
  win.setSkipTaskbar(true); //remove application from task bar
  win.setVisibleOnAllWorkspaces(true);
}

app.whenReady().then(createWindow);

function createTray(videoInputMenuItens) {
  tray = new Tray(path.join(__dirname, 'assets', 'webcam.ico'));

  tray.setToolTip('Mini Video Me');
  tray.setContextMenu(trayMenuBuilder(videoInputMenuItens));
}

function trayMenuBuilder(videoInputArray) {
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Video Input Source', submenu: videoInputArray },
    {
      label: 'Quit',
      click() {
        app.quit();
      }
    }
  ]);
  return contextMenu;
}

function menuItemBuilder(label, index) {
  return {
    label: label,
    type: 'radio',
    checked: index === 0,
    click() {
      win.webContents.send('videoInputChange', index);
      updateMenuTray(index);
    }
  };
}

function updateMenuTray(clickedIndex) {
  videoInputArrayFormatted.forEach((item, index) => {
    return {
      ...item,
      checked: index === clickedIndex
    };
  });
}

ipcMain.on('videoInput', (event, arg) => {
  const videoInputArray = JSON.parse(arg);

  videoInputArrayFormatted = videoInputArray.map((input, index) => {
    return menuItemBuilder(input.label, index);
  });

  createTray(videoInputArrayFormatted);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
