import { Camera } from 'renderer/components'
import { useTheme } from 'renderer/hooks'

export function MainScreen() {
  useTheme()

  return <Camera />
}
