<script setup lang="ts">
import BuiColorPicker from '@/components/ui/color-picker/BuiColorPicker.vue'
</script>

<template>
  <Story title="BuiColorPicker" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant key="lg" title="Large">
      <div class="p-4">
        <BuiColorPicker :size="'lg'"></BuiColorPicker>
      </div>
    </Variant>
  </Story>
</template>
