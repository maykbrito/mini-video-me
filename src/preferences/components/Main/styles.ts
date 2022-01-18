import * as Tabs from '@radix-ui/react-tabs'
import * as RadixSeparator from '@radix-ui/react-separator'
import { styled } from '../../styles'

export const Container = styled('main', {
  padding: '$6',
})

export const TabsList = styled(Tabs.TabsList, {
  display: 'flex',
  borderRadius: '$xs',
  overflow: 'hidden',

  padding: '$1',

  backgroundColor: '$gray3',
  border: 0,

  marginY: '$2',
})

export const TabTrigger = styled(Tabs.Trigger, {
  flex: 1,
  padding: '$2',
  color: '$white',
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: '$xs',
  fontWeight: 'bold',
  fontSize: '$sm',

  '&[data-state=active]': {
    backgroundColor: '$purple9',
  },
})

export const Separator = styled(RadixSeparator.Root, {
  backgroundColor: '$gray5',
  marginY: '$4',
  height: 1,
  width: '100%',
})
