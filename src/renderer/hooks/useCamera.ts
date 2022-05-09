import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useLookForVideoInputDevices } from './useLookForVideoInputDevices'
import { useMouseAutoHide } from './useMouseAutoHide'
import { useShortcuts } from './useShortcuts'
import { config } from 'renderer/store'
import { useShapes } from './useShapes'

type Statuses = 'loading' | 'notFound' | 'connected' | 'disconnected'
type MovePosition = 'left' | 'right' | 'up' | 'down'
type ZoomType = 'in' | 'out'

const { MiniVideoMe } = window
const { shortcuts } = config

let isFirstLoad = false
let camIndex = 0

export function useCamera() {
  const [isFlipped, setIsFlipped] = useState(config.flipHorizontal)
  const [status, setStatus] = useState<Statuses>('loading')
  const [deviceId, setDeviceId] = useState(null)
  const { toggleShapes } = useShapes()

  const [position, setPosition] = useState({
    x: config.horizontal,
    y: config.vertical,
    z: config.scale,
  })

  const videoInputDevicesRef = useRef<MediaDeviceInfo[]>([])
  const wrapperElementRef = useRef<HTMLDivElement>(null)
  const videoElementRef = useRef<HTMLVideoElement>(null)

  const shortcutActionsMapper = useMemo(
    () => ({
      [shortcuts.adjustCameraOffset.left]: () => adjustOffset('left'),
      [shortcuts.adjustCameraOffset.right]: () => adjustOffset('right'),
      [shortcuts.adjustCameraOffset.up]: () => adjustOffset('up'),
      [shortcuts.adjustCameraOffset.down]: () => adjustOffset('down'),
      [shortcuts.toggleCam]: () => toggleCam(),
      [shortcuts.toggleWindowSize]: () => toggleWindowSize(),
      [shortcuts.toggleShapes]: () => toggleShapes(),
      [shortcuts.reset]: () => reset(),
      [shortcuts.zoom.in]: () => zoom('in'),
      [shortcuts.zoom.out]: () => zoom('out'),
      [shortcuts.flipHorizontal]: () => flipHorizontal(),
      [shortcuts.openPreferencesFile]: () => MiniVideoMe.openPreferencesFile(),
    }),
    []
  )

  useMouseAutoHide()
  useShortcuts(shortcutActionsMapper)

  const initCam = useCallback(() => {
    getVideoDeviceList().then((devices) => {
      videoInputDevicesRef.current = devices

      const constraints: MediaStreamConstraints = {
        video:
          {
            ...config,
            deviceId,
            frameRate: { ideal: config.frameRate },
          } || true,
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoElementRef.current.srcObject = stream

          setStatus('connected')
        })
        .catch(() => {
          setShouldLookForDevices(true)
          setDeviceId(null)

          setTimeout(() => {
            if (isLookingForDevices) {
              setStatus('notFound')
            }
          }, 3000)
        })

      const availableDevices = videoInputDevicesRef.current.map((device) => {
        return {
          id: device.deviceId,
          label: device.label,
        }
      })

      MiniVideoMe.sendActiveVideoInputId(deviceId)
      MiniVideoMe.sendVideoInputDeviceList(availableDevices)

      applyDefaultStyles()
    })
  }, [deviceId])

  const getVideoDeviceList = useCallback(async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()

    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput'
    )

    return videoDevices
  }, [])

  const toggleCam = useCallback(() => {
    getVideoDeviceList().then((videoDevices) => {
      const maxCamIndex = videoDevices.length - 1

      camIndex = camIndex === maxCamIndex ? 0 : camIndex + 1

      const deviceId = videoDevices[camIndex].deviceId

      MiniVideoMe.sendActiveVideoInputId(deviceId)

      navigator.mediaDevices
        .getUserMedia({
          video:
            {
              ...config,
              deviceId,
            } || true,
        })
        .then((stream) => {
          videoElementRef.current.srcObject = stream
        })
    })
  }, [camIndex])

  const getDevice = useCallback(async (deviceId: string) => {
    return navigator.mediaDevices
      .getUserMedia({ video: { ...config, deviceId } || true })
      .then((stream) => (videoElementRef.current.srcObject = stream))
  }, [])

  const applyDefaultStyles = useCallback(() => {
    applyPositioning()
    applyBorder()
    applyShape()

    if (!isFirstLoad) {
      flipHorizontal()
      isFirstLoad = true
    }
  }, [isFirstLoad])

  const changeWrapperSize = useCallback(() => {
    MiniVideoMe.toggleWindowSize()
  }, [])

  const flipHorizontal = useCallback(() => {
    setIsFlipped((isFlipped) => !isFlipped)
  }, [])

  const applyPositioning = useCallback(() => {
    if (!videoElementRef.current) return

    videoElementRef.current.style.transform = `translate(${position.x}%, ${position.y}%) scale(${position.z})`

    if (isFlipped) {
      videoElementRef.current.style.transform += 'rotateY(180deg)'
    }
  }, [position.x, position.y, position.z, isFlipped])

  const adjustOffset = useCallback((position: MovePosition) => {
    switch (position) {
      case 'up':
        setPosition((position) => ({
          ...position,
          y: (position.y -= 1),
        }))
        break

      case 'down':
        setPosition((position) => ({
          ...position,
          y: (position.y += 1),
        }))
        break

      case 'left':
        setPosition((position) => ({
          ...position,
          x: (position.x -= 1),
        }))
        break

      case 'right':
        setPosition((position) => ({
          ...position,
          x: (position.x += 1),
        }))
        break
    }
  }, [])

  const zoom = useCallback((type: ZoomType) => {
    if (type === 'in') {
      setPosition((position) => ({
        ...position,
        z: (position.z += 0.1),
      }))

      return
    }

    setPosition((position) => ({
      ...position,
      z: (position.z -= 0.1),
    }))
  }, [])

  const toggleWindowSize = useCallback(() => {
    MiniVideoMe.toggleWindowSize()
  }, [])

  const reset = useCallback(() => {
    setPosition((position) => ({
      ...position,
      z: 1,
    }))
  }, [])

  const applyShape = useCallback(() => {
    if (!wrapperElementRef.current) return

    wrapperElementRef.current.classList.add('has-clip-path')
  }, [])

  const applyBorder = useCallback(() => {
    if (!wrapperElementRef.current) return

    wrapperElementRef.current.classList.add('has-border')
  }, [])

  const { setShouldLookForDevices, isLookingForDevices } =
    useLookForVideoInputDevices({
      deviceId,
      setDeviceId,
      videoInputDevicesRef,
      callback: initCam,
    })

  useEffect(() => {
    initCam()
  }, [deviceId])

  useEffect(() => {
    navigator.mediaDevices.ondevicechange = () => {
      getDevice(deviceId).catch((error) => {
        if (error.name === 'NotFoundError') {
          setDeviceId(null)
          setShouldLookForDevices(true)
          setStatus('disconnected')
        }
      })
    }

    MiniVideoMe.whenVideoInputChanges(async (deviceId: string) => {
      getDevice(deviceId)

      const devices = await getVideoDeviceList()
      const index = devices.findIndex((device) => device.deviceId === deviceId)

      if (index !== -1) {
        camIndex = index
        return
      }

      camIndex = 0
    })

    MiniVideoMe.whenRequestVideoInputList(() => {
      const availableDevices = videoInputDevicesRef.current.map((device) => {
        return {
          id: device.deviceId,
          label: device.label,
        }
      })

      MiniVideoMe.sendActiveVideoInputId(deviceId)
      MiniVideoMe.sendVideoInputDeviceList(availableDevices)
    })

    window.ondblclick = changeWrapperSize
  }, [])

  useEffect(() => {
    applyPositioning()
  }, [isFlipped, position.x, position.y, position.z])

  return {
    status,
    toggleShapes,
    videoElementRef,
    wrapperElementRef,
    applyStyles: applyDefaultStyles,
    isCameraFound: Boolean(deviceId),
  }
}
