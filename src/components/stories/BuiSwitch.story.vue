<script setup lang="ts">
import BuiSwitch from '@/components/ui/switch/BuiSwitch.vue'

const variant = 'default';

</script>

<template>
  <Story title="BuiSwitch" autoPropsDisabled :layout="{ type: 'grid', width: '33%' }">
    <Variant :key="`variant`" :title="`${variant}`">
      <BuiSwitch></BuiSwitch>
    </Variant>

    <Variant
      :key="`disabled-variant`"
      :title="`Disabled`"
    >
      <BuiSwitch disabled></BuiSwitch>
    </Variant>

    <Variant
      :key="`disabled-variant`"
      :title="`Disabled Checked`"
    >
      <BuiSwitch disabled checked></BuiSwitch>
    </Variant>
  </Story>
</template>
