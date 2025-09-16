<script setup lang="ts">
// TODO see https://github.com/shadcn-ui/ui/pull/232 when completed

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'reka-ui'

const props = defineProps<
  AccordionTriggerProps & {
    class?: string
    borderColorClass?: string
    bgColorClass?: string
    iconBgClass?: string
    descriptionColorClass?: string
    isIconHidden?: boolean
    isDisabledAsNormal?: boolean
  }
>()
</script>

<template>
  <AccordionHeader
    :class="
      cn(
        'flex flex-col p-2 data-[state=closed]:rounded-sm data-[state=open]:rounded-t-sm data-[state=open]:border-b',
        props.borderColorClass ? props.borderColorClass : 'border-border',
        props.bgColorClass ? props.bgColorClass : 'bg-primary/16'
      )
    "
    as="div"
  >
    <div class="flex justify-between gap-2">
      <AccordionTrigger
        v-bind="props"
        :class="
          cn(
            'flex flex-1 items-center gap-2 rounded align-middle text-base font-semibold leading-6 ring-offset-background transition-all hover:underline focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none  [&[data-state=open]>svg]:rotate-180',
            props.class,
            props.isDisabledAsNormal ? 'disabled:opacity-100' : 'disabled:opacity-30'
          )
        "
      >
        <ChevronDown
          :class="
            cn(
              'h-4 w-4 shrink-0 rounded-sm text-primary-foreground transition-transform duration-200',
              props.iconBgClass
                ? `${props.iconBgClass} dark:${props.iconBgClass}`
                : 'bg-primary/[0.56] dark:bg-primary',
              props.isIconHidden ? 'invisible' : 'visible'
            )
          "
        />
        <slot />
      </AccordionTrigger>
      <slot name="actions" />
    </div>

    <p
      v-if="$slots.description"
      :class="
        cn(
          'mx-6 mt-2 align-middle text-xs font-normal leading-4',
          props.descriptionColorClass ? props.descriptionColorClass : ''
        )
      "
    >
      <slot name="description" />
    </p>
  </AccordionHeader>
</template>
