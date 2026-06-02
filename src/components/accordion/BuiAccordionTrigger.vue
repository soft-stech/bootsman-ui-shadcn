<script setup lang="ts">
// TODO see https://github.com/shadcn-ui/ui/pull/232 when completed

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<AccordionTriggerProps & { class?: string }>()
const attrs = computed(() => {
  const { class: _, ...rest } = props
  return rest
})
</script>

<template>
  <AccordionHeader
    class="border-border/16 bg-foreground/4 hover:bg-foreground/8 dark:hover:bg-accent/16 flex min-h-12 items-center px-2 py-1 data-[state=closed]:rounded-sm data-[state=open]:rounded-t-sm data-[state=open]:border-b"
    as="div"
  >
    <div class="flex w-full items-center justify-between gap-2">
      <AccordionTrigger
        v-bind="attrs"
        :class="
          cn(
            'text-foreground ring-offset-background focus-visible:ring-ring flex flex-1 items-center gap-2 rounded-sm align-middle text-base leading-6 font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-30 [&[data-state=open]>svg]:rotate-180',
            props.class
          )
        "
      >
        <ChevronDown
          class="bg-primary/[0.56] text-primary-foreground dark:bg-primary h-4 w-4 shrink-0 rounded-sm transition-transform duration-200"
        />
        <div class="flex flex-col items-start text-start">
          <slot />
          <p v-if="$slots.description" class="text-foreground/56 text-xs leading-4 font-normal">
            <slot name="description" />
          </p>
        </div>
      </AccordionTrigger>
      <slot name="actions" />
    </div>
  </AccordionHeader>
</template>
