export { default as BuiTabs } from './BuiTabs.vue'
export { default as BuiTabsTrigger } from './BuiTabsTrigger.vue'
export { default as BuiTabsList } from './BuiTabsList.vue'
export { default as BuiTabsContent } from './BuiTabsContent.vue'

import { cva } from 'class-variance-authority'

export const tabsListVariants = cva('inline-flex items-center justify-center rounded-md p-1', {
  variants: {
    variant: {
      default: 'bg-muted text-muted-foreground p-0',
      ghost: 'bg-background bg-text-foreground',
      vertical: 'bg-muted text-muted-foreground p-0 flex flex-col justify-start rounded-none'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground',
  {
    variants: {
      variant: {
        default:
          'rounded-sm data-[state=active]:bg-background data-[state=active]:border border-primary/[0.16] text-foreground opacity-[0.56] hover:opacity-100 data-[state=active]:opacity-100 data-[state=active]:shadow-tab-shadow',
        ghost:
          'border-transparent text-muted-foreground pb-0 [&_div]:pb-1.5 [&_div]:data-[state=active]:border-b-2 [&_div]:data-[state=active]:border-primary',
        vertical:
          'border-transparent text-primary data-[state=active]:border-primary data-[state=active]:bg-background border-l-2 border-b-0 w-full justify-start pl-6'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
