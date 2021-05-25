import { config } from './config'
import { CameraController } from './cam'

const { MiniVideoMe } = window

const cameraController = new CameraController()

let videoDevices: MediaDeviceInfo[]

navigator.mediaDevices.enumerateDevices().then((devices) => {
  videoDevices = devices.filter((device) => {
    return device.kind === 'videoinput';
  });

  navigator.mediaDevices.getUserMedia({
    video: {...config, deviceId: videoDevices[0].deviceId }|| true
  }).then(stream => {
    cameraController.videoElement.srcObject = stream
  })

  MiniVideoMe.sendVideoInputDevices(JSON.stringify(videoDevices))
})

const controls: Record<string, () => void> = {
  'ArrowLeft': () => cameraController.adjustOffset('left'),
  'ArrowRight': () => cameraController.adjustOffset('right'),
  'ArrowUp': () => cameraController.adjustOffset('up'),
  'ArrowDown': () => cameraController.adjustOffset('down'),
  '=': () => cameraController.zoom('in'),
  '-': () => cameraController.zoom('out'),
  '/': () => cameraController.flipHorizontal(),
  'o': () => cameraController.round()
}

window.addEventListener('keydown', (event) => {
  if (controls[event.key]) {
    controls[event.key]()
  }
})

function changeVideoInputSource(videoInputIndex: number) {
  navigator.mediaDevices
    .getUserMedia({
      video: { ...config, deviceId: videoDevices[videoInputIndex].deviceId } || true
    })
    .then((stream) => (cameraController.videoElement.srcObject = stream));
}

MiniVideoMe.on('videoInputChange', (data: number) => changeVideoInputSource(data))

/* Mac Only: Change Size */
window.ondblclick = changeWrapperSize

function changeWrapperSize () {
  MiniVideoMe.sendDoubleClick()
}
/* End Mac Only */

/* tested only on Mac */
let mouseHideTimeout: NodeJS.Timeout;

window.addEventListener('mousemove', () => {
  document.body.style.cursor = 'default'

  clearTimeout(mouseHideTimeout)

  mouseHideTimeout = setTimeout(() => {
    document.body.style.cursor = 'none'
  }, 1000)
})
/* end tested only on Mac */
