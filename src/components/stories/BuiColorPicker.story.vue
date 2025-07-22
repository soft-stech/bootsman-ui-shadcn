<script setup lang="ts">
import BuiColorPicker from '@/components/ui/color-picker/BuiColorPicker.vue'
</script>

<template>
  <Story title="BuiColorPicker" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant key="lg" title="Large">
      <BuiColorPicker :size="'lg'"></BuiColorPicker>
    </Variant>
  </Story>
</template>
