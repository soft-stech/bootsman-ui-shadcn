import { cva } from 'class-variance-authority'

export { default as BuiInput } from './BuiInput.vue'
export { default as BuiPasswordInput } from './BuiPasswordInput.vue'
export { default as BuiBadgedInput } from './BuiBadgedInput.vue'

export const inputVariants = cva(
  'flex h-10 w-full rounded bg-background border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30 dark:disabled:opacity-55 read-only:opacity-30 dark:read-only:opacity-55 aria-[invalid=true]:border-destructive-foreground',
  {
    variants: {
      variant: {
        default: 'border-input',
        destructive: 'border-destructive-foreground',
        success: 'border-success-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
