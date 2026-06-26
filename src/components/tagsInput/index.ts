import { cva } from 'class-variance-authority'

export { default as BuiTagsInput } from './BuiTagsInput.vue'
export { default as BuiTagsInputInput } from './BuiTagsInputInput.vue'
export { default as BuiTagsInputItem } from './BuiTagsInputItem.vue'
export { default as BuiTagsInputItemDelete } from './BuiTagsInputItemDelete.vue'
export { default as BuiTagsInputItemText } from './BuiTagsInputItemText.vue'

export const tagsInputVariants = cva(
  'bg-background ring-offset-background flex min-h-8 w-full rounded-sm border px-2 py-1 text-sm flex-wrap items-center gap-2 focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2 focus-within:outline-hidden',
  {
    variants: {
      variant: {
        default:
          'border-input hover:border-primary data-[disabled]:hover:border-input focus-within:border-primary',
        destructive: 'border-destructive-foreground',
        success: 'border-success-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)
