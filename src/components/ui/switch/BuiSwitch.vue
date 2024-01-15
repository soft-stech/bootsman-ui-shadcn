<script setup lang="ts">
import { cn } from '@/lib/utils'
import {
  SwitchRoot,
  SwitchThumb,
  useForwardPropsEmits,
  type SwitchRootEmits,
  type SwitchRootProps
} from 'radix-vue'

const props = defineProps<SwitchRootProps & { class?: string }>()
const emits = defineEmits<SwitchRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="
      cn(
        ` peer inline-flex h-[20px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border transition-colors
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed
        data-[state=checked]:border-border data-[state=unchecked]:border-gray-300 data-[state=checked]:bg-input data-[state=unchecked]:bg-background
        data-[state=checked]:hover:bg-accent-foreground data-[state=unchecked]:hover:bg-gray-50 disabled:data-[state=checked]:border-accent/30 disabled:data-[state=checked]:bg-accent/30
        disabled:data-[state=unchecked]:bg-slate-300/[.16] dark:data-[state=unchecked]:border-border dark:data-[state=unchecked]:bg-input/15
        dark:data-[state=unchecked]:hover:bg-accent/30 dark:data-[state=checked]:hover:enabled:border-primary-hover dark:data-[state=checked]:hover:enabled:bg-primary-hover dark:data-[state=unchecked]:disabled:border-foreground/30 dark:data-[state=unchecked]:disabled:bg-foreground/30`,
        props.class
      )
    "
  >
    <SwitchThumb
      :class="
        cn(
          `pointer-events-none block h-3 w-3 rounded-full bg-gray-400 shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[26px] data-[state=unchecked]:translate-x-1 data-[state=checked]:bg-background
          dark:data-[disabled]:bg-foreground/30 dark:data-[state=checked]:bg-foreground dark:data-[state=unchecked]:bg-foreground`
        )
      "
    />
  </SwitchRoot>
</template>
``
