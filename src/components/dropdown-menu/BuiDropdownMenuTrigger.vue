<script setup lang="ts">
import { DropdownMenuTrigger, type DropdownMenuTriggerProps } from 'reka-ui'

const props = defineProps<DropdownMenuTriggerProps>()
</script>

<template>
  <DropdownMenuTrigger class="outline-hidden" v-bind="props">
    <slot />
  </DropdownMenuTrigger>
</template>
