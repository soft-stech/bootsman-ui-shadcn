export { default as BuiTabs } from './BuiTabs.vue'
export { default as BuiTabsTrigger } from './BuiTabsTrigger.vue'
export { default as BuiTabsList } from './BuiTabsList.vue'
export { default as BuiTabsContent } from './BuiTabsContent.vue'

import { cva } from 'class-variance-authority'

export const tabsListVariants = cva('inline-flex h-10 items-center justify-center rounded-md p-1', {
  variants: {
    variant: {
      default: 'bg-muted text-foreground text-muted-foreground',
      ghost: 'bg-background bg-text-foreground'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap  px-3 py-1.5 text-md font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50   data-[state=active]:text-foreground data-[state=active]:shadow-sm',
  {
    variants: {
      variant: {
        default: 'rounded-sm data-[state=active]:bg-background',
        ghost:
          'border-transparent text-muted-foreground border-b-2 data-[state=active]:border-primary '
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
