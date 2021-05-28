import { api } from '../../electron/bridge'

declare global {
  // eslint-disable-next-line
  interface Window {
    MiniVideoMe: typeof api
  }
}

window.MiniVideoMe = window.MiniVideoMe || {}
