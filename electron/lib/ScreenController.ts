import { BrowserWindow, screen } from 'electron'

type ScreenSize = 'initial' | 'large'

type ScreenEdge = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

type ScreenMovement = 'left' | 'right' | 'top' | 'bottom'

type ScreenEdgeMovements = Record<
  ScreenEdge,
  Partial<Record<ScreenMovement, ScreenEdge>>
>

export class ScreenController {
  private browserWindow: BrowserWindow
  private currentScreenSize: ScreenSize
  private currentScreenEdge: ScreenEdge
  private screenSizes: Record<ScreenSize, number>
  private windowPositionByScreenSize: Record<
    ScreenSize,
    { x: number; y: number }
  >

  private isScreenVisible = true

  private currentX = 0
  private currentY = 0

  constructor(
    browserWindow: BrowserWindow,
    initialScreenSize: ScreenSize = 'initial',
    initialScreenEdge: ScreenEdge = 'bottom-right'
  ) {
    this.browserWindow = browserWindow
    this.currentScreenEdge = initialScreenEdge
    this.currentScreenSize = initialScreenSize

    this.screenSizes = { initial: 300, large: 600 }

    const { x, y } = this.browserWindow.getBounds()

    this.windowPositionByScreenSize = {
      initial: { x, y },
      large: { x, y },
    }

    this.setCurrentWindowXY()
  }

  setWindowPositionByScreenSize() {
    this.windowPositionByScreenSize[this.currentScreenSize] = {
      x: this.currentX,
      y: this.currentY,
    }
  }

  setCurrentWindowXY() {
    this.currentX = this.browserWindow.getBounds().x
    this.currentY = this.browserWindow.getBounds().y
  }

  memoLastWindowPosition() {
    this.setWindowPositionByScreenSize()
    this.setCurrentWindowXY()
  }

  getScreenSizeInPixels() {
    const windowSize = this.screenSizes[this.currentScreenSize]

    return {
      width: windowSize,
      height: windowSize,
    }
  }

  setWindowSize(size: ScreenSize) {
    if (this.currentScreenSize === size) {
      return
    }

    this.currentScreenSize = size
    this.memoLastWindowPosition()

    const { width, height } = this.getScreenSizeInPixels()
    const { x, y } = this.windowPositionByScreenSize[size]

    this.browserWindow.setMaximumSize(width, height)
    this.browserWindow.setBounds({ width, height, x, y }, true)
  }

  calculateScreenMovement(movement: ScreenMovement) {
    const edgeMovements: ScreenEdgeMovements = {
      'top-right': {
        left: 'top-left',
        bottom: 'bottom-right',
      },
      'top-left': {
        right: 'top-right',
        bottom: 'bottom-left',
      },
      'bottom-right': {
        left: 'bottom-left',
        top: 'top-right',
      },
      'bottom-left': {
        right: 'bottom-right',
        top: 'top-left',
      },
    }

    return (
      edgeMovements[this.currentScreenEdge][movement] || this.currentScreenEdge
    )
  }

  moveWindowToScreenEdge(edge = this.currentScreenEdge) {
    this.currentScreenEdge = edge

    const { x, y } = this.browserWindow.getBounds()
    const display = screen.getDisplayNearestPoint({ x, y })

    const bounds = { x: display.bounds.x, y: display.bounds.y }
    const { width, height } = this.getScreenSizeInPixels()

    const SCREEN_PADDING = 24

    switch (edge) {
      case 'top-left':
        bounds.x += SCREEN_PADDING
        bounds.y += SCREEN_PADDING
        break
      case 'bottom-left':
        bounds.x += SCREEN_PADDING
        bounds.y += display.size.height - height - SCREEN_PADDING
        break
      case 'top-right':
        bounds.x += display.size.width - width - SCREEN_PADDING
        bounds.y += SCREEN_PADDING
        break
      case 'bottom-right':
        bounds.x += display.size.width - width - SCREEN_PADDING
        bounds.y += display.size.height - height - SCREEN_PADDING
        break
    }

    this.browserWindow.setBounds(bounds, true)
  }

  toggleWindowVisibility() {
    this.isScreenVisible = !this.isScreenVisible

    if (this.isScreenVisible) {
      this.browserWindow.hide()
    } else {
      this.browserWindow.show()
    }
  }

  toggleWindowSize() {
    const size = this.currentScreenSize === 'initial' ? 'large' : 'initial'
    this.setWindowSize(size)
  }

  setActiveDisplay(displayId: number) {
    const display = screen
      .getAllDisplays()
      .find(display => display.id === displayId)

    if (display) {
      this.browserWindow.setBounds(display.workArea)
      this.moveWindowToScreenEdge()
    }
  }
}
