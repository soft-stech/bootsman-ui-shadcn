<script setup lang="ts">
import { BuiCheckbox, BuiLabel } from '@/index'
</script>

<template>
  <Story title="BuiCheckbox" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant title="Default">
      <div class="flex items-center space-x-2 p-1">
        <BuiCheckbox id="my-test-id1" />
        <BuiLabel for="my-test-id1">My label</BuiLabel>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="flex items-center space-x-2 p-1">
        <BuiCheckbox id="my-test-id2" disabled />
        <BuiLabel
          for="my-test-id2"
          class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >My label</BuiLabel
        >
      </div>
    </Variant>
  </Story>
</template>
