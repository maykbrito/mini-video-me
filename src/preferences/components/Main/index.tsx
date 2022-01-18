import * as Tabs from '@radix-ui/react-tabs'
import { Container, TabsList, TabTrigger, Separator } from './styles'

import { Camera } from '../Tabs/Camera'

export function Main() {
  return (
    <Container>
      <h2>Preferences</h2>

      <Tabs.Root defaultValue="camera">
        <TabsList aria-label="Preferences tabs">
          <TabTrigger value="camera">Camera</TabTrigger>
          <TabTrigger value="appearance">Appearance</TabTrigger>
        </TabsList>
        <Separator />
        <Tabs.Content value="camera">
          <Camera />
        </Tabs.Content>
        <Tabs.Content value="appearance">3</Tabs.Content>
      </Tabs.Root>
    </Container>
  )
}
