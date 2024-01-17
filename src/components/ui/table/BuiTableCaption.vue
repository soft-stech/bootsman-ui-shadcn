<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <caption :class="cn('px-8 py-4 text-left', props.class)">
    <slot />
  </caption>
</template>
