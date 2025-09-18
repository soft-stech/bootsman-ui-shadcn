<script setup lang="ts">
import { Label, type LabelProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps & { class?: string }>()
</script>

<template>
  <Label
    v-bind="props"
    :class="cn('block text-left text-sm font-semibold leading-6 text-foreground', props.class)"
  >
    <slot />
  </Label>
</template>
