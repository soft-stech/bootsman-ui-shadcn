<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <td
    :class="
      cn(
        'h-12 break-words px-3 py-1 align-middle text-xs first:pl-6 last:pr-6 [&:has([role=checkbox])]:pr-0',
        props.class
      )
    "
  >
    <slot />
  </td>
</template>
