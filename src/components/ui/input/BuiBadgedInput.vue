<script setup lang="ts">
import { BuiBadge } from '@/components/ui/badge'
import { BuiInput } from '@/components/ui/input/index'
import { useElementBounding } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps<{
  badge: string
}>()

defineOptions({
  inheritAttrs: false
})

const badgeEl = ref<HTMLDivElement | null>(null)
const { width } = useElementBounding(badgeEl)
const MAGIC_NUMBER = 12 // 8 (right-2) + 4 (just some offset)
</script>

<template>
  <div class="relative flex">
    <BuiInput v-bind="$attrs" :style="{ paddingRight: width + MAGIC_NUMBER + 'px' }" />
    <BuiBadge
      ref="badgeEl"
      v-if="props.badge"
      class="absolute right-2 top-1 flex items-center justify-center rounded-sm hover:bg-primary/[0.08] dark:hover:bg-primary/30"
    >
      {{ props.badge }}
    </BuiBadge>
  </div>
</template>
