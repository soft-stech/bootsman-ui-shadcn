import { cva } from 'class-variance-authority'

export { default as BuiColorPicker } from './BuiColorPicker.vue'

export const colorPickerSelectorVariants = cva('touch-none rounded-md', {
  variants: {
    size: {
      xs: 'w-32 h-32',
      sm: 'w-36 h-36',
      md: 'w-40 h-40',
      lg: 'w-44 h-44',
      xl: 'w-48 h-48'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export const colorPickerTrackVariants = cva('relative w-[8px] touch-none rounded-md', {
  variants: {
    size: {
      xs: 'h-32',
      sm: 'h-36',
      md: 'h-40',
      lg: 'h-44',
      xl: 'h-48'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})
