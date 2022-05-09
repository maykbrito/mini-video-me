import { State, StateSlice } from './types'

let state = {
  videoInputDevices: [],
  activeVideoInputId: '',
} as State

export function getVirtualState() {
  return state
}

export function setVirtualState(stateSlice: StateSlice) {
  state = {
    ...state,
    ...stateSlice,
  }
}
