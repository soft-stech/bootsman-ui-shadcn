<script setup lang="ts">
// TODO see https://github.com/shadcn-ui/ui/pull/232 when completed

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'reka-ui'

const props = defineProps<AccordionTriggerProps & { class?: string }>()
</script>

<template>
  <AccordionHeader
    class="border-border bg-primary/16 flex flex-col p-2 data-[state=closed]:rounded-sm data-[state=open]:rounded-t-sm data-[state=open]:border-b"
    as="div"
  >
    <div class="flex justify-between gap-2">
      <AccordionTrigger
        v-bind="props"
        :class="
          cn(
            'ring-offset-background focus-visible:ring-ring flex flex-1 items-center gap-2 rounded-sm align-middle text-base leading-6 font-semibold transition-all hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-30 [&[data-state=open]>svg]:rotate-180',
            props.class
          )
        "
      >
        <ChevronDown
          class="bg-primary/[0.56] text-primary-foreground dark:bg-primary h-4 w-4 shrink-0 rounded-sm transition-transform duration-200"
        />
        <slot />
      </AccordionTrigger>
      <slot name="actions" />
    </div>

    <p v-if="$slots.description" class="mx-6 mt-2 align-middle text-xs leading-4 font-normal">
      <slot name="description" />
    </p>
  </AccordionHeader>
</template>
