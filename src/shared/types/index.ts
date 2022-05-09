import {
  BrowserWindowConstructorOptions,
  IpcMainInvokeEvent,
  BrowserWindow,
} from 'electron'

import { defaultLanguage } from 'i18n'

export type BrowserWindowOrNull = Electron.BrowserWindow | null

export interface WindowProps extends BrowserWindowConstructorOptions {
  id: string
}

export interface WindowCreationByIPC {
  channel: string
  window(): BrowserWindowOrNull
  callback(window: BrowserWindow, event: IpcMainInvokeEvent): void
}

export interface VideoDevice {
  id: string
  label: string
}

export interface Sizes {
  width: number
  height: number
}

export interface Theme {
  id: string
  displayName: string
  textColor?: string
  borderColor?: string
  borderWidth?: string
}

export type Language = typeof defaultLanguage
export type DictionaryKeys = keyof Language['dictionary']
