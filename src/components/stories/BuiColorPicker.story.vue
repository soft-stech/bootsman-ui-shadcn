<script setup lang="ts">
import BuiColorPicker from '@/components/ui/color-picker/BuiColorPicker.vue'
import { ref } from 'vue'

const pickedColor = ref<string>('')
</script>

<template>
  <Story title="BuiColorPicker" autoPropsDisabled :layout="{ type: 'grid', width: '95%' }">
    <Variant key="lg" title="Large">
      <div class="flex flex-col gap-4 p-4">
        {{ pickedColor }}
        <BuiColorPicker :size="'lg'" v-model:modelValue="pickedColor"></BuiColorPicker>
      </div>
    </Variant>
  </Story>
</template>
