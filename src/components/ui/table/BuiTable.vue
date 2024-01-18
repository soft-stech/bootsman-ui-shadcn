<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <div class="w-full overflow-auto rounded border border-border/[0.16]">
    <table :class="cn('w-full caption-top  text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
