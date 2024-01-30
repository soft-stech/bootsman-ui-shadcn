import { cva } from 'class-variance-authority'

export { default as BuiToggle } from './BuiToggle.vue'

export const toggleVariants = cva(
  'bg-transparent inline-flex items-center justify-center rounded-md text-accent-foreground text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent/[0.16] hover:bg-accent/[0.08]', // data-[state=on]:text-accent-foreground
  {
    variants: {
      variant: {
        default: '',
        outline: 'border border-input '
      },
      size: {
        default: 'h-10 px-3',
        sm: 'h-9 px-2.5',
        lg: 'h-11 px-5'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
