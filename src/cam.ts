import { config } from './config'

type MovePosition = 'left' | 'right' | 'up' | 'down'

type ZoomType = 'in' | 'out'

export class CameraController {
  public videoElement: HTMLVideoElement

  private videoWrapper: HTMLDivElement
  private isFlipped: boolean
  private isRounded: boolean
  private position: Record<'x' | 'y' | 'z', number>
  private root: HTMLElement

  constructor() {
    this.videoWrapper = document.getElementById('wrapper') as HTMLDivElement
    this.videoElement = document.getElementById('video') as HTMLVideoElement
    this.root = document.querySelector(':root') as HTMLElement

    this.isFlipped = config.flipHorizontal
    this.isRounded = config.rounded

    this.position = {
      x: config.horizontal,
      y: config.vertical,
      z: config.scale,
    }

    this.render()
  }

  public flipHorizontal() {
    this.isFlipped = !this.isFlipped

    this.render()
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
    this.render()
  }

  public zoom(type: ZoomType) {
    if (type === 'in') {
      this.position.z += 0.1
    } else {
      this.position.z -= 0.1
    }

    this.render()
  }

  public reset() {
    this.position.z = 1
    this.render()
  }

  public round() {
    this.isRounded = !this.isRounded

    this.render()
  }

  private render() {
    const transform: string[] = []
    const classList: string[] = []

    transform.push(`translate(${this.position.x}%, ${this.position.y}%)`)
    transform.push(`scale(${this.position.z})`)

    if (this.isFlipped) {
      classList.push('flip')
      transform.push('rotateY(180deg)')
    }

    this.videoElement.style.transform = transform.join(' ')
    this.videoElement.className = classList.join(' ')
    this.videoWrapper.className = this.isRounded ? 'rounded' : ''

    if (config.borderColorCss) {
      this.root.style.setProperty('--border-color', config.borderColorCss)
    }
  }
}
