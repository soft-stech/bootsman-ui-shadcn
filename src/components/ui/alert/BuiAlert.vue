<script setup lang="ts">
import { alertVariants } from '.'
import { cn } from '@/lib/utils'

interface Props {
  variant?: NonNullable<Parameters<typeof alertVariants>[0]>['variant']
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn(alertVariants({ variant }), props.class ?? '')">
    <div class="flex-shrink-0">
      <slot name="icon" />
    </div>
    <div class="ml-3">
      <slot />
    </div>
    <div class="ml-auto pl-3">
      <div class="-mx-1.5 -my-1.5 flex items-center justify-between gap-2">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
