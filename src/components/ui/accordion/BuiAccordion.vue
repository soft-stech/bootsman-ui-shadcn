<script setup lang="ts">
import {
  AccordionRoot,
  type AccordionRootEmits,
  type AccordionRootProps,
  useEmitAsProps
} from 'reka-ui'

const props = defineProps<AccordionRootProps>()
const emits = defineEmits<AccordionRootEmits>()
</script>

<template>
  <AccordionRoot v-bind="{ ...props, ...useEmitAsProps(emits) }">
    <slot />
  </AccordionRoot>
</template>
