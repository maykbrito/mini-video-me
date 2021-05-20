const { BrowserWindow, screen } = require('electron') // eslint-disable-line

class ScreenController {
  /**
   * @param {BrowserWindow} browserWindow
   * @param {'small' | 'medium' | 'large' | 'fullscreen'} initialScreenSize
   * @param {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} initialScreenEdge
   */
  constructor (browserWindow, initialScreenSize = 'small', initialScreenEdge = 'bottom-right') {
    this.browserWindow = browserWindow
    this.currentScreenEdge = initialScreenEdge
    this.currentScreenSize = initialScreenSize

    this.isScreenVisible = true
  }

  /**
   * Return screen size in pixels
   */
  getScreenSizeInPixels () {
    const screenSizes = {
      small: 300,
      medium: 400,
      large: 500
    }

    if (this.currentScreenSize === 'fullscreen') {
      const { x, y } = this.browserWindow.getBounds()
      const display = screen.getDisplayNearestPoint({ x, y })

      return {
        width: display.size.width,
        height: display.size.height
      }
    } else {
      const windowSize = screenSizes[this.currentScreenSize]

      return {
        width: windowSize,
        height: windowSize
      }
    }
  }

  /**
   * Set window size
   * @param {'small' | 'medium' | 'large' | 'fullscreen'} size
   */
  setWindowSize (size) {
    this.currentScreenSize = size

    const { width, height } = this.getScreenSizeInPixels()

    if (size === 'fullscreen') {
      this.browserWindow.setMaximumSize(width, height)
      this.browserWindow.maximize()
    } else {
      this.browserWindow.setMaximumSize(width, height)
      this.browserWindow.setSize(width, height)

      // this.moveWindowToScreenEdge(this.currentScreenEdge)
    }
  }

  /**
   * Calculate screen movement on edges
   * @param {'left' | 'right' | 'top' | 'bottom'} movement
   */
  calculateScreenMovement (movement) {
    const edgeMovements = {
      'top-right': {
        left: 'top-left',
        bottom: 'bottom-right'
      },
      'top-left': {
        right: 'top-right',
        bottom: 'bottom-left'
      },
      'bottom-right': {
        left: 'bottom-left',
        top: 'top-right'
      },
      'bottom-left': {
        right: 'bottom-right',
        top: 'top-left'
      }
    }

    return edgeMovements[this.currentScreenEdge][movement] || this.currentScreenEdge
  }

  /**
   * Move window to screen edge
   * @param {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} edge
   */
  moveWindowToScreenEdge (edge = this.currentScreenEdge) {
    /**
     * Get the screen behind electron window
     */

    this.currentScreenEdge = edge

    const { x, y } = this.browserWindow.getBounds()
    const display = screen.getDisplayNearestPoint({ x, y })

    const bounds = { x: display.bounds.x, y: display.bounds.y }
    const { width, height } = this.getScreenSizeInPixels()

    const screenPadding = this.currentScreenSize === 'fullscreen' ? 0 : 24

    switch (edge) {
      case 'top-left':
        bounds.x += screenPadding
        bounds.y += screenPadding
        break
      case 'bottom-left':
        bounds.x += screenPadding
        bounds.y += display.size.height - height - screenPadding
        break
      case 'top-right':
        bounds.x += display.size.width - width - screenPadding
        bounds.y += screenPadding
        break
      case 'bottom-right':
        bounds.x += display.size.width - width - screenPadding
        bounds.y += display.size.height - height - screenPadding
        break
    }

    this.browserWindow.setBounds(bounds)
  }

  /**
   * Toggle window visibility (hide/show)
   */
  toggleWindowVisibility () {
    this.isScreenVisible = !this.isScreenVisible

    if (this.isScreenVisible) {
      this.browserWindow.hide()
    } else {
      this.browserWindow.show()
    }
  }

  /**
   * Set active display by ID
   * @param {number} displayId
   */
  setActiveDisplay (displayId) {
    const display = screen.getAllDisplays().find(display => display.id === displayId)

    this.browserWindow.setBounds(display.workArea)

    this.moveWindowToScreenEdge()
  }
}

module.exports = { ScreenController }
