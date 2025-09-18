<script setup lang="ts">
import { BuiButton } from '@/components/button'
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
        'text-primary w-full justify-start px-2 py-1.5 text-left focus:outline-hidden',
        'hover:bg-accent/8 focus:bg-accent/8!'
      )
    "
  >
    <slot />
  </BuiButton>
</template>
