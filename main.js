const { app, BrowserWindow, ipcMain } = require("electron");
const customSize = 300;
const bigFactor = 2.4; // How much to enlarge by double-clicking on the video
let win, smallPosition, bigPosition;

const updatePositions = {
	big: () => {
		// Memo small position
		smallPosition = win.getBounds();

		if (!bigPosition) {
			// When you enter for the first time, will configure big video
			const { x, y } = smallPosition;
			const proportion = customSize * bigFactor;
			bigPosition = {
				x: x - proportion,
				y: y - proportion,
				width: proportion,
				height: proportion,
			};
		}

		// Move and make it bigger
		win.setBounds(bigPosition, true);
	},
	small: () => {
		// Memo big position
		bigPosition = win.getBounds();

		// Move and make it smaller
		win.setBounds(smallPosition, true);
	},
};

ipcMain.on("double-click", (event, arg) => {
	updatePositions[arg ? "small" : "big"]();
});

function createWindow() {
	win = new BrowserWindow({
		width: customSize,
		height: customSize,
		frame: false,
		titleBarStyle: "customButtonsOnHover",
		transparent: true,
		alwaysOnTop: true,
		maximizable: false,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	win.loadFile("index.html").setVisibleOnAllWorkspaces(true);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
