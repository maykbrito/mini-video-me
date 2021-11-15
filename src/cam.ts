import { config } from './config'

type MovePosition = 'left' | 'right' | 'up' | 'down'

type ZoomType = 'in' | 'out'

export class CameraController {
  public videoElement: HTMLVideoElement

  private wrapperElement: HTMLDivElement
  private wrapperVideoElement: HTMLDivElement
  private isFlipped: boolean
  private currentShapePosition: number
  private currentFilterPosition: number
  private position: Record<'x' | 'y' | 'z', number>
  private root: HTMLElement

  constructor() {
    this.wrapperElement = document.getElementById('wrapper') as HTMLDivElement
    this.wrapperVideoElement = document.getElementById(
      'video-wrapper'
    ) as HTMLDivElement
    this.videoElement = document.getElementById('video') as HTMLVideoElement
    this.root = document.querySelector(':root') as HTMLElement

    this.isFlipped = config.flipHorizontal
    this.currentShapePosition = -1
    this.currentFilterPosition = -1

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

  public reset() {
    this.position.z = 1
    this.applyPositioning()
  }

  public toggleShapes() {
    this.applyShape()
  }

  public toggleFilters() {
    this.applyFilter()
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

  private applyFilter() {
    const filter = this.getFilter()

    if (filter.includes('blend-')) {
      this.root.style.setProperty('--filter', 'initial')
      this.wrapperVideoElement.setAttribute('class', filter)
    } else {
      this.wrapperVideoElement.setAttribute('class', '')
      this.root.style.setProperty('--filter', filter)
    }
  }

  private getFilter() {
    this.currentFilterPosition++

    if (config.filters.length <= this.currentFilterPosition) {
      this.currentFilterPosition = 0
    }

    return config.filters[this.currentFilterPosition]
  }

  private render() {
    this.applyPositioning()
    this.flipHorizontal()
    this.applyBorder()
    this.applyShape()
    this.applyFilter()
  }
}
