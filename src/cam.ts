import { config } from './config'

type MovePosition = 'left' | 'right' | 'up' | 'down'

type ZoomType = 'in' | 'out'

export class CameraController {
  public videoElement: HTMLVideoElement

  private wrapperElement: HTMLDivElement
  private camIndex: number
  private isFlipped: boolean
  private currentShapePosition: number
  private position: Record<'x' | 'y' | 'z', number>
  private root: HTMLElement

  constructor() {
    this.wrapperElement = document.getElementById('wrapper') as HTMLDivElement
    this.videoElement = document.getElementById('video') as HTMLVideoElement
    this.root = document.querySelector(':root') as HTMLElement

    this.isFlipped = config.flipHorizontal
    this.currentShapePosition = -1

    this.camIndex = 0

    this.position = {
      x: config.horizontal,
      y: config.vertical,
      z: config.scale,
    }

    this.render()
  }

  public flipHorizontal() {
    this.isFlipped = !this.isFlipped

    this.applyPositioning()
  }

  public adjustOffset(position: MovePosition) {
    switch (position) {
      case 'up':
        this.position.y -= 1
        break
      case 'down':
        this.position.y += 1
        break
      case 'left':
        this.position.x -= 1
        break
      case 'right':
        this.position.x += 1
        break
    }
    this.applyPositioning()
  }

  public zoom(type: ZoomType) {
    if (type === 'in') {
      this.position.z += 0.1
    } else {
      this.position.z -= 0.1
    }

    this.applyPositioning()
  }

  public toggleCam() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => {
        return device.kind === 'videoinput'
      })

      const maxCamIndex = videoDevices.length - 1
      this.camIndex = this.camIndex === maxCamIndex ? 0 : this.camIndex + 1

      navigator.mediaDevices
        .getUserMedia({
          video:
            {
              ...config,
              deviceId: videoDevices[this.camIndex].deviceId,
            } || true,
        })
        .then(stream => {
          this.videoElement.srcObject = stream
        })
    })
  }

  public reset() {
    this.position.z = 1
    this.applyPositioning()
  }

  public toggleShapes() {
    this.applyShape()
  }

  private applyPositioning() {
    this.videoElement.style.transform = `translate(${this.position.x}%, ${this.position.y}%) scale(${this.position.z})`

    if (this.isFlipped) {
      this.videoElement.style.transform += 'rotateY(180deg)'
    }
  }

  private applyBorder() {
    this.wrapperElement.classList.add('has-border')

    config.borderColor &&
      this.root.style.setProperty('--border-color', config.borderColor)

    config.borderWidth &&
      this.root.style.setProperty('--border-width', config.borderWidth)
  }

  private applyShape() {
    this.wrapperElement.classList.add('has-clip-path')

    const shape = this.getShape()
    this.root.style.setProperty('--clip-path', shape)
  }

  private getShape() {
    this.currentShapePosition++

    if (config.shapes.length <= this.currentShapePosition) {
      this.currentShapePosition = 0
    }

    return config.shapes[this.currentShapePosition]
  }

  private render() {
    this.applyPositioning()
    this.flipHorizontal()
    this.applyBorder()
    this.applyShape()
  }
}
