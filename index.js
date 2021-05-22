import { config } from './cameraConfig.js'
import Cam from './cam.js'

let videoDevices

navigator.mediaDevices.enumerateDevices().then((devices) => {
  videoDevices = devices.filter((device) => {
    return device.kind === 'videoinput';
  });

  navigator.mediaDevices.getUserMedia({
    video: {...config, deviceId: videoDevices[0].deviceId }|| true
  }).then(stream => {
    Cam.video.srcObject = stream
  })

  MiniVideoMe.sendVideoInputDevices(JSON.stringify(videoDevices))
  
  // Start Controlling Cam
  Cam.init()
})

// ipcRenderer.on('videoInputChange', (event, videoInputIndex) => {
//   navigator.mediaDevices
//   .getUserMedia({
//     video: { ...cameraConfig, deviceId: videoDevices[videoInputIndex].deviceId } || true
//   })
//   .then((stream) => (Cam.video.srcObject = stream));
// })


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
}

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

function changeVideoInputSource(videoInputIndex) {
  navigator.mediaDevices
    .getUserMedia({
      video: { ...config, deviceId: videoDevices[videoInputIndex].deviceId } || true
    })
    .then((stream) => (Cam.video.srcObject = stream));
}

MiniVideoMe.on('videoInputChange', (data) => changeVideoInputSource(data))

window.addEventListener('mousemove', hideCursor.mousemove)
/* end tested only on Mac */
