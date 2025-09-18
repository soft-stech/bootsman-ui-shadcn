export { default as BuiProgress } from './BuiProgress.vue'

import { cva } from 'class-variance-authority'

export const progressVariants = cva('', {
  variants: {
    variant: {
      sm: 'h-3 rounded-[8px]',
      default: 'h-5 rounded-[8px]',
      lg: 'h-10 rounded-[16px]'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export const indicatorVariants = cva(
  'absolute h-full box-content flex-1 bg-linear-to-l transition-all duration-300',
  {
    variants: {
      variant: {
        sm: 'rounded-[6px]',
        default: 'rounded-[8px]',
        lg: 'rounded-[16px]'
      },
      color: {
        primary:
          'from-[rgba(115,113,249,0.80)] to-[rgba(115,113,249,0.24)] border-[rgb(115,113,249)]',
        green: 'from-[rgba(30,215,132,0.80)] to-[rgba(30,215,132,0.24)] border-[rgb(30,215,132)]',
        red: 'from-[rgba(224,95,163,0.8)] to-[rgba(224,95,163,0.24)] border-[rgb(224,95,163)]',
        orange: 'from-[rgba(255,167,139,0.8)] to-[rgba(255,167,139,0.24)] border-[rgb(255,167,139)]'
      }
    },
    defaultVariants: {
      color: 'green',
      variant: 'default'
    }
  }
)

export const capVariants = {
  sm: '8px',
  default: '16px',
  lg: '32px'
} as const
