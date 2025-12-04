<script setup lang="ts">
import { type HTMLAttributes, computed, ref } from 'vue'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport
} from 'reka-ui'
import BuiScrollBar from './BuiScrollBar.vue'
import { cn } from '@/lib/utils'

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const tableWrapperRef = ref<InstanceType<typeof ScrollAreaRoot> | null>(null)
defineExpose({ tableWrapperRef })
</script>

<template>
  <ScrollAreaRoot
    ref="tableWrapperRef"
    v-bind="delegatedProps"
    :class="cn('relative overflow-hidden', props.class)"
  >
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]">
      <slot />
    </ScrollAreaViewport>
    <BuiScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
