import { cva } from 'class-variance-authority'

export { default as BuiBadge } from './BuiBadge.vue'

export const badgeVariants = cva(
  'px-2 py-0.5 inline-flex items-center rounded-full font-normal transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 text-[13px] leading-5 gap-1',
  {
    variants: {
      variant: {
        default:
          'bg-primary/8 text-foreground hover:bg-primary/16 dark:bg-primary/30 dark:hover:bg-primary/65'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
