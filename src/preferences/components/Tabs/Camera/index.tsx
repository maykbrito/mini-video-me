import { useState } from 'react'
import {
  Container,
  FieldLabel,
  ToggleItem,
  ToggleRoot,
  Slider,
  SliderTrack,
  SliderRange,
  SliderThumb,
  Toggle,
} from './styles'

export function Camera() {
  const [cameraResolution, setCameraResolution] = useState('1080p')
  const [cameraFramerate, setCameraFramerate] = useState('60fps')

  function handleCameraResolutionChange(value: string) {
    if (value) {
      setCameraResolution(value)
    }
  }

  function handleCameraFramerateChange(value: string) {
    if (value) {
      setCameraFramerate(value)
    }
  }

  return (
    <Container>
      <FieldLabel css={{ marginTop: '$4' }}>Resolution</FieldLabel>

      <ToggleRoot
        type="single"
        value={cameraResolution}
        onValueChange={handleCameraResolutionChange}
      >
        <ToggleItem value="480p">480p</ToggleItem>
        <ToggleItem value="720p">720p</ToggleItem>
        <ToggleItem value="1080p">1080p</ToggleItem>
      </ToggleRoot>

      <FieldLabel css={{ marginTop: '$4' }}>Framerate</FieldLabel>

      <ToggleRoot
        type="single"
        value={cameraFramerate}
        onValueChange={handleCameraFramerateChange}
      >
        <ToggleItem value="30fps">30 FPS</ToggleItem>
        <ToggleItem value="60fps">60 FPS</ToggleItem>
      </ToggleRoot>

      <FieldLabel css={{ marginTop: '$4' }}>Zoom</FieldLabel>

      <Slider aria-label="Zoom" defaultValue={[1]} min={1} max={2} step={0.1}>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </Slider>

      <FieldLabel css={{ marginTop: '$4' }}></FieldLabel>

      <Toggle>Flip horizontally</Toggle>
    </Container>
  )
}
