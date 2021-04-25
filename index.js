import cameraConfig from "./cameraConfig.js";
import Cam from "./cam.js";

// Using the webcam in the browser
navigator.mediaDevices
	.getUserMedia({
		video: cameraConfig || true,
	})
	.then((stream) => (Cam.video.srcObject = stream));

// Start controlling the camera
Cam.init();

// Keyboard events
window.addEventListener("keydown", (e) => {
	if (Cam.controls[e.key]) {
		Cam.controls[e.key]();
	}
});
