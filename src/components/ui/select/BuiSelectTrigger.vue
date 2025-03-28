<script setup lang="ts">
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from 'radix-vue'
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
        'flex h-8 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:min-w-0 [&>span]:truncate',
        props.invalid && 'border-destructive-foreground',
        props.class
      )
    ]"
  >
    <slot />
    <slot name="icon">
      <SelectIcon as-child>
        <ChevronDown class="h-4 w-4 flex-shrink-0 opacity-50" />
      </SelectIcon>
    </slot>
  </SelectTrigger>
</template>
