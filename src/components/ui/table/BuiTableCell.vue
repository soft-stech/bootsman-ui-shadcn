<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <td
    :class="
      cn(
        'h-12 break-words px-2 py-1 align-middle text-xs first:pl-3 last:pr-3 [&:has([role=checkbox])]:pr-0',
        props.class
      )
    "
  >
    <slot />
  </td>
</template>
