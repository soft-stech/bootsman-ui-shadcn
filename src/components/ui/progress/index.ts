export { default as BuiProgress } from './BuiProgress.vue'

import { cva } from 'class-variance-authority'

export const progressVariants = cva('after:rounded-[50%/50%]', {
  variants: {
    variant: {
      sm: 'h-5 [&>*]:pl-2 rounded-[8px/100%] after:h-5 after:w-2',
      default: 'h-10 [&>*]:pl-4 rounded-[16px/100%] after:h-10 after:w-4',
      lg: 'h-20 [&>*]:pl-8 rounded-[32px/100%] after:h-20 after:w-8 before:h-20 before:w-8'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export const capVariants = {
  sm: '8px',
  default: '16px',
  lg: '32px'
} as const
