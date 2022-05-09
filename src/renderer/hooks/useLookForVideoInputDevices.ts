import { useEffect, useState } from 'react'

let isLookingForDevices: NodeJS.Timeout

export function useLookForVideoInputDevices({
  callback,
  deviceId,
  setDeviceId,
  videoInputDevicesRef,
}) {
  const [shouldLookForDevices, setShouldLookForDevices] = useState(false)

  useEffect(() => {
    if (deviceId || !shouldLookForDevices) return

    isLookingForDevices = setInterval(() => {
      const deviceId = videoInputDevicesRef.current[0]?.deviceId

      callback()

      if (deviceId) {
        clearInterval(isLookingForDevices)
        setShouldLookForDevices(false)
      }

      setDeviceId(videoInputDevicesRef.current[0]?.deviceId)
    }, 1000)

    return () => clearInterval(isLookingForDevices)
  }, [shouldLookForDevices])

  return {
    isLookingForDevices,
    shouldLookForDevices,
    setShouldLookForDevices,
  }
}
