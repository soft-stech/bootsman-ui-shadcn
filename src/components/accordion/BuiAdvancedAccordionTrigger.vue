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
    hoverColorClass?: string
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
        'border-border/16 bg-foreground/4 relative flex min-h-12 items-center px-2 py-1 data-[state=closed]:rounded-sm data-[state=open]:rounded-t-sm data-[state=open]:border-b',
        props.borderColorClass ?? '',
        props.bgColorClass ?? '',
        props.hoverColorClass ?? ''
      )
    "
    as="div"
  >
    <div class="flex w-full items-center justify-between gap-2">
      <AccordionTrigger
        :class="
          cn(
            'text-foreground ring-offset-background focus-visible:ring-ring relative flex flex-1 items-center gap-2 rounded-sm align-middle text-base leading-6 font-semibold transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-30 [&[data-state=open]>svg]:rotate-180',
            props.class,
            props.isDisabledAsNormal ? 'disabled:opacity-100' : ''
          )
        "
      >
        <ChevronDown
          :class="
            cn(
              'bg-primary/[0.56] dark:bg-primary text-primary-foreground h-4 w-4 shrink-0 rounded-sm transition-transform duration-200',
              props.iconBgClass ? `${props.iconBgClass} dark:${props.iconBgClass}` : '',
              props.isIconHidden ? 'invisible' : 'visible'
            )
          "
        />
        <div class="flex flex-col items-start text-start">
          <slot />
          <p
            v-if="$slots.description"
            :class="
              cn(
                'text-foreground/56 text-xs leading-4 font-normal',
                props.descriptionColorClass ?? ''
              )
            "
          >
            <slot name="description" />
          </p>
        </div>
      </AccordionTrigger>
      <slot name="actions" />
    </div>
  </AccordionHeader>
</template>
