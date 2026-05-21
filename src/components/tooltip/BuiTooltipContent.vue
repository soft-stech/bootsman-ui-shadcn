<script setup lang="ts">
import {
  TooltipContent,
  type TooltipContentEmits,
  type TooltipContentProps,
  TooltipPortal,
  useForwardPropsEmits
} from 'reka-ui'
import { cn } from '@/lib/utils'
import { tooltipVariants } from '.'

interface Props extends TooltipContentProps {
  variant?: NonNullable<Parameters<typeof tooltipVariants>[0]>['variant']
}

const props = withDefaults(defineProps<Props>(), {
  sideOffset: 4
})
const emits = defineEmits<TooltipContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'shadow-level3 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-tooltip [&_a]:text-tooltip-link z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm [&_a]:underline',
          tooltipVariants({ variant }),
          $attrs.class ?? ''
        )
      "
    >
      <div
        class="scrollbar-thin scrollbar-track-tooltip scrollbar-thumb-primary-foreground max-h-40 overflow-y-auto px-2"
      >
        <slot />
      </div>
    </TooltipContent>
  </TooltipPortal>
</template>
