import { BrowserWindowOrNull, VideoDevice } from 'shared/types'
import { ScreenModule } from '../screen'

export interface State {
  screen: ScreenModule
  mainWindow: BrowserWindowOrNull
  tray: Electron.Tray
  videoInputDevices: VideoDevice[]
  activeVideoInputId: string
}

export type StateSlice = Partial<State> | Record<string, unknown>
