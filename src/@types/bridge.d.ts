import { api } from '../../electron/bridge'

declare global {
  interface Window { MiniVideoMe: typeof api; }
}

window.MiniVideoMe = window.MiniVideoMe || {};