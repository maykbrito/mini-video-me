import { globalCss } from '.'

export const applyGlobalCss = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray2',
    color: '$gray12',
    fontFamily: '$default',
  },
})
