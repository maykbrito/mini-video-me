import { config } from './config'
import { CameraController } from './cam'
import './styles/main'
import './styles/colors-blend'

const { MiniVideoMe } = window

const cameraController = new CameraController()

let videoDevices: MediaDeviceInfo[]

navigator.mediaDevices.enumerateDevices().then(devices => {
  videoDevices = devices.filter(device => {
    return device.kind === 'videoinput'
  })

  navigator.mediaDevices
    .getUserMedia({
      video: { ...config, deviceId: videoDevices[0].deviceId } || true,
    })
    .then(stream => {
      cameraController.videoElement.srcObject = stream
    })

  const availableDevices = videoDevices.map(device => {
    return {
      id: device.deviceId,
      label: device.label,
    }
  })

  MiniVideoMe.sendVideoInputDevices(availableDevices)
})

const controls = {
  ArrowLeft: () => cameraController.adjustOffset('left'),
  ArrowRight: () => cameraController.adjustOffset('right'),
  ArrowUp: () => cameraController.adjustOffset('up'),
  ArrowDown: () => cameraController.adjustOffset('down'),
  o: () => cameraController.toggleShapes(),
  f: () => cameraController.toggleFilters(),
  r: () => cameraController.reset(),
  '=': () => cameraController.zoom('in'),
  '-': () => cameraController.zoom('out'),
  '/': () => cameraController.flipHorizontal(),
}

function isValidControlKey(key: string): key is keyof typeof controls {
  return key in controls
}

window.addEventListener('keydown', event => {
  if (isValidControlKey(event.key)) {
    controls[event.key]()
  }
})

MiniVideoMe.on('videoInputChange', (deviceId: string) => {
  navigator.mediaDevices
    .getUserMedia({ video: { ...config, deviceId } || true })
    .then(stream => (cameraController.videoElement.srcObject = stream))
})

/* Mac Only: Change Size */
window.ondblclick = changeWrapperSize

function changeWrapperSize() {
  MiniVideoMe.sendDoubleClick()
}
/* End Mac Only */

/* tested only on Mac */
let mouseHideTimeout: ReturnType<typeof setTimeout>

window.addEventListener('mousemove', () => {
  document.body.style.cursor = 'default'

  clearTimeout(mouseHideTimeout)

  mouseHideTimeout = setTimeout(() => {
    document.body.style.cursor = 'none'
  }, 1000)
})
/* end tested only on Mac */
