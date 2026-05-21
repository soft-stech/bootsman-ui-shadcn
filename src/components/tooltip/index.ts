export { default as BuiTooltip } from './BuiTooltip.vue'
export { default as BuiTooltipContent } from './BuiTooltipContent.vue'
export { default as BuiTooltipTrigger } from './BuiTooltipTrigger.vue'
export { default as BuiTooltipProvider } from './BuiTooltipProvider.vue'
import { cva } from 'class-variance-authority'

export const tooltipVariants = cva('', {
  variants: {
    variant: {
      default: 'border-muted text-primary-foreground',
      destructive:
        'border-0 border-l-2 bg-destructive border-destructive-foreground text-destructive-foreground [&_svg]:text-destructive-foreground [&_div]:[scrollbar-color:initial]',
      success:
        'border-0 border-l-2 bg-success border-success-foreground text-success-foreground [&_svg]:text-success-foreground [&_div]:[scrollbar-color:initial]',
      warning:
        'border-0 border-l-2 bg-warning border-warning-foreground text-warning-foreground [&_svg]:text-warning-foreground [&_div]:[scrollbar-color:initial]',
      info: 'border-0 border-l-2 bg-info border-info-foreground text-info-foreground [&_svg]:text-info-foreground [&_div]:[scrollbar-color:initial]'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})
