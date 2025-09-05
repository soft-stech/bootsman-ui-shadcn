<script setup lang="ts">
import BuiButton from '@/components/ui/button/BuiButton.vue'
import { cn } from '@/lib/utils'

const emit = defineEmits(['create'])

function handleClick() {
  emit('create')
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('create')
  }
}
</script>

<template>
  <BuiButton
    variant="none"
    @click="handleClick"
    @keydown="handleKeydown"
    :class="
      cn(
        'w-full justify-start px-2 py-1.5 text-left text-primary focus:outline-none',
        'hover:bg-accent/[0.08] focus:!bg-accent/[0.08]'
      )
    "
  >
    <slot />
  </BuiButton>
</template>
