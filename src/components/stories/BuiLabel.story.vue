<script setup lang="ts">
import BuiLabel from '@/components/ui/label/BuiLabel.vue'
import BuiSwitch from '@/components/ui/switch/BuiSwitch.vue'

const variant = 'default'
</script>

<template>
  <Story title="BuiLabel" autoPropsDisabled :layout="{ type: 'grid', width: '50%' }">
    <Variant :key="`variant`" :title="`${variant}`">
      <div class="flex items-center space-x-2 p-1">
        <BuiSwitch id="my-test-id" />
        <BuiLabel for="my-test-id">My label</BuiLabel>
      </div>
    </Variant>
  </Story>
</template>
