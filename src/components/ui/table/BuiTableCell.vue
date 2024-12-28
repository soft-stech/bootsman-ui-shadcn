<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <td
    :class="
      cn(
        'break-words p-4 align-middle first:pl-8 last:pr-8 [&:has([role=checkbox])]:pr-0',
        props.class
      )
    "
  >
    <slot />
  </td>
</template>
