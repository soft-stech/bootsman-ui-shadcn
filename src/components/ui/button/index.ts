import { cva } from 'class-variance-authority'

export { default as Button } from './BuiButton.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 dark:disabled:opacity-55',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input text-accent-foreground bg-accent-background hover:bg-accent/[0.08] active:bg-accent/[0.16]',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'text-accent-foreground bg-accent-background hover:bg-accent/[0.08] active:bg-accent/[0.16]',
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
