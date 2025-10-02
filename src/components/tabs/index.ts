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
      vertical:
        'w-70 shrink-0 bg-tabs-sidebar text-muted-foreground p-0 flex flex-col justify-start rounded-none shadow-tab-sidebar-shadow'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center px-3 py-1 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground',
  {
    variants: {
      variant: {
        default:
          'whitespace-nowrap rounded-sm text-foreground opacity-[0.56] hover:opacity-100 data-[state=active]:opacity-100 data-[state=active]:bg-background my-1 first:ml-1 last:mr-1 data-[state=active]:shadow-tab-shadow',
        ghost:
          'whitespace-nowrap border-transparent text-muted-foreground pb-0 [&_div]:pb-0.5 data-[state=active]:[&_div]:border-b-2 data-[state=active]:[&_div]:border-primary',
        vertical:
          'border-transparent text-primary data-[state=active]:border-primary data-[state=active]:bg-background data-[state=active]:shadow-tab-sidebar-shadow border-l-2 border-b-0 w-full h-fit justify-start pl-6!'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
