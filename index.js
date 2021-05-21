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

/* Mac Only: Change Size */
let isBig = false // the window starts small

window.ondblclick = changeWrapperSize

function changeWrapperSize () {
  const { MiniVideoMe } = window

  MiniVideoMe.sendDoubleClick(isBig)

/* tested only on Mac */
const hideCursor = {
  timer: null,
  mousemove: (e) => {
    document.body.style.cursor = 'default'
    clearTimeout(hideCursor.timer)
    hideCursor.timer = setTimeout(() => {
      document.body.style.cursor = 'none'
    }, 1000)
  }
}

window.addEventListener('mousemove', hideCursor.mousemove)
/* end tested only on Mac */
