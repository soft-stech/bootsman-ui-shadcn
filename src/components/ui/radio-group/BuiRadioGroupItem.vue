<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, type RadioGroupItemProps } from 'radix-vue'
import { Circle } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<RadioGroupItemProps & { class?: string }>()
</script>

<template>
  <RadioGroupItem
    v-bind="props"
    :class="
      cn(
        `flex aspect-square h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-input bg-background hover:enabled:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-50
        disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:hover:bg-primary-hover dark:border-primary dark:data-[state=unchecked]:bg-primary/[0.16] dark:hover:enabled:data-[state=unchecked]:bg-primary/[0.32]`,
        props.class
      )
    "
  >
    <RadioGroupIndicator
      :class="cn('flex items-center justify-center data-[state=checked]:text-white', props.class)"
    >
      <Circle class="h-2 w-2 fill-current text-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
