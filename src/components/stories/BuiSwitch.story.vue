<script setup lang="ts">
import BuiSwitch from '@/components/ui/switch/BuiSwitch.vue'

const variant = 'default'
</script>

<template>
  <Story title="BuiSwitch" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <Variant :key="`variant`" :title="`${variant}`">
      <BuiSwitch class="m-1"></BuiSwitch>
    </Variant>

    <Variant :key="`disabled-variant`" :title="`Disabled`">
      <BuiSwitch class="m-1" disabled></BuiSwitch>
    </Variant>

    <Variant :key="`disabled-variant`" :title="`Disabled Checked`">
      <BuiSwitch class="m-1" disabled checked></BuiSwitch>
    </Variant>
  </Story>
</template>
