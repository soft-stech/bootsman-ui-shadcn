import { cva } from 'class-variance-authority'

export { default as BuiColorPicker } from './BuiColorPicker.vue'

export const colorPickerVariants = cva('', {
  variants: {
    size: {
      xs: {
        selector: 'w-38 h-38',
        track: 'h-38'
      },
      sm: {
        selector: 'w-40 h-40',
        track: 'h-40'
      },
      md: {
        selector: 'w-42 h-42',
        track: 'h-42'
      },
      lg: {
        selector: 'w-44 h-44',
        track: 'h-44'
      },
      xl: {
        selector: 'w-46 h-46',
        track: 'h-46'
      }
    }
  },
  defaultVariants: {
    size: 'md'
  }
})
