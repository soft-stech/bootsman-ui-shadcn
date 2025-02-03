export { default as BuiToaster } from './BuiToaster.vue'
export { default as BuiToast } from './BuiToast.vue'
export { default as BuiToastViewport } from './BuiToastViewport.vue'
export { default as BuiToastAction } from './BuiToastAction.vue'
export { default as BuiToastClose } from './BuiToastClose.vue'
export { default as BuiToastTitle } from './BuiToastTitle.vue'
export { default as BuiToastDescription } from './BuiToastDescription.vue'
export { default as BuiToastProvider } from './BuiToastProvider.vue'
export { toast, useToast } from './use-toast'

import { cva } from 'class-variance-authority'

export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border-muted bg-background text-foreground',
        destructive:
          'group border-destructive bg-[rgb(250,230,241)] dark:bg-[rgb(42,41,66)] text-destructive-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
