<script setup lang="ts">
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: string; invalid?: boolean }>(),
  {
    class: '',
    invalid: false
  }
)
</script>

<template>
  <SelectTrigger
    v-bind="props"
    :class="[
      cn(
        'border-input bg-background ring-offset-background focus:ring-ring data-placeholder:text-muted-foreground flex h-8 w-full items-center justify-between rounded-md border px-2 py-1 text-sm whitespace-nowrap focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 [&>span]:min-w-0 [&>span]:truncate',
        props.invalid && 'border-destructive-foreground',
        !props.invalid && 'hover:border-primary focus:border-primary',
        props.class
      )
    ]"
  >
    <slot />
    <slot name="icon">
      <SelectIcon as-child>
        <ChevronDown class="h-4 w-4 shrink-0 opacity-50" />
      </SelectIcon>
    </slot>
  </SelectTrigger>
</template>
