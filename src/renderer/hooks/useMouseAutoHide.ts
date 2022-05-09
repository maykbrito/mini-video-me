import { useEffect } from 'react'

let mouseHideTimeout: NodeJS.Timeout

function hideMouse() {
  clearTimeout(mouseHideTimeout)

  document.body.style.cursor = 'default'

  mouseHideTimeout = setTimeout(() => {
    document.body.style.cursor = 'none'
  }, 1000)
}

export function useMouseAutoHide() {
  useEffect(() => {
    window.addEventListener('mousemove', hideMouse)

    return () => window.removeEventListener('mousemove', hideMouse)
  }, [])
}
