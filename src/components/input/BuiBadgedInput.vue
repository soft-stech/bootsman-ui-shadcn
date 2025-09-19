<script setup lang="ts">
import BuiBadge from '@/components/badge/BuiBadge.vue'
import { BuiInput } from '@/components/input/index'
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
      class="hover:bg-primary/8 dark:hover:bg-primary/30 absolute top-1 right-2 flex items-center justify-center rounded-sm"
    >
      {{ props.badge }}
    </BuiBadge>
  </div>
</template>
