<script setup lang="ts">
import { BuiToggle } from '@/index'
import { BoldIcon } from 'lucide-vue-next'
</script>

<template>
  <Story title="BuiToggle" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <Variant title="Default">
      <BuiToggle aria-label="Toggle something">
        <BoldIcon class="h-4 w-4" />
      </BuiToggle>
    </Variant>

    <Variant title="Outline">
      <BuiToggle aria-label="Toggle something" variant="outline">
        <BoldIcon class="h-4 w-4" />
      </BuiToggle>
    </Variant>

    <Variant title="With text">
      <BuiToggle aria-label="Toggle something">
        <BoldIcon class="mr-2 h-4 w-4" />
        Bold
      </BuiToggle>
    </Variant>

    <Variant title="Small">
      <BuiToggle size="sm" aria-label="Toggle something">
        <BoldIcon class="h-4 w-4" />
      </BuiToggle>
    </Variant>

    <Variant title="Large">
      <BuiToggle size="lg" aria-label="Toggle something">
        <BoldIcon class="h-4 w-4" />
      </BuiToggle>
    </Variant>

    <Variant title="Disabled">
      <BuiToggle aria-label="Toggle something" disabled>
        <BoldIcon class="h-4 w-4" />
      </BuiToggle>
    </Variant>
  </Story>
</template>
