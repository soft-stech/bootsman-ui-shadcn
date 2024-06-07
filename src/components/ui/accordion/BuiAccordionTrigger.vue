<script setup lang="ts">
// TODO see https://github.com/shadcn-ui/ui/pull/232 when completed

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'radix-vue'

const props = defineProps<AccordionTriggerProps & { class?: string }>()
</script>

<template>
  <AccordionHeader
    class="flex flex-col border-border bg-primary/[0.16] p-2 data-[state=closed]:rounded-sm data-[state=open]:rounded-t-sm data-[state=open]:border-b"
    as="div"
  >
    <div class="flex justify-between gap-2">
      <AccordionTrigger
        v-bind="props"
        :class="
          cn(
            'flex flex-1 items-center gap-2 rounded align-middle text-base font-semibold leading-6 ring-offset-background transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 [&[data-state=open]>svg]:rotate-180',
            props.class
          )
        "
      >
        <ChevronDown
          class="h-4 w-4 shrink-0 rounded-sm bg-primary/[0.56] text-primary-foreground transition-transform duration-200 dark:bg-primary/[1]"
        />
        <slot />
      </AccordionTrigger>
      <slot name="actions" />
    </div>

    <p v-if="$slots.description" class="mx-6 mt-2 align-middle text-xs font-normal leading-4">
      <slot name="description" />
    </p>
  </AccordionHeader>
</template>
