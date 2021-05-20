import { config } from './cameraConfig.js'
import Cam from './cam.js'

navigator.mediaDevices.getUserMedia({
  video: config || true
}).then(stream => {
  Cam.video.srcObject = stream
})

// Start Controlling Cam
Cam.init()

// Keyboard Events
window.addEventListener('keydown', (e) => {
  if (Cam.controls[e.key]) {
    Cam.controls[e.key]()
  }
})
