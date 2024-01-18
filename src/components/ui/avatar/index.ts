import { cva } from 'class-variance-authority'

export { default as BuiAvatar } from './BuiAvatar.vue'
export { default as BuiAvatarImage } from './BuiAvatarImage.vue'
export { default as BuiAvatarFallback } from './BuiAvatarFallback.vue'

export const avatarVariant = cva(
  'inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        base: 'h-16 w-16 text-2xl',
        lg: 'h-32 w-32 text-5xl'
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md'
      }
    }
  }
)
