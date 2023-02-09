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
      const target = localStorage.getItem('deviceId')

      const deviceId =
        videoInputDevicesRef.current?.find(
          (device) => device.deviceId === target
        )?.deviceId ?? videoInputDevicesRef.current[0]?.deviceId

      callback()

      if (deviceId) {
        clearInterval(isLookingForDevices)
        setShouldLookForDevices(false)
      }

      setDeviceId(deviceId)
    }, 1000)

    return () => clearInterval(isLookingForDevices)
  }, [shouldLookForDevices])

  return {
    isLookingForDevices,
    shouldLookForDevices,
    setShouldLookForDevices,
  }
}
