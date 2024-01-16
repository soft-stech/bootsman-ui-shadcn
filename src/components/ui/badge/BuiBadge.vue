<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { badgeVariants } from '.'
import { cn } from '@/lib/utils'
import BuiButton from '@/components/ui/button/BuiButton.vue'
import { XIcon } from 'lucide-vue-next'

interface BadgeVariantProps extends VariantProps<typeof badgeVariants> {}

interface Props {
  variant?: BadgeVariantProps['variant']
  dismissable?: boolean
}
withDefaults(defineProps<Props>(), {
  dismissable: false
})

const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <div :class="cn(badgeVariants({ variant }), $attrs.class ?? '')">
    <slot />
    <BuiButton
      variant="none"
      size="icon"
      class="focus-visible:ring-offset-0"
      v-if="dismissable"
      @click="emit('close')"
    >
      <XIcon class="h-3 w-3" />
    </BuiButton>
  </div>
</template>
