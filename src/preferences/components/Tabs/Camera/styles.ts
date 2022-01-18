import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { styled } from '../../../styles'

export const Container = styled('div', {})

export const FieldLabel = styled('span', {
  display: 'block',
  color: '$gray12',
  fontSize: '$md',
})

export const ToggleRoot = styled(ToggleGroupPrimitive.Root, {
  display: 'flex',
  borderRadius: '$xs',
  overflow: 'hidden',

  padding: '$1',

  backgroundColor: '$gray3',
  border: 0,

  marginTop: '$2',
})

export const ToggleItem = styled(ToggleGroupPrimitive.Item, {
  flex: 1,
  padding: '$2',
  color: '$white',
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: '$xs',
  fontWeight: 'bold',
  fontSize: '$sm',

  '&[data-state=on]': {
    backgroundColor: '$purple9',
  },
})

export const Toggle = styled(TogglePrimitive.Root, {
  flex: 1,
  padding: '$3',
  width: '100%',
  color: '$white',
  backgroundColor: '$gray3',
  border: 0,
  borderRadius: '$xs',
  fontWeight: 'bold',
  fontSize: '$sm',

  '&[data-state=on]': {
    backgroundColor: '$purple9',
  },
})

export const Slider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',
  marginTop: '$2',

  '&[data-orientation="horizontal"]': {
    height: 20,
  },
})

export const SliderTrack = styled(SliderPrimitive.Track, {
  backgroundColor: '$gray6',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '$full',

  '&[data-orientation="horizontal"]': { height: 3 },
})

export const SliderRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: '$white',
  borderRadius: '$full',
  height: '100%',
})

export const SliderThumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  width: 16,
  height: 16,
  backgroundColor: '$gray12',
  borderRadius: '$md',

  '&:hover': { backgroundColor: '$purple11' },
  '&:active': { backgroundColor: '$purple10' },
})
