import { cva } from 'class-variance-authority'

export { default as BuiAlert } from './BuiAlert.vue'
export { default as BuiAlertTitle } from './BuiAlertTitle.vue'
export { default as BuiAlertDescription } from './BuiAlertDescription.vue'

export const alertVariants = cva('flex w-full rounded-sm border-l-2 p-4 [&_svg]:text-foreground', {
  variants: {
    variant: {
      default: 'bg-background text-foreground',
      destructive:
        'bg-destructive border-destructive-foreground text-destructive-foreground [&_svg]:text-destructive-foreground',
      success:
        'bg-success border-success-foreground text-success-foreground [&_svg]:text-success-foreground',
      warning:
        'bg-warning border-warning-foreground text-warning-foreground [&_svg]:text-warning-foreground',
      info: 'bg-info border-info-foreground text-info-foreground [&_svg]:text-info-foreground'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})
