<script setup lang="ts">
import { AccordionContent, type AccordionContentProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AccordionContentProps & { class?: string }>()
</script>

<template>
  <AccordionContent
    v-bind="props"
    :class="
      cn(
        'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        props.class
      )
    "
  >
    <div class="px-8 py-4">
      <slot />
    </div>
  </AccordionContent>
</template>
