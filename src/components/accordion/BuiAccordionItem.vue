<script setup lang="ts">
import { AccordionItem, type AccordionItemProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { computed } from 'vue'

const props = defineProps<AccordionItemProps & { class?: string }>()
const attrs = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
</script>

<template>
  <AccordionItem
    v-bind="attrs"
    :class="cn('border-border/16 shadow-level0 rounded-sm border', props.class ?? '')"
  >
    <slot />
  </AccordionItem>
</template>
