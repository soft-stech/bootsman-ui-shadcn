<script setup lang="ts">
import { BuiBadge } from '@/components/ui/badge'
import { BuiInput } from '@/components/ui/input/index'
import { cn } from '@/lib/utils'

const props = defineProps<{
  badge: string
}>()

defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="relative flex">
    <BuiInput v-bind="$attrs" :class="cn('pr-18', $attrs.class ?? '')" />
    <BuiBadge
      class="absolute right-3 top-1.5 flex items-center justify-center rounded-sm hover:bg-primary/[0.08] dark:hover:bg-primary/30"
      >{{ props.badge }}</BuiBadge
    >
  </div>
</template>
