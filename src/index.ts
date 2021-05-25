import { config } from './config'
import { CameraController } from './cam'

const cameraController = new CameraController()

navigator.mediaDevices.getUserMedia({
  video: config || true
}).then(stream => {
  cameraController.videoElement.srcObject = stream
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

/* Mac Only: Change Size */
window.ondblclick = changeWrapperSize

function changeWrapperSize () {
  const { MiniVideoMe } = window

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
