import { hexToDecimal } from 'shared/helpers'
import { exec } from '~/bin/utils'

let memoizedDisplays: any[]

export function macOSDisplaysAdapter() {
  if (memoizedDisplays) {
    return memoizedDisplays
  }

  const [rawDisplaysData] = exec(['system_profiler -json SPDisplaysDataType'])
  const displaysData = JSON.parse(rawDisplaysData || '{}')

  memoizedDisplays = displaysData?.SPDisplaysDataType?.map(
    ({ spdisplays_ndrvs }: any) =>
      spdisplays_ndrvs?.map(
        ({ _spdisplays_pixels, _spdisplays_displayID, _name }: any) => {
          const [width, height] = _spdisplays_pixels?.match(/\d+/g) || [0, 0]

          return {
            name: _name,
            id: hexToDecimal(_spdisplays_displayID),
            size: {
              width: Number(width),
              height: Number(height),
            },
          }
        }
      )
  ).flat(Infinity)

  return memoizedDisplays
}
