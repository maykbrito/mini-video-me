import cameraConfig from './cameraConfig.js'
import Cam from './cam.js'

// Using webcam in browser
navigator.mediaDevices.getUserMedia({
    video: cameraConfig || true
}).then(stream => Cam.video.srcObject = stream )

// Start Controlling Cam
Cam.init()

// Keyboard Events
window.addEventListener('keydown', (e) => {
    if(Cam.controls[e.key]) {
        Cam.controls[e.key]()
    }
})