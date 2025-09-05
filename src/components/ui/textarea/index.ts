import { cva } from 'class-variance-authority'

export { default as BuiTextarea } from './BuiTextarea.vue'

export const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30 dark:disabled:opacity-55 read-only:opacity-30 dark:read-only:opacity-55 aria-invalid:border-destructive-foreground',
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
