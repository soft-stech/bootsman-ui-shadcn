<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import {
  type AcceptableValue,
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText
} from 'reka-ui'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemProps<T> & { class?: string }>()
</script>

<template>
  <SelectItem
    v-bind="props"
    :class="
      cn(
        'focus:bg-accent/8 focus:text-accent-foreground relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50',
        props.class
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectItemIndicator>
        <Check class="h-4 w-4" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
