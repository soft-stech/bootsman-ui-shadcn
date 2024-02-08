import { cva } from 'class-variance-authority'

export { default as BuiButton } from './BuiButton.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: [
          /* background*/ 'bg-primary hover:bg-primary-hover active:bg-primary-active disabled:bg-foreground/[0.04]',
          /* border */ 'disabled:border disabled:border-foreground/[0.16]',
          /* text */ 'text-primary-foreground disabled:text-foreground/[0.16]'
        ],
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: [
          /* background*/ 'hover:bg-accent/[0.08] active:bg-accent/[0.16] disabled:bg-accent/[0.04]',
          /* border */ 'border border-primary disabled:border-accent/[0.32]',
          /* text */ 'text-accent-foreground disabled:text-accent/[0.32]'
        ],
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: [
          /* text */ 'text-accent-foreground disabled:text-accent/[0.56]',
          /* background */ 'hover:bg-accent/[0.08] active:bg-accent/[0.16]'
        ],
        link: 'text-primary underline-offset-4 hover:underline',
        none: 'border-none bg-transparent'
      },
      size: {
        default: 'h-8 px-4 py-1',
        sm: 'h-7 px-4 py-0.5',
        lg: 'h-10 px-5 py-2',
        icon: 'h-4 w-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
