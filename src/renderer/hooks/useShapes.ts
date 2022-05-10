import { useCallback, useEffect } from 'react'

import { config } from 'renderer/store'
import { useRoot } from './useRoot'

let currentShapePosition = 0

export function useShapes() {
  const root = useRoot()

  const getShape = useCallback(
    () => config.shapes[currentShapePosition] || config.shapes[0],
    []
  )

  const applyShape = useCallback(
    () => root.style.setProperty('--clip-path', getShape()),
    []
  )

  const toggleShapes = useCallback(() => {
    const shapePosition = currentShapePosition + 1

    if (config.shapes.length - 1 < shapePosition) {
      currentShapePosition = 0
    } else {
      currentShapePosition = shapePosition
    }

    applyShape()
  }, [])

  useEffect(() => {
    applyShape()
  }, [])

  return {
    toggleShapes,
  }
}
